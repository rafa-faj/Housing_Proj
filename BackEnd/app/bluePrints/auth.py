from flask import current_app, Blueprint, request, \
    jsonify, session as login_session, Response
from app.db.crud import get_row_if_exists, add_user
from app.db.database_setup import User
from datetime import datetime
from app.util.util import *
from app.util.aws.s3 import upload_file_wname
import os
import random
import string

authetication = Blueprint("auth", __name__)


@authetication.route("/login", methods=["POST", "OPTIONS"])
def login():
    """Login function and create anti-forgery state token."""

    # PART1: Secure measure to verify identity

    # first check if the domain is allowed
    if request.remote_addr not in current_app.config["ALLOWED_ORIGINS"]:
        json_response = {
            "message": "Invalid Domain. How did you find us???? HAHA. TROLLED. FOLLOW HOMEHUB @ LinkedIn"}
        response = generateResponse(json_response, 401)
        return response
    # pre-flight for CORS communication
    if request.method == "OPTIONS":
        return generateResponse()
    # if user has already logged in, tell them
    if isLoggedin(login_session):
        json_response = {"message": "You have already logged in"}
        response = generateResponse(json_response)
        return response
    access_token = "".join(random.choice(string.ascii_uppercase + string.digits)
                           for x in range(32))
    login_session["access_token"] = access_token
    # check requested json, see if the json contains required login info
    # first check if json exists from request
    requested_json = request.json
    if requested_json is None:
        json_response = {
            "message": "Why Log in without a json? Did you forget something?"}
        response = generateResponse(json_response, 400)
        return response
    # second check if json conatins enough info
    try:
        google_login_token = requested_json["google_login_token"]
        # check if json contains valid info(ucsd email and google auth token)
        status_code, message, user_email = verifyEmail(
            google_login_token, current_app.config["ALLOWED_DOMAINS"], current_app.config["GAUTH_AUDIENCE"])
        # if not valid, troll them(very likely to be a hacker)
        if status_code != 200:
            json_response = {
                "message": message}
            response = generateResponse(json_response, status_code)
            return response
    except KeyError:
        # if in online test mode or production mode, return invalid response
        if current_app.config["OFFLINE_TESTING"] != True:
            json_response = {
                "message": "Why Log in without giving your token? Are you an intruder? Quid pro quo bro"}
            response = generateResponse(json_response, 400)
            return response
        user_email = requested_json["email"]
        message = "Successful login for offline testing!"
        # else just continue the flow for offline testing

    # PART2: Check whether user is new and return corresponding response

    # check in with db to see if user is new
    session = current_app.config["DB_CONNECTION"]
    # Assumption: user email is a unique identifier
    user = get_row_if_exists(
        User, session, **{"email": user_email})
    if not user:
        # User doesn"t exist
        json_response = {"newUser": True, "message": message}
        response = generateResponse(json_response)
        response.set_cookie("access_token", access_token)
        return response
    path_name = "/".join(["user"+str(user.id),
                          "profile", "headshot.jpg"])
    login_session["user_id"] = user.id
    json_response = {"name": user.name,
                     "email": user_email,
                     "message": message,
                     "description": user.description,
                     "phone": user.phone,
                     "schoolYear": user.school_year,
                     "major": user.major,
                     "profile_photo": path_name
                     }
    response = generateResponse(json_response)
    response.set_cookie("access_token", access_token)
    return response


@authetication.route("/logout", methods=["GET"])
def logout():
    """Log out the user by verifying the token"""
    try:
        # try to get the access token possibly stored in the user's request
        client_token = request.cookies["access_token"]
        # verify the token
        if client_token != login_session["access_token"]:
            message = "Cross-Site Request Forgery (XSRF/CSRF) attacks huh? GOTCHA!"
            status_code = 401
            json_response = {"message": message}
            return generateResponse(json_response,status_code)
        # token verified, login successful
        del login_session["user_id"]
        del login_session["access_token"]
        message = "Successful Logout!"
        json_response = {"message": message}
        return generateResponse(json_response)
    except KeyError:
        # access_token doesn't exist: either logged out already or never logged in
        message = "You have already logged out!"
        json_response = {"message": message}
        return generateResponse(json_response)


@authetication.route("/createUser", methods=["POST", "OPTIONS"])
def create_user():
    # it assumes the user should already have an access token from login
    # so we check if there is an access token, if not, we reject the create user request
    session = current_app.config["DB_CONNECTION"]
    if request.method == "OPTIONS":
        return generateResponse()
    requested_json = request.json
    request_token = request.cookies.get('access_token')
    if not request_token or request_token != login_session["access_token"]:
        message, status = "Invalid Request", 400
        return generateResponse(elem=message, status=status)
    if get_row_if_exists(User, session, **{"email": requested_json["email"]}):
        message, status = "Already Created", 200
        return generateResponse(elem=message, status=status)

    user = add_user(requested_json["name"],
                    requested_json["email"],
                    datetime.now(),
                    requested_json["phone"],
                    requested_json["description"],
                    requested_json["schoolYear"],
                    requested_json["major"],
                    session)
    login_session["user_id"] = user.id
    icon_path = "./assets/profile_default_icons/"
    selected_icon = random.choice(
        os.listdir(icon_path))
    path_name = "/".join(["user"+str(user.id),
                          "profile", "headshot.jpg"])
    upload_file_wname(icon_path+selected_icon, "houseit", path_name)

    json_response = {"name": requested_json["name"],
                     "email": requested_json["email"],
                     "access_token": login_session["access_token"],
                     "message": "Successfully created room.",
                     "description": user.description,
                     "phone": user.phone,
                     "schoolYear": user.school_year,
                     "major": user.major,
                     "profile_photo": path_name
                     }
    response = generateResponse(json_response, 201)
    # response.set_cookie("access_token", login_session["access_token"])

    return response
