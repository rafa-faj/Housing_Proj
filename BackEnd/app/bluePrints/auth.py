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
from crud import *
from werkzeug.exceptions import BadRequest

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
    # check requested json, see if the json contains required login info
    # first check if json exists from request
    try:
        requested_json = request.json
    except BadRequest:
        json_response = {
            "message": "Oops. Bad format for your json. Try again"}
        status_code = 400
        response = generateResponse(json_response, status_code)
        return response
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
    # access token will be issued only after user's identity is verified
    access_token = "".join(random.choice(string.ascii_uppercase + string.digits)
                           for x in range(32))
    login_session["access_token"] = access_token
    # check in with db to see if user is new
    session = current_app.config["DB_CONNECTION"]
    # Assumption: user email is a unique identifier
    user = get_row_if_exists(
        User, session, **{"email": user_email})
    if not user:
        # User doesn't exist
        json_response = {"newUser": True, "message": message}
        response = generateResponse(json_response)
        response.set_cookie("access_token", access_token)
        return response
    photo_path_name = "/".join(["user"+str(user.id),
                                "profile", "headshot.jpg"])
    login_session["user_id"] = user.id
    json_response = {"name": user.name,
                     "email": user_email,
                     "message": message,
                     "description": user.description,
                     "phone": user.phone,
                     "schoolYear": user.school_year,
                     "major": user.major,
                     "profile_photo": photo_path_name
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
            return generateResponse(json_response, status_code)
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
    """Create user function that is called when user is not in the database"""
    # handle pre-flight for browsers CORS access
    if request.method == "OPTIONS":
        return generateResponse()

    # part1: verify that the request is legit
    session = current_app.config["DB_CONNECTION"]
    try:
        client_token = request.cookies["access_token"]
        # verify the token
        if client_token != login_session["access_token"]:
            message = "Cross-Site Request Forgery (XSRF/CSRF) attacks huh? GOTCHA!"
            status_code = 401
            json_response = {"message": message}
            return generateResponse(json_response, status_code)
    except KeyError:
        # access_token doesn't exist: user hasn't been authorized to create an entry in the db
        message = "Welcome to the Lost World: Jurassic Park. You are not authorized to create an entry here."
        status_code = 401
        json_response = {"message": message}
        return generateResponse(json_response, status_code)
    try:
        # if some existing users are techie, troll them
        user_id = login_session["user_id"]
        message = "Body double is not allowed. Should've gone for the head. "
        status_code = 405
        json_response = {"message": message}
        return generateResponse(json_response, status_code)
    except KeyError:
        # nice error. This means we can proceed to process their json
        try:
            requested_json = request.json
        except BadRequest:
            json_response = {
                "message": "Oops. Bad format for your json. Try again"}
            status_code = 400
            response = generateResponse(json_response, status_code)
            return response
        if requested_json is None:
            json_response = {
                "message": "Why create users without a json? Did you forget something?"}
            status_code = 400
            response = generateResponse(json_response, status_code)
            return response
        try:
            user_name = requested_json["name"]
            user_email = requested_json["email"]
            user_phone = requested_json["phone"]
            user_description = requested_json["description"]
            user_school_year = requested_json["schoolYear"]
            user_major = requested_json["major"]
            user = add_user(user_name,
                            user_email,
                            datetime.now(),
                            user_phone,
                            user_description,
                            user_school_year,
                            user_major,
                            session)
            # update the user id in the session
            login_session["user_id"] = user.id
            # cris's favorite part: create randome icons
            icon_path = "app/assets/profile_default_icons/"
            selected_icon = random.choice(
                os.listdir(icon_path))
            photo_path_name = "/".join(["user"+str(user.id),
                                        "profile", "headshot.jpg"])
            #  upload the image to S3 endpoint if not offline testing
            if current_app.config["OFFLINE_TESTING"] != True:
                upload_file_wname(icon_path+selected_icon,
                                  "houseit", photo_path_name)
            # finally, send the sensitive data to be displayed on frontend/some techie user
            json_response = {"name": user_name,
                             "email": user_email,
                             "message": "Welcome to be a new HOMIE! CONGRATS!",
                             "description": user_description,
                             "phone": user_phone,
                             "schoolYear": user_school_year,
                             "major": user_major,
                             "profile_photo": photo_path_name
                             }
            status_code = 201
            response = generateResponse(json_response, status_code)
            return response
        except KeyError:
            status_code = 400
            json_response = {
                "message": "JSON is not complete. Did you bypass the frontend? How did you find us? SURPRISING PIKACHU FACE"}
            response = generateResponse(json_response, status_code)
            return response
