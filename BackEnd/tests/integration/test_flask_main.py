import json
import pytest
from app.assets.request_message_map import *
from app.db.crud import get_row_if_exists, room_json, get_insert_id, add_favorite, remove_entry
import imghdr
from app.db.database_setup import User, Room, Favorite
import io
from app.util.aws.s3 import *
from app.util.util import verify_image

def test_get_recent_rooms(client, app):
    """Test get recent rooms with mock database

    simple test:
    list all the rooms => correct number of rooms in sorted chronological order
    """

    rv = client.get("/getRecentRoomIds")
    room_ids = json.loads(rv.data)
    # case 1: check it returns number of data in mock db
    assert len(room_ids) == 2
    room_1 = get_row_if_exists(
        Room, app.config["DB_CONNECTION"], **{"id": room_ids[0]})
    room_2 = get_row_if_exists(
        Room, app.config["DB_CONNECTION"], **{"id": room_ids[1]})
    # case 1: check it is in descending order of dates
    assert room_1.date_created > room_2.date_created


@pytest.mark.parametrize(
    ("room_id", "correct_status_code", "correct_id",
     "login_first", "correct_response"),
    (
        # case1: the room exists and returns (user didn't log in), email and phone empty
        (
            1,
            200,
            1,
            False,
            {"leaserEmail": "",
             "leaserPhone": ""}
        ),
        # case2: the room doesn't exist, email and phone empty
        (
            3,
            404,
            -1,
            False,
            {}
        ),
        # case3: the user logs in, email and name get returned
        (
            1,
            200,
            1,
            True,
            {"leaserEmail": "adam@ucsd.edu",
             "leaserPhone": "858-65386"}
        ),
        # case4: room id isnt valid, user hasn't logged in
        (
            [],
            404,
            -1,
            False,
            {}
        ),
        # case5: room id doesn't exist in db, user hasn logged in
        (
            [],
            404,
            -1,
            True,
            {}
        )
    )
)
def test_get_room(client, app, room_id, correct_status_code, correct_id, login_first, correct_response):
    """Test get a particular rooms with mock database
    """
    if login_first:
        client.post(
            "/login", data=json.dumps({"email": "haha@ucsd.edu"}), content_type="application/json")
    rv = client.get("/getRoom/"+str(room_id))
    room_json = json.loads(rv.data)
    assert room_json["roomId"] == correct_id
    assert rv.status_code == correct_status_code
    for key, value in correct_response.items():
        assert room_json[key] == value


