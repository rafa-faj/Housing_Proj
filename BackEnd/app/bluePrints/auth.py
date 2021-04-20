from flask import current_app, Blueprint, request, \
    jsonify, session as login_session, Response
from app.db.crud import check_exist, add_user
from app.db.database_setup import User
from datetime import datetime
from app.util.util import generateResponse
from app.util.aws.s3 import upload_file_wname
import os
import random
import string

authetication = Blueprint('auth', __name__)

def create_auth_token():
    """Create anti-forgery state token."""
    return "".join(random.choice(string.ascii_uppercase + string.digits)
                           for x in range(32))

@authetication.route("/login", methods=['POST', 'OPTIONS'])
def login():
    """Login user and set a cookie for them."""
    if request.method == 'OPTIONS':
        return generateResponse()
    requested_json = request.json
    # check in with db to see if user is new
    session = current_app.config['DB_CONNECTION']
    user = check_exist(User, session, **{'email': requested_json['email']})
    if not user:
        # User doesn't exist
        # maybe also do: , 'access_token': access_token
        json_response = {'newUser': True}
        return generateResponse(json_response)

    access_token = create_auth_token()
    login_session["access_token"] = access_token
    login_session["user_id"] = user.id

    path_name = "/".join(["user"+str(user.id),
                          'profile', "headshot.jpg"])
    json_response = {'name': requested_json['name'],
                     'email': requested_json['email'],
                     'message': 'Successfully created room.',
                     'description': user.description,
                     'phone': user.phone,
                     'schoolYear': user.school_year,
                     'major': user.major,
                     'profile_photo': path_name
                     }
    response = generateResponse(json_response)
    response.set_cookie('access_token', access_token)
    return response


@authetication.route("/logout", methods=['POST', 'OPTIONS'])
def logout():
    if request.method == 'OPTIONS':
        return generateResponse()
    client_token = request.cookies.get("access_token")
    message, status = 'Successful Logout!', 200
    # delete the user id
    if not client_token or (client_token != login_session["access_token"]):
        message, status = 'Logout is Forbidden due to wrong token', 403
        print(client_token, login_session["access_token"])
    else:
        del login_session["user_id"]
        del login_session["access_token"]
    response = generateResponse(elem=message, status=status)
    response.set_cookie('access_token', '', expires=0) # remove cookie by expiring it immediately
    return response


@authetication.route("/createUser", methods=["POST", "OPTIONS"])
def create_user():
    session = current_app.config['DB_CONNECTION']
    if request.method == 'OPTIONS':
        return generateResponse()
    requested_json = request.json
    if check_exist(User, session, **{'email': requested_json['email']}):
        message, status = 'Already Created', 200
        return generateResponse(elem=message, status=status)

    user = add_user(requested_json['name'],
                    requested_json['email'],
                    datetime.now(),
                    requested_json['phone'],
                    requested_json["description"],
                    requested_json["schoolYear"],
                    requested_json["major"],
                    session)
    access_token = create_auth_token()
    login_session["access_token"] = access_token
    login_session["user_id"] = user.id
    icon_path = './assets/profile_default_icons/'
    selected_icon = random.choice(
        os.listdir(icon_path))
    path_name = "/".join(["user"+str(user.id),
                          'profile', "headshot.jpg"])
    upload_file_wname(icon_path+selected_icon, 'houseit', path_name)

    json_response = {'name': requested_json['name'],
                     'email': requested_json['email'],
                     'access_token': login_session["access_token"],
                     'message': 'Successfully created room.',
                     'description': user.description,
                     'phone': user.phone,
                     'schoolYear': user.school_year,
                     'major': user.major,
                     'profilePhoto': path_name
                     }
    response = generateResponse(json_response, 201)
    response.set_cookie('access_token', login_session["access_token"])

    return response

@authetication.route("/me")
def get_user():
    """Return user profile and update their cookie + access token."""
    client_token = request.cookies.get("access_token")
    if not client_token or (client_token != login_session["access_token"]):
        # if user is not logged in
        print(client_token, login_session["access_token"])
        return generateResponse(elem="No current logged in user due to invalid token", status=403)

    user_id = login_session["user_id"]
    access_token = create_auth_token()
    login_session["access_token"] = access_token

    session = current_app.config['DB_CONNECTION']
    user = check_exist(User, session, **{'id': user_id})
    path_name = "/".join(["user"+str(user.id),
                          'profile', "headshot.jpg"])

    json_response = {'name': user.name,
                     'email': user.email,
                     'description': user.description,
                     'phone': user.phone,
                     'schoolYear': user.school_year,
                     'major': user.major,
                     'profilePhoto': path_name
                     }
    response = generateResponse(json_response)
    response.set_cookie('access_token', access_token)
    return response
