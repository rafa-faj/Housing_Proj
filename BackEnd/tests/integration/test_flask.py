from app import create_app
from app.db.create_houses import setup_houses
import pytest
import os
import json
from flask import session
from app.util.util import *


@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    # create the app with common test config
    file_path = os.getcwd()+"/tests/integration/housing.db"
    db_path = "sqlite:///"+file_path
    # setup_houses(db_path)
    app = create_app(
        {"OFFLINE_TESTING": True,
         "SQLALCHEMY_DATABASE_URI": db_path,
         "ALLOWED_ORIGINS": {"127.0.0.1"}})
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
    """Start with a mock database."""

    rv = client.get("/getRecentRoomIds")
    assert len(json.loads(rv.data)) == 2


@pytest.mark.parametrize(
    ("email", "user_id", "correct_response"),
    (
        # case 1: Testing existing user.
        # phone, description, schoolYear, major are attributes that already exist.
        # So they are used to compared the ones in the database rather than create new ones
        (
            "haha@ucsd.edu",
            1,
            {"name": "cris",
             "email": "haha@ucsd.edu",
             "phone": "858-911-1198",
             "description": "I recently graduated with my bachelor's and will be working/volunteering fulltime. I do not smoke and I am clean (might misplace things though but)! I am also very sociable and enjoy cooking and baking 🙂 Hobbies I have are playing the violin, drawing, and watching kdramas! Feel free to message me for further questions ",
             "schoolYear": "Third",
             "message": "Successful login for offline testing!",
             "major": "Data Science"}),
        # case 2: new user
        (
            "yzuaxi@ucsd.edu",
            None,
            {"newUser": True}),
    ),
)
def test_single_login_valid_input(client, email, user_id, correct_response):
    """Test the login process of flask"""
    rv = client.post(
        "/login", data=json.dumps({"email": email}), content_type="application/json")
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
    ("email", "correct_response"),
    (
        # case 1: Testing existing user.
        # phone, description, schoolYear, major are attributes that already exist.
        # So they are used to compared the ones in the database rather than create new ones
        (
            "haha@ucsd.edu",
            [{"name": "cris",
              "email": "haha@ucsd.edu",
              "phone": "858-911-1198",
              "description": "I recently graduated with my bachelor's and will be working/volunteering fulltime. I do not smoke and I am clean (might misplace things though but)! I am also very sociable and enjoy cooking and baking 🙂 Hobbies I have are playing the violin, drawing, and watching kdramas! Feel free to message me for further questions ",
              "schoolYear": "Third",
              "message": "Successful login for offline testing!",
              "major": "Data Science"},
             {"message": "You have already logged in"},
                {"message": "You have already logged in"}
             ]),
        # case 2: new user
        (
            "yzuaxi@ucsd.edu",
            [{"newUser": True},
             {"newUser": True},
                {"newUser": True}
             ]),
    ),
)
def test_multiple_login_valid_input(client, email, correct_response):
    """Test case where user has attempted several logins"""
    rv = client.post(
        "/login", data=json.dumps({"email": email}), content_type="application/json")
    response_data = json.loads(rv.data)
    assert rv.status_code == 200
    # first time, same as previous single atomic test
    for key, value in correct_response[0].items():
        assert response_data[key] == value
    # second and third time, be informed of already loggedin. Third time is used to verify state doesn't change.
    rv = client.post(
        "/login", data=json.dumps({"email": email}), content_type="application/json")
    response_data = json.loads(rv.data)
    assert rv.status_code == 200
    for key, value in correct_response[1].items():
        assert response_data[key] == value
    rv = client.post(
        "/login", data=json.dumps({"email": email}), content_type="application/json")
    response_data = json.loads(rv.data)
    assert rv.status_code == 200
    for key, value in correct_response[2].items():
        assert response_data[key] == value


@pytest.mark.parametrize(
    ("email", "allowed_origins", "correct_response", "correct_status_code"),
    (
        # case 1: origin forbidden. valid origin has already been tested through default setting in previous tests.
        (
            "haha@ucsd.edu",
            {"127.0.0.2"},
            {"message": "Invalid Domain. How did you find us???? HAHA. TROLLED. FOLLOW HOMEHUB @ LinkedIn"},
            401),
    )
)
def test_login_invalid_origin(client, app, email, allowed_origins, correct_response, correct_status_code):
    app.config["ALLOWED_ORIGINS"] = allowed_origins
    rv = client.post(
        "/login", data=json.dumps({"email": email}), content_type="application/json")
    response_data = json.loads(rv.data)
    for key, value in correct_response.items():
        assert response_data[key] == value
    assert rv.status_code == correct_status_code