@pytest.mark.parametrize(
    ("email", "login_first", "corrupt_cookie", "json_query",
     "correct_response", "database_entry", "correct_status_code"),
    (
        # case1: failed authentication check => user_id, access token not valid (just need to sample check since the mechanism is checked in other test cases)
        (
            "haha@ucsd.edu",
            True,
            True,
            {"data": json.dumps({"updates": {"name": "Thanos",
                                 "description": "Fun isn't something one considers when balancing the universe. But this... does put a smile on my face",
                                             "phone": "858-888-2345",
                                             "major": "MARVEL SOCIOECONOMICS",
                                             "school_year": "Third",
                                             }}), "content_type": "application/json"},
            {
                "message": "Cross-Site Request Forgery (XSRF/CSRF) attacks huh? GOTCHA!"
            },
            {"name": "cris",
             "email": "haha@ucsd.edu",
             "phone": "858-911-1198",
             "description": "I recently graduated with my bachelor's and will be working/volunteering fulltime. I do not smoke and I am clean (might misplace things though but)! I am also very sociable and enjoy cooking and baking 🙂 Hobbies I have are playing the violin, drawing, and watching kdramas! Feel free to message me for further questions ",
             "school_year": "Third",
             "major": "Data Science"},
            401
        ),
        # case2: successful update => user_id, access token are valid => user logged in, all fields to be updated are valid
        (
            "haha@ucsd.edu",
            True,
            False,
            {"data": json.dumps({"updates": {"name": "Thanos",
                                 "description": "Fun isn't something one considers when balancing the universe. But this... does put a smile on my face",
                                             "phone": "858-888-2345",
                                             "major": "MARVEL SOCIOECONOMICS",
                                             "school_year": "Third",
                                             }}), "content_type": "application/json"},
            {"message": "Successfully update the data!"},
            {"name": "Thanos",
             "email": "haha@ucsd.edu",
             "description": "Fun isn't something one considers when balancing the universe. But this... does put a smile on my face",
             "phone": "858-888-2345",
             "school_year": "Third",
             "major": "MARVEL SOCIOECONOMICS",
             },
            200
        ),
        # case3: successful update => partial valid fields
        (
            "haha@ucsd.edu",
            True,
            False,
            {"data": json.dumps({"updates": {"nickname": "Cris",
                                 "name": "Thanos",
                                             "description": "Fun isn't something one considers when balancing the universe. But this... does put a smile on my face",
                                             "phone": "858-888-2345",
                                             "date_created": "sdfvfedferfe",
                                             "major": "MARVEL SOCIOECONOMICS",
                                             "school_year": "Third",
                                             }}), "content_type": "application/json"},
            {"message": "Successfully update the data!"},
            {"name": "Thanos",
             "email": "haha@ucsd.edu",
             "description": "Fun isn't something one considers when balancing the universe. But this... does put a smile on my face",
             "phone": "858-888-2345",
             "school_year": "Third",
             "major": "MARVEL SOCIOECONOMICS",
             },
            200
        ),
        # case4: ignored update => try to update permanent data(email, id)
        (
            "haha@ucsd.edu",
            True,
            False,
            {"data": json.dumps({"updates": {"name": "CRISTIANO",
                                 "email": "nonexistent@ucsd.edu",
                                             "description": "YOU COULD NOT LIVE WITH YOUR OWN FAILURE, AND WHERE DID THAT BRING YOU? BACK TO ME",
                                             "phone": "858-777-2345",
                                             "major": "MARVEL SCIENCE",
                                             }}), "content_type": "application/json"},
            {"message": "Successfully update the data!"},
            {"name": "CRISTIANO",
             "email": "haha@ucsd.edu",
                      "description": "YOU COULD NOT LIVE WITH YOUR OWN FAILURE, AND WHERE DID THAT BRING YOU? BACK TO ME",
                      "phone": "858-777-2345",
                      "school_year": "Third",
                      "major": "MARVEL SCIENCE",
             },
            200
        ),
        # case5: unsuccessful update => invalid type that doesn't fit schema(e.g. try to put string when supposed field is number)
        (
            "haha@ucsd.edu",
            True,
            False,
            {"data": json.dumps({"updates": {"name": 123,
                                 "email": "nonexistent@ucsd.edu",
                                             "description": "YOU COULD NOT LIVE WITH YOUR OWN FAILURE, AND WHERE DID THAT BRING YOU? BACK TO ME",
                                             "phone": "858-777-2345",
                                             "major": "MARVEL SCIENCE",
                                             }}), "content_type": "application/json"},
            {"message": "the input data doesn't fit our schema. Did you bypass our frontend?"},
            {"name": "cris",
             "email": "haha@ucsd.edu",
             "phone": "858-911-1198",
             "description": "I recently graduated with my bachelor's and will be working/volunteering fulltime. I do not smoke and I am clean (might misplace things though but)! I am also very sociable and enjoy cooking and baking 🙂 Hobbies I have are playing the violin, drawing, and watching kdramas! Feel free to message me for further questions ",
             "school_year": "Third",
             "major": "Data Science"},
            422
        ),
        # case6: updates don't exist
        (
            "haha@ucsd.edu",
            True,
            False,
            {"data": json.dumps({
                "id": 7,
                "email": "thanos@ucsd.edu",
                "name": "CRISTIANO",
                "description": "YOU COULD NOT LIVE WITH YOUR OWN FAILURE, AND WHERE DID THAT BRING YOU? BACK TO ME",
                "phone": "858-777-2345",
                "school_year": "Grad",
                "major": "MARVEL SCIENCE",
            }), "content_type": "application/json"},
            {"message": "no update entries sent"},
            {"name": "cris",
             "email": "haha@ucsd.edu",
             "phone": "858-911-1198",
             "description": "I recently graduated with my bachelor's and will be working/volunteering fulltime. I do not smoke and I am clean (might misplace things though but)! I am also very sociable and enjoy cooking and baking 🙂 Hobbies I have are playing the violin, drawing, and watching kdramas! Feel free to message me for further questions ",
             "school_year": "Third",
             "major": "Data Science"},
            400
        ),
        # case6: updates are empty
        (
            "haha@ucsd.edu",
            True,
            False,
            {"data": json.dumps({
                "updates": {}
            }), "content_type": "application/json"},
            {"message": "the input data doesn't fit our schema. Did you bypass our frontend?"},
            {"name": "cris",
             "email": "haha@ucsd.edu",
             "phone": "858-911-1198",
             "description": "I recently graduated with my bachelor's and will be working/volunteering fulltime. I do not smoke and I am clean (might misplace things though but)! I am also very sociable and enjoy cooking and baking 🙂 Hobbies I have are playing the violin, drawing, and watching kdramas! Feel free to message me for further questions ",
             "school_year": "Third",
             "major": "Data Science"},
            422
        ),
    ),
)
def test_edit_profile(client, app, email, login_first, corrupt_cookie, json_query, correct_response, database_entry, correct_status_code):
    """
    Test Edit Profile
    Assumption: user has to log in to edit the profile & the profile has to exist
    """
    # if the tests requires previous log in, do it
    if login_first:
        client.post(
            "/login", data=json.dumps({"email": email}), content_type="application/json")
    if corrupt_cookie:
        # corrupt the client's cookie => to create you have to destroy
        cookie_map = {cookie.name: cookie for cookie in client.cookie_jar}
        cookie_map["access_token"].value = "fake token to see whether the engineer is dumb"
    rv = client.post(
        "/profile", **json_query)
    response_data = json.loads(rv.data)
    for key, value in correct_response.items():
        assert response_data[key] == value
    # verify database
    user = get_row_if_exists(
        User, app.config["DB_CONNECTION"], **{"email": email})
    for key, value in database_entry.items():
        assert user.serialize[key] == value
    assert rv.status_code == correct_status_code

