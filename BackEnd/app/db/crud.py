from app.db.database_setup import User, Room, Move_In,\
    House_Attribute, Attribute, Favorite, Address, Stay_Period, Base
from app.util.aws.s3 import get_images, upload_file_wobject
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
import os

# delete these
from app.util.util import verify_image
from PIL import Image
import io

HOUSEIT_S3_URL = "https://houseit.s3.us-east-2.amazonaws.com/"

# Helper fns


def getSession(db_path):
    """
    get a given db session
    """
    engine = create_engine(db_path)
    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()
    return session


def add_and_commit(db_row, session):
    session.add(db_row)
    session.commit()

# Create


def add_user(name, email, date_created, phone, description, school_year, major,
             session):
    """
    add a row to the User table
    """
    User_to_add = User(name=name, email=email, date_created=date_created,
                       phone=phone, description=description,
                       school_year=school_year,
                       major=major)
    add_and_commit(User_to_add, session)
    return User_to_add


def add_address(distance, address, session):
    """
    add a row to the Address table
    """
    address_to_add = Address(address=address, distance=distance)
    add_and_commit(address_to_add, session)
    return address_to_add


def add_room(date_created, room_type, price_per_month, negotiable, room_description,
             stay_period, address,
             user, move_in, num_beds, num_baths,
             session):
    """
    add a row to the Room table
    """
    Room_to_add = Room(date_created=date_created, room_type=room_type,
                       price_per_month=price_per_month,
                       negotiable=negotiable,
                       room_description=room_description, stay_period=stay_period,
                       address=address,
                       user=user, move_in=move_in, num_beds=num_beds,
                       num_baths=num_baths)
    add_and_commit(Room_to_add, session)
    return Room_to_add


def add_move_in(early_date, late_date, session):
    """
    add a row to the Move_In table
    """
    Move_In_to_add = Move_In(early_date=early_date,
                             late_date=late_date)
    add_and_commit(Move_In_to_add, session)
    return Move_In_to_add


def add_stay_period(from_month, to_month, session):
    """
    add a row to the Stay_Period table
    """
    Stay_Period_to_add = Stay_Period(from_month=from_month,
                                     to_month=to_month)
    add_and_commit(Stay_Period_to_add, session)
    return Stay_Period_to_add


def add_house_attribute(room, house_attribute, session):
    """
    link attribute to an associated room_id if
    the link isn"t already present
    links are recorded in the House_Attribute table
    attributes are recorded in the Attribute table
    """
    house_attribute_to_add = get_row_if_exists(
        House_Attribute, session, ** {"room_id": room.id,
                                      "attribute_name": house_attribute.name})
    if not house_attribute_to_add:
        house_attribute_to_add = House_Attribute(
            room=room, house_attribute=house_attribute)
        add_and_commit(house_attribute_to_add, session)
    return house_attribute_to_add


def add_attribute(name, category, session):
    """
    add an attribute to the Attribute table
    if it doesn"t already exist there
    """
    attribute_to_add = get_row_if_exists(Attribute, session, **
                                         {"name": name, "category": category})
    if not attribute_to_add:
        attribute_to_add = Attribute(name=name, category=category)
        add_and_commit(attribute_to_add, session)
    return attribute_to_add


def add_favorite(room, user, session):
    """
    associate favorite room with user in Favorite table
    if the association doesn"t already exist
    """
    favorite_to_add = get_row_if_exists(Favorite, session, **
                                        {"room_id": room.id, "user_id": user.id})
    if not favorite_to_add:
        favorite_to_add = Favorite(room=room, user=user)
        add_and_commit(favorite_to_add, session)
    return favorite_to_add

# Read


def get_row_if_exists(db_obj, session, **condition):
    """
    Check if a row that satisfies a certain condition exists
    :param db_obj: Database Object like User
    :param session: a db connection session
    :param condition: kwargs like dict like {"name":"Cris"}
    :return: the row if a row exists, else None
    """
    row = session.query(db_obj).filter_by(**condition).first()
    return row


def get_insert_id(base, session):
    """
    Get the id of to-be-inserted entry
    """
    last_row = session.query(base).order_by(base.id.desc()).first()
    new_room_id = 1 + (last_row.id if last_row else 0)
    return new_room_id


def read_all(base, session):
    """
    get all entries from a table
    """
    return session.query(base).all()


def read_criteria(base, condition_dict, session, mode="s"):
    """
    get entries from db that fits a criteria

    mode supports single("s") and multiple("m")
    """
    try:
        # single entry mode
        if mode == "s":
            # one method would throw error if no result found or multiple results found
            # if assumes only one fits the criteria
            return session.query(base).filter_by(**condition_dict).one()
        elif mode == "m":
            return session.query(base).filter_by(**condition_dict).all()
    except (NoResultFound, MultipleResultsFound):
        return None


