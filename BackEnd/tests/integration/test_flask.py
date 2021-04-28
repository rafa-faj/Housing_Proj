from app import create_app
from app.db.create_houses import setup_houses
import pytest
import os
import json
from flask import session


@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    # create the app with common test config
    file_path = os.getcwd()+"/tests/integration/housing.db"
    db_path = "sqlite:///"+file_path
    # setup_houses(db_path)
    app = create_app(
        {"TESTING": True, "SQLALCHEMY_DATABASE_URI": db_path, "ALLOWED_ORIGINS":{"127.0.0.1"}})
    # create the database and load test data
    with app.app_context():
        setup_houses(db_path)
    yield app

    # close and remove the temporary database
    os.unlink(file_path)


@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()


def test_mock_db(client):
    """Start with a blank database."""

    rv = client.get("/getRecentRoomIds")
    assert len(json.loads(rv.data)) == 2


@pytest.mark.parametrize(
    ("name", "email", "user_id", "correct_response"),
    (
        # case 1: Testing existing user.
        # phone, description, schoolYear, major are attributes that already exist.
        # So they are used to compared the ones in the database rather than create new ones
        ("cris",
         "haha@ucsd.edu",
         1,
         {"name": "cris",
          "email": "haha@ucsd.edu",
          "phone": "858-911-1198",
          "description": "I recently graduated with my bachelor's and will be working/volunteering fulltime. I do not smoke and I am clean (might misplace things though but)! I am also very sociable and enjoy cooking and baking 🙂 Hobbies I have are playing the violin, drawing, and watching kdramas! Feel free to message me for further questions ",
          "schoolYear": "Third",
          "major": "Data Science"}),
        # case 2: new user
        ("yijian",
         "yzuaxi@ucsd.edu",
         None,
         {"newUser": True}),
    ),
)
def test_single_login_valid_input(client, name, email, user_id, correct_response):
    """Test the login process of flask"""
    rv = client.post(
        "/login", data=json.dumps({"name": name, "email": email}), content_type="application/json")
    response_data = json.loads(rv.data)
    assert rv.status_code == 200
    for key, value in correct_response.items():
        assert response_data[key] == value
    # check cookie is set properly
    cookie_map = {cookie.name: cookie.value for cookie in client.cookie_jar}
    # only include session cookie and access token
    assert len(cookie_map) == 2
    # has cookie accesstoken
    assert "access_token" in cookie_map
    # accesstoken equal to that of current session
    with client:
        # dummy path to submit http request and get the client session
        client.get("/")
        assert cookie_map["access_token"] == session["access_token"]
        assert user_id == session.get("user_id", None)


@pytest.mark.parametrize(
    ("name", "email", "correct_response"),
    (
        # case 1: Testing existing user.
        # phone, description, schoolYear, major are attributes that already exist.
        # So they are used to compared the ones in the database rather than create new ones
        ("cris",
         "haha@ucsd.edu",
         [{"name": "cris",
          "email": "haha@ucsd.edu",
           "phone": "858-911-1198",
           "description": "I recently graduated with my bachelor's and will be working/volunteering fulltime. I do not smoke and I am clean (might misplace things though but)! I am also very sociable and enjoy cooking and baking 🙂 Hobbies I have are playing the violin, drawing, and watching kdramas! Feel free to message me for further questions ",
           "schoolYear": "Third",
           "major": "Data Science"},
          {"message": "You have already logged in"},
          {"message": "You have already logged in"}
          ]),
        # case 2: new user
        ("yijian",
         "yzuaxi@ucsd.edu",
         [{"newUser": True},
          {"newUser": True},
          {"newUser": True}
          ]),
    ),
)
def test_multiple_login_valid_input(client, name, email, correct_response):
    """Test case where user tried login but never """
    rv = client.post(
        "/login", data=json.dumps({"name": name, "email": email}), content_type="application/json")
    response_data = json.loads(rv.data)
    assert rv.status_code == 200
    # first time, same as previous single atomic test
    for key, value in correct_response[0].items():
        assert response_data[key] == value
    # second and third time, be informed of already loggedin. Third time is used to verify state doesn"t change.
    rv = client.post(
        "/login", data=json.dumps({"name": name, "email": email}), content_type="application/json")
    response_data = json.loads(rv.data)
    assert rv.status_code == 200
    for key, value in correct_response[1].items():
        assert response_data[key] == value
    rv = client.post(
        "/login", data=json.dumps({"name": name, "email": email}), content_type="application/json")
    response_data = json.loads(rv.data)
    assert rv.status_code == 200
    for key, value in correct_response[2].items():
        assert response_data[key] == value


@pytest.mark.parametrize(
    ("name", "email", "allowed_origins", "correct_response","correct_status_code"),
    (
        # case 1: origin forbidden. valid origin has already been tested through default setting in previous tests.
        ("cris",
         "haha@ucsd.edu",
        {"127.0.0.2"},
         {"message": "Invalid Domain. How did you find us???? HAHA. TROLLED. FOLLOW HOMEHUB @ LinkedIn"},
         401),
    )
)
def test_login_invalid_origin(client, app,  name, email, allowed_origins, correct_response, correct_status_code):
    app.config["ALLOWED_ORIGINS"] = allowed_origins
    rv = client.post(
        "/login", data=json.dumps({"name": name, "email": email}), content_type="application/json")
    response_data = json.loads(rv.data)
    for key, value in correct_response.items():
        assert response_data[key] == value
    assert rv.status_code == correct_status_code

# @pytest.mark.parametrize(
#     ("json_query", "correct_response"),
#     (
#         # case 1: Testing request json without email
#         ({"name": "cris"},
#        {}),
#         # case 2: Testing request json without email
#         ({"name": "cris"},
#        {}),
#         # case 3: test non ucsd email, will check both the google token and email
#         ("yijian",
#          "yzuaxi@ucla.edu",
#          [{"newUser": True},
#           {"newUser": True},
#           {"newUser": True}
#           ]),
#     ),
# )
# def test_login_invalid_input_in_json(client, json_query, correct_response):
#     rv = client.post(
#         "/login", data=json.dumps(json_query), content_type="application/json")
#     response_data = json.loads(rv.data)
#     assert rv.status_code == 200

#     return

# @pytest.mark.parametrize(
#     ("name", "email", "correct_response"),
#     (
#         # case 1: Testing data but not as json
#         ("cris",
#          "haha@ucsd.edu",
#          [{"name": "cris",
#           "email": "haha@ucsd.edu",
#            "phone": "858-911-1198",
#            "description": "I recently graduated with my bachelor's and will be working/volunteering fulltime. I do not smoke and I am clean (might misplace things though but)! I am also very sociable and enjoy cooking and baking 🙂 Hobbies I have are playing the violin, drawing, and watching kdramas! Feel free to message me for further questions ",
#            "schoolYear": "Third",
#            "major": "Data Science"},
#           {"message": "You have already logged in"},
#           {"message": "You have already logged in"}
#           ]),
#         # case 2: test no json and no data
#         ("yijian",
#          "yzuaxi@ucla.edu",
#          [{"newUser": True},
#           {"newUser": True},
#           {"newUser": True}
#           ]),
#     ),
# )
# def test_multiple_login_invalid_no_json(client, name, email, correct_response):

#     return
# {"name": "yijian",
# "email": "yzuaxi@ucsd.edu",
# "phone": "858-119-1128",
# "description": "Life is pretty hard. Follow crisway I will show you the way",
# "schoolYear": "Grad",
# "major": "Computer Science and Engineering"}

# test requseted domain