@pytest.mark.parametrize(
    # verify_database is a boolean, when true it would fetch the row from db and verify
    # whne false, it means there should not be new row added due to invalid request, so we just need to check the row to be none(not existent)
    ("new_room_json", "login_first", "corrupt_cookie", "check_s3",
     "correct_response", "verify_database", "correct_status_code","post_content_type"),
    (
        # case1: successful offline post => user_id, access token, post json are valid
        (
            {"json": json.dumps(
            {"name": "75 Big Rock Cove St. Middletown",
             "address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["lonely"], "facilities": ["gym"],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "roomDescription": "dream house in a life time"}
            ),
            "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            True,
            False,
            False,
            {"message":MESSAGE_CREATE_ROOM_SUCCESS},
            True,
            201,
            "multipart/form-data"
        ),
        # case2: successful online post => user_id, access token, post json are valid, s3 bucket is updated
        (
            {"json": json.dumps({"name": "75 Big Rock Cove St. Middletown",
             "address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["lonely"], "facilities": ["gym"],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "roomDescription": "dream house in a life time"}),
             "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]
             },
            True,
            False,
            True,
            {"message":MESSAGE_CREATE_ROOM_SUCCESS},
            True,
            201,
            "multipart/form-data"
        ),
        # case 3: unsuccessful post => user_id, access token are valid, post json is incomplete(doesn't allow partial valid form for post room)
        (
            {"json": json.dumps({"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": [], "facilities": [],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "roomDescription": "dream house in a life time"}),
             "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            True,
            False,
            False,
            {"message":MESSAGE_INCOMPLETE_JSON},
            False,
            422,
            "multipart/form-data"
        ),
        # case 4: unsuccessful post => wrong token,failed authentication
        (
            {"json": json.dumps({"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": [], "facilities": [],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "roomDescription": "dream house in a life time"}),
             "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            True,
            True,
            False,
            {"message":MESSAGE_INVALID_TOKEN},
            False,
            401,
            "multipart/form-data"
        ),
        # case 5: unsuccessful post => didn't log in
        (
            {"json": json.dumps({"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": [], "facilities": [],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"}),
             "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            False,
            False,
            False,
            {"message":MESSAGE_NO_ACCESS_TOKEN},
            False,
            401,
            "multipart/form-data"
        ),
        # case 6: empty json
        (
            {"json": json.dumps({"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": [], "facilities": [],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"}),
             "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            False,
            False,
            False,
            {"message":MESSAGE_NO_ACCESS_TOKEN},
            False,
            401,
            "multipart/form-data"
        ),
        # case 7: no json key
        (
            {"jsony": json.dumps({"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": [], "facilities": [],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"}),
             "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            True,
            False,
            False,
            {"message":MESSAGE_MULTI_FORM_NO_JSON},
            False,
            400,
            "multipart/form-data"
        ),
        # case 8: json decode error
        (
            {"json": {"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": [], "facilities": [],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"},
             "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            True,
            False,
            False,
            {"message":MESSAGE_MULTI_FORM_JSON_DECODE_ERROR},
            False,
            400,
            "multipart/form-data"
        ),
        # case 9: incorrect other attribute
        (
            {"json": json.dumps({"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": [1,"lonely"], "facilities": [],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"}),
             "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            True,
            False,
            False,
            {"message":MESSAGE_WRONG_TYPE_JSON+"other types contain wrong type data"},
            False,
            422,
            "multipart/form-data"
        ),
        # case 9: incorrect facility attribute
        (
            {"json": json.dumps({"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["lonely"], "facilities": [2],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"}),
             "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            True,
            False,
            False,
            {"message":MESSAGE_WRONG_TYPE_JSON+"facility types contain wrong type data"},
            False,
            422,
            "multipart/form-data"
        ),
        # case10: successful offline post =>  empty attributes
        (
            {"json": json.dumps(
            {"name": "75 Big Rock Cove St. Middletown",
             "address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": [], "facilities": [],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "roomDescription": "dream house in a life time"}
            ),
            "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            True,
            False,
            False,
            {"message":MESSAGE_CREATE_ROOM_SUCCESS},
            True,
            201,
            "multipart/form-data"
        ),
        # case 11: unsuccessful post => no files
        (
            {"json": json.dumps({"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["lonely"], "facilities": ["haha"],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"}),
            "photo_files":[]},
            True,
            False,
            True,
            {"message":MESSAGE_MULTI_FORM_ALL_FILES_INVALID},
            False,
            400,
            "multipart/form-data"
        ),
        # case 12: unsuccessful post => invalid content type header
        (
            {"json": json.dumps({"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["lonely"], "facilities": ["haha"],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"}),
            "photo_files":[]},
            True,
            False,
            False,
            {"message":MESSAGE_WRONG_REQUEST_HEADER+REQUEST_TYPE_MULIFORM},
            False,
            415,
            "application/json"
        ),
        # case 13: unsuccessful post => all invalid files(images)
        (
            {"json": json.dumps({"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["lonely"], "facilities": ["haha"],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"}),
             "photo_files":["app/assets/room_mock_images/test_invalid1.jpg","app/assets/room_mock_images/test_invalid2.jpg"]},
            True,
            False,
            True,
            {"message":MESSAGE_MULTI_FORM_ALL_FILES_INVALID},
            False,
            400,
            "multipart/form-data"
        ),
        # case 14: successful post => partial invalid files(images)
        (
            {"json": json.dumps(
            {"name": "75 Big Rock Cove St. Middletown",
             "address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": [], "facilities": [],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "roomDescription": "dream house in a life time"}
            ),
            "photo_files":["app/assets/room_mock_images/test_invalid1.jpg","app/assets/room_mock_images/test_invalid2.jpg","app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            True,
            False,
            False,
            {"message":MESSAGE_CREATE_ROOM_SUCCESS},
            True,
            201,
            "multipart/form-data"
        ),
        # case 15: unsuccessful post => "json" isn't a dict
        (
            {"json": json.dumps([{"address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["lonely"], "facilities": ["haha"],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "room_description": "dream house in a life time"}]),
            "photo_files":["app/assets/room_mock_images/2.jpg"]},
            True,
            False,
            False,
            {"message":MESSAGE_MULTI_FORM_INVALID_JSON + " : json isn't a dict."},
            False,
            400,
            "multipart/form-data"
        ),
        # case 16: unsuccessful post => entry type incorrect
        (
            {"json": json.dumps(
            {"name": "75 Big Rock Cove St. Middletown",
             "address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": "500",
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["lonely"], "facilities": ["gym"],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "roomDescription": "dream house in a life time"}
            ),
            "photo_files":["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]},
            True,
            False,
            False,
            {"message":MESSAGE_WRONG_TYPE_JSON},
            False,
            422,
            "multipart/form-data"
        )
    )
)
def test_post_rooms(client, app, new_room_json, login_first, corrupt_cookie, check_s3, correct_response, verify_database, correct_status_code, post_content_type):
    if login_first:
        client.post(
            "/login", data=json.dumps({"email": "haha@ucsd.edu"}), content_type="application/json")
    if corrupt_cookie:
        # corrupt the client's cookie => to create you have to destroy
        cookie_map = {cookie.name: cookie for cookie in client.cookie_jar}
        cookie_map["access_token"].value = "fake token to see whether the engineer is dumb"
    new_room_json['photos'] = []
    valid_photos_cnt = 0
    for p_file in new_room_json["photo_files"]:
        with open(p_file, 'rb') as f: 
            file_object = io.BytesIO(f.read())
            new_room_json['photos'].append((file_object, f.name))
            valid_photos_cnt += 1 if verify_image(file_object) != "error" else 0
    # get room id inferred by # of rows, assuming no deletes happening for test sake
    room_id = get_insert_id(Room,app.config["DB_CONNECTION"])
    if check_s3:
        app.config["OFFLINE_TESTING"] = False
    rv = client.post(
        "/postRoom", data=new_room_json, content_type=post_content_type)
    response_data = json.loads(rv.data)
    for key, value in correct_response.items():
        assert response_data[key] == value
    assert rv.status_code == correct_status_code
    room = get_row_if_exists(Room, app.config["DB_CONNECTION"], **{"id": room_id})
    if verify_database:
        room_json_test = room_json(room,
                            app.config["DB_CONNECTION"],
                            True)
        for key, value in json.loads(new_room_json["json"]).items():
            assert room_json_test[key] == value
    else:
        assert room is None
    if check_s3:
        images_uploaded = get_images("test_user1",extra_path=str(room_id)+"/")
        assert len(images_uploaded) == valid_photos_cnt
        # delete test folder
        delete_folder("test_user1","houseit")

@pytest.mark.parametrize(
    ("action","room_id","login_first","add_first","verify_database","correct_response","correct_status_code"),
    (
        # case1: successful get favorite => user_id, access token, no favorites
        ("get",
        1,
        True,
        False,
        False,
        {"favorites":
            []
        },
        200
        ),
        # case2: successful get favorites => user_id, access token, room id are valid
        ("get",
        1,
        True,
        True,
        False,
        {"favorites":
            [
            {"name": "75 Big Rock Cove St. Middletown",
             "address": "75 Big Rock Cove St. Middletown, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["lonely"], "facilities": ["gym"],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 2.5,
             "numBeds": 2,
             "roomDescription": "dream house in a life time"},
            {"name": "Solazzo APT",
             "address": "Solazzo APT, NY 10940",
             "distance": "20 mins", "pricePerMonth": 500,
             "fromMonth": "June/18", "toMonth": "July/18",
             "earlyDate": "06/01/18", "lateDate": "06/12/18",
             "roomType": "Single", "other": ["happy"], "facilities": ["gym"],
             "leaserName": "cris", "leaserEmail": "haha@ucsd.edu",
             "leaserPhone": "858-911-1198",
             "leaserSchoolYear": "Third",
             "leaserMajor": "Data Science",
             "profilePhoto": "profile_photo",
             "negotiable": True,
             "numBaths": 3.0,
             "numBeds": 2,
             "roomDescription": "haha fun house in a life time"}
            ]
        },
        200
        ),
        # case3: successful add favorite => user_id, access token, room id are valid
        ("add",
        1,
        True,
        False,
        True,
        {"message":MESSAGE_POST_FAV_ADD_SUCCESS},
        201
        ),
        # case4: unsuccessful add favorite => room_id doesn't exist and isn't a string
        ("add",
        [],
        True,
        False,
        False,
        {"message":MESSAGE_WRONG_TYPE_JSON},
        422
        ),
        # case5: unsuccessful add favorite => room_id is a string and doesn't exist
        ("add",
        "8",
        True,
        False,
        False,
        {"message":MESSAGE_WRONG_TYPE_JSON},
        422
        ),
        # case6: unsuccessful add favorite => room_id is a int and doesn't exist
        ("add",
        8,
        True,
        False,
        False,
        {"message":MESSAGE_FAV_ROOM_NOT_EXIST},
        404
        ),
        # case7: unsuccessful add favorite => unsupported method
        ("sql inject",
        1,
        True,
        False,
        False,
        {"message":MESSAGE_POST_FAV_METHOD_NOT_SUPPORTED},
        405
        ),
        # case8: unsuccessful add favorite => action type incorrect : str
        (None,
        1,
        True,
        False,
        False,
        {"message":MESSAGE_INCOMPLETE_JSON},
        422
        ),
        # case8: unsuccessful add favorite => action type incorrect: int
        (2,
        1,
        True,
        False,
        False,
        {"message":MESSAGE_WRONG_TYPE_JSON},
        422
        ),
        # case9: successful remove favorite => user_id, access token, room id are valid
        ("delete",
        1,
        True,
        False,
        True,
        {"message":MESSAGE_POST_FAV_DEL_SUCCESS},
        200
        ),
        # case10: successful add favorite => user_id, access token are valid, user attempts to add favorite twice(check by room id)
        ("add twice",
        1,
        True,
        False,
        True,
        {"message":MESSAGE_POST_FAV_ADD_SUCCESS},
        201
        ),
        # case11: successful remove favorite => user_id, access token are valid, user attempts to delete favorite twice 
        ("delete twice",
        1,
        True,
        False,
        True,
        {"message":MESSAGE_POST_FAV_DEL_SUCCESS},
        200
        ),
        # case12: unsuccessful add/get/remove bookmark => failed authentication
        ("delete",
        1,
        False,
        False,
        True,
        {"message":MESSAGE_NO_ACCESS_TOKEN},
        401
        ),
        # case13: super edge case: access token not no user id
        ("super edge case",
        1,
        True,
        False,
        False,
        {"message":MESSAGE_USER_NOT_LOGGED_IN},
        401
        ),
    ),
)


def test_favorite(client,app, action, room_id,login_first, add_first,verify_database, correct_response, correct_status_code):
    if login_first:
        if action == "super edge case":
            login_email = "darn@ucsd.edu"
            action = "add"
        else: 
            login_email = "haha@ucsd.edu" 
        client.post("/login", data=json.dumps({"email": login_email}), content_type="application/json")

    if add_first and correct_status_code == 200:
        # post first, generate deterministic data since create houses randomly generate listings
        for new_room_json in correct_response["favorites"]:
            photos = []
            for p_file in ["app/assets/room_mock_images/1.jpg","app/assets/room_mock_images/2.jpg"]:
                with open(p_file, 'rb') as f: 
                    file_object = io.BytesIO(f.read())
                    photos.append((file_object, f.name))
            rv = client.post(
            "/postRoom", 
            data={"json":json.dumps(new_room_json),"photos":photos},
            content_type="multipart/form-data")
            response_data = json.loads(rv.data)
        # manually add favorites
        user = get_row_if_exists(User, app.config["DB_CONNECTION"], **{"id":1})
        room = get_row_if_exists(Room, app.config["DB_CONNECTION"], **{"id":3})
        add_favorite(room,user, app.config["DB_CONNECTION"])
        room = get_row_if_exists(Room, app.config["DB_CONNECTION"], **{"id":4})
        add_favorite(room,user, app.config["DB_CONNECTION"])
    

    if action == "get":
        rv = client.get("/favorite")
        response_data = json.loads(rv.data)
        if correct_response["favorites"] == []:
            assert response_data["favorites"] == correct_response["favorites"]
        else:
            for idx,new_room_json in enumerate(correct_response["favorites"]):
                for key, value in new_room_json.items():
                    assert response_data["favorites"][idx][key] == value
    else:
        if action is None:
            rv = client.post(
                    "/favorite", data=json.dumps({"room_id":room_id}), content_type="application/json")
        else:
            # if add twice, add it first
            if action == "add twice":
                user = get_row_if_exists(User, app.config["DB_CONNECTION"], **{"id":1})
                room = get_row_if_exists(Room, app.config["DB_CONNECTION"], **{"id":1})
                add_favorite(room,user, app.config["DB_CONNECTION"])
                action = "add"
            if action == "delete twice":
                remove_entry(Favorite,1, app.config["DB_CONNECTION"])
                action = "delete"
            rv = client.post(
                "/favorite", data=json.dumps({"action": action, "room_id":room_id}), content_type="application/json")
        response_data = json.loads(rv.data)
        for key, value in correct_response.items():
            assert response_data[key] == value
        if action == "add":
            favorite = get_row_if_exists(Favorite, app.config["DB_CONNECTION"], **{"id": str(room_id)})
            if verify_database:
                assert favorite.id == 1
                assert favorite.room.id == 1
            else:
                assert favorite is None
        elif action == "delete":
            favorite = get_row_if_exists(Favorite, app.config["DB_CONNECTION"], **{"id": str(room_id)})
            if not verify_database:
                assert favorite.id == 1
                assert favorite.room.id == 1
            else:
                assert favorite is None
    assert rv.status_code == correct_status_code

