import json
import pytest
from app.assets.request_message_map import *
from app.db.crud import get_row_if_exists
from app.db.database_setup import User, Room

def test_get_recent_rooms(client,app):
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
    ("room_id","correct_status_code","correct_id"),
    (
        #case1: the room exists and returns
        (
            1, 
            200,
            1
        ),
        # case2: the room doesn't exist
        (
            3, 
            404,
            -1
        )
    )
)
def test_get_room(client,app,room_id,correct_status_code,correct_id):
    """Test get a particular rooms with mock database
    """
    rv = client.get("/getRoom/"+str(room_id))
    room_json = json.loads(rv.data)
    assert room_json["roomId"] == correct_id
    assert rv.status_code == correct_status_code


# test post_rooms
# case1: successful post => user_id, access token, post json are valid
# case2: unsuccessful post => user_id, access token are valid, post json is invalid(doesn't allow partial valid form for post room)
# case3: unsuccessful post => failed authentication
# case4: unsuccessful post => no files 
# case5: unsuccessful post => invalid files 
# case6: unsuccessful post => invalid json 

# test test bookmark
# case1: successful get bookmark => user_id, access token, room id are valid
# case2: successful add bookmark => user_id, access token, room id are valid
# case3: successful remove bookmark => user_id, access token, room id are valid
# case4: unsuccessful add bookmark => user_id, access token are valid, but user attempts to add bookmark twice(check by room id)
# case5: unsuccessful remove bookmark => user_id, access token are valid, but user attempts to delete bookmark twice / delete non existent
# case6: unsuccessful add/get/remove bookmark => failed authentication

@pytest.mark.parametrize(
    ("email", "login_first", "corrupt_cookie","json_query",
     "correct_response", "database_entry", "correct_status_code"),
    (
        # case1: failed authentication check => user_id, access token not valid (just need to sample check since the mechanism is checked in other test cases)
        (
            "haha@ucsd.edu",
            True,
            True,
            {"data": json.dumps({"updates":{"name": "Thanos",
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
            {"data": json.dumps({"updates":{"name": "Thanos",
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
            {"data": json.dumps({"updates":{"nickname":"Cris",
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
            {"data": json.dumps({"updates":{"name": "CRISTIANO",
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
            {"data": json.dumps({"updates":{"name": 123,
                                 "email": "nonexistent@ucsd.edu",
                                 "description": "YOU COULD NOT LIVE WITH YOUR OWN FAILURE, AND WHERE DID THAT BRING YOU? BACK TO ME",
                                 "phone": "858-777-2345",
                                 "major": "MARVEL SCIENCE",
                                 }}), "content_type": "application/json"},
            {"message":"the input data doesn't fit our schema. Did you bypass our frontend?"},
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
                      "id":7,
                      "email": "thanos@ucsd.edu",
                      "name": "CRISTIANO",
                      "description": "YOU COULD NOT LIVE WITH YOUR OWN FAILURE, AND WHERE DID THAT BRING YOU? BACK TO ME",
                      "phone": "858-777-2345",
                      "school_year": "Grad",
                      "major": "MARVEL SCIENCE",
                      }), "content_type": "application/json"},
            {"message":"no update entries sent"},
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
                      "updates":{}
                      }), "content_type": "application/json"},
            {"message":"the input data doesn't fit our schema. Did you bypass our frontend?"},
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
def test_edit_profile(client,app,email,login_first,corrupt_cookie,json_query, correct_response, database_entry, correct_status_code):
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