def room_json(room, session, offline_test_mode=False, login_session=None):
    """
    generates a JSON representation of a given room
    in the Room table, also including its attributes
    (House_Attribute), preferred move-in time (Move_In),
    and the user to post the room (User)

    offline_test_mode is used to separate online logic from offline logic since online method is tested separately
    in this method, test mode would disable fetching images from s3 bucket
    """
    other_map = {"other": [], "facilities": []}
    house_attrs = session.query(House_Attribute).filter(
        House_Attribute.room_id == room.id).all()
    house_move_in = session.query(Move_In).filter(
        Move_In.id == room.move_in_id).first()
    house_user = session.query(User).filter(
        User.id == room.user_id).first()
    for ha in house_attrs:
        category_name = session.query(Attribute).filter(
            Attribute.name == ha.attribute_name).first().category
        other_map[category_name].append(ha.attribute_name)
    r_json = room.serialize
    room_name = room.address.serialize["address"].split(",")[0]

    if offline_test_mode == True:
        room_photos = ["photo1", "photo2"]
        profile_photo = "profile_photo"
    else:
        room_photos = get_images("user"
                                 + str(house_user.id),
                                 extra_path=str(room.id)+"/")
        profile_photo = HOUSEIT_S3_URL + \
            get_images("user"+str(house_user.id), category="profile")[0]

    # if not in test mode, provide sensitive info only when user logs in
    user_email = house_user.email
    user_phone = house_user.phone
    # if it is used in the flask
    if login_session is not None:
        try:
            login_session["user_id"]
        except KeyError:
            user_phone = user_email = ""

    return_json = {
        "name": room_name,
        "address": room.address.serialize["address"],
        "distance": room.address.serialize["distance"],
        "pricePerMonth": r_json["price_per_month"],
        "fromMonth": room.stay_period.from_month.strftime("%B/%y"),
        "toMonth": room.stay_period.to_month.strftime("%B/%y"),
        "earlyDate": house_move_in.early_date.strftime("%m/%d/%y"),
        "lateDate": house_move_in.late_date.strftime("%m/%d/%y"),
        "roomType": r_json["room_type"],
        "other": other_map["other"],
        "facilities": other_map["facilities"],
        "leaserName": house_user.name,
        "leaserEmail": user_email,
        "leaserPhone": user_phone,
        "leaserSchoolYear": house_user.school_year,
        "leaserMajor": house_user.major,
        "photos": room_photos,
        "profilePhoto": profile_photo,
        "roomId": r_json["id"],
        "negotiable": r_json["negotiable"],
        "numBaths": r_json["num_baths"],
        "numBeds": r_json["num_beds"],
        "roomDescription": r_json["room_description"],
    }
    return return_json


# Update

def update_field(db_obj, session, condition={}, values={}):
    """
    Updates rows in given db matching condition, using given values.
    condition and values should be dictionaries.
    NOTE: invalid conditions or values WILL throw errors!
    """
    updated_obj = session.query(db_obj).filter_by(**condition).update(values)
    session.commit()
    return updated_obj

# write an attribute to database


def write_attribute(attributes, category, room, session):
    """
    Posted when user posts a room. 
    Writes list of preferences and facilities of room to the Attribute table.
    Assumes only legal attributes will be added.
    """
    for attribute in attributes:
        # check if an attribute exists
        new_attribute = get_row_if_exists(
            Attribute, session, **{"name": attribute})
        if not new_attribute:
            new_attribute = add_attribute(attribute, category, session)
        # finally add the house attribute
        add_house_attribute(room, new_attribute, session)

# write a single room to database


def write_room(room_json, user_id, session, offline_test_mode=False, test_mode=False):
    """
    write a new room to the db with the json 

    Assume the function would only be called when all entries in room_json are valid, user_id exists.
    offline_test_mode is used to separate online logic from offline logic since online method is tested separately
    """
    # gets room owner, assuming when a new room gets added the user exists
    room_owner = get_row_if_exists(
        User, session, **{"id": user_id})
    new_room_id = get_insert_id(Room, session)
    # upload photos first since if we fails to upload images, we shouldn't add entry to the db
    upload_status = False
    if offline_test_mode == False:
        for index, photo in enumerate(room_json["photos"]):
            user_prefix = "test_user" if test_mode else "user"
            _, file_extension = os.path.splitext(photo.filename)
            # standardize file name by index
            path_name = "/".join([user_prefix+str(room_owner.id), "housing",
                                  str(new_room_id), str(index)+"."+file_extension])
            upload_status = upload_file_wobject(photo, "houseit", path_name)
    else:
        upload_status = True

    if upload_status == False:
        return upload_status
    early_date = datetime.strptime(
        room_json["early_date"], "%m/%d/%y")
    late_date = datetime.strptime(
        room_json["late_date"], "%m/%d/%y")
    new_move_in = get_row_if_exists(Move_In, session, **{
        "early_date": early_date,
        "late_date": late_date
    })
    if not new_move_in:
        new_move_in = add_move_in(early_date,
                                  late_date, session)

    new_address = add_address(room_json["distance"],
                              room_json["address"], session)
    new_stay_period = add_stay_period(
        datetime.strptime(room_json["from_month"], "%B/%y"),
        datetime.strptime(room_json["to_month"], "%B/%y"), session)
    new_room = add_room(datetime.now(),
                        room_json["room_type"],
                        room_json["price_per_month"],
                        room_json["negotiable"],
                        room_json["room_description"],
                        new_stay_period,
                        new_address,
                        room_owner, new_move_in, int(room_json["num_beds"]),
                        float(room_json["num_baths"]), session)
    write_attribute(room_json["other"], "other", new_room, session)
    write_attribute(room_json["facilities"], "facilities", new_room, session)
    return upload_status

# DELETE


def remove_entry(base, entry_id, session):
    """
    removes an entry from a db with its unique id

    return number of deleted rows
    """
    deleted_rows = session.query(base).filter_by(id=entry_id).delete()
    session.commit()
    return deleted_rows