@pytest.mark.parametrize(
    ("json_query", "online_config", "correct_response",
     "correct_status_code", "fetch_token_true"),
    (
        # case 1: Testing request json without token
        ({"data": json.dumps({"name": "cris"}), "content_type": "application/json"},
         {"ALLOWED_DOMAINS": {"ucsd.edu", "homehub-312115.iam.gserviceaccount.com"}},
         {"message": "Why Log in without giving your token? Are you an intruder? Quid pro quo bro"},
         400,
         False),
        # case 2: Testing request without json header but with token
        ({"data": json.dumps({"google_login_token": "lol"})},
         {"ALLOWED_DOMAINS": {"ucsd.edu", "homehub-312115.iam.gserviceaccount.com"}},
         {"message": "Why Log in without a json? Did you forget something?"},
         400,
         False),
        # case 3: Testing request without json and without data
        ({},
         {"ALLOWED_DOMAINS": {"ucsd.edu", "homehub-312115.iam.gserviceaccount.com"}},
         {"message": "Why Log in without a json? Did you forget something?"},
         400,
         False),
        # case 4: Testing an email that have a valid token but doesn't have allowed domains
        ({"data": {}, "content_type": "application/json"},
         {"ALLOWED_DOMAINS": {"ucsd.edu"}},
         {"message": "the domain is not currently supported. We will keep expanding."},
         503,
         True),
        # case 5: Testing an email that is whitelisted and has valid token
        ({"data": {}, "content_type": "application/json"},
         {"ALLOWED_DOMAINS": {"ucsd.edu", "homehub-312115.iam.gserviceaccount.com"}},
         {"message": "email is verified. So you are our HOMIE! NOICE"},
         200,
         True),
        # case 6: Testing request with an invalid token
        ({"data": json.dumps({"google_login_token": "lol"}), "content_type": "application/json"},
         {"ALLOWED_DOMAINS": {"ucsd.edu", "homehub-312115.iam.gserviceaccount.com"}},
         {"message": "The token is invalid. Seems like you want to be a con artist. Have you read the Art of Deception?"},
         401,
         False),

    ),
)
def test_login_online(client, app, json_query, online_config, correct_response, correct_status_code, fetch_token_true):
    app.config["OFFLINE_TESTING"] = False
    app.config.update(online_config)
    # online test tends to be flaky due to dependency on API. So we try 3 times before giving up.
    if fetch_token_true == True:
        for _ in range(3):
            fetch_status, google_login_token = fetchTestToken(
                app.config["GAUTH_AUDIENCE"])
            if fetch_status == True:
                break
        if fetch_status != True:
            print("Remote API isn't working. Maybe try again later.")
            return
        json_query["data"]["google_login_token"] = google_login_token
        json_query["data"] = json.dumps(json_query["data"])
    rv = client.post(
        "/login", **json_query)
    response_data = json.loads(rv.data)
    assert rv.status_code == correct_status_code
    for key, value in correct_response.items():
        assert response_data[key] == value


@pytest.mark.parametrize(
    ("email", "login_first", "corrupt_cookie",
     "correct_response", "correct_status_code"),
    (
        # case1: successful logout => token and user id deleted
        (
            "haha@ucsd.edu",
            True,
            False,
            {"message": "Successful Logout!"},
            200),
        # case2: already logout/never login(no token and user id) => test Idempotence
        (
            "haha@ucsd.edu",
            False,
            False,
            {"message": "You have already logged out!"},
            200),
        # case3: unsuccessful logout => wrong token when user is still logged in(forgery attack)
        (
            "haha@ucsd.edu",
            True,
            True,
            {"message":
                "Cross-Site Request Forgery (XSRF/CSRF) attacks huh? GOTCHA!"},
            401),
    )
)
def test_single_logout(client, login_first, corrupt_cookie, email, correct_response, correct_status_code):
    """Test the logout process of flask"""
    # if the tests requires previous log in, do it
    if login_first:
        rv = client.post(
            "/login", data=json.dumps({"email": email}), content_type="application/json")
    if corrupt_cookie:
        # corrupt the client's cookie => to create you have to destroy
        cookie_map = {cookie.name: cookie for cookie in client.cookie_jar}
        cookie_map["access_token"].value = "fake token to see whether the engineer is dumb"
    rv = client.get("/logout")
    response_data = json.loads(rv.data)
    for key, value in correct_response.items():
        assert response_data[key] == value
    assert rv.status_code == correct_status_code
