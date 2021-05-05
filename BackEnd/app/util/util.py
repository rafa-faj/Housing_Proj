from flask import jsonify, make_response
from google.oauth2 import id_token
from google.auth.transport import requests
from google.auth.exceptions import GoogleAuthError
from app.assets.request_message_map import *
from werkzeug.exceptions import BadRequest


def generate_response(elem={}, status_code=200):
    """Simple wrapper to return consumable json response"""
    # generated response in default has 200 status code
    response = make_response(jsonify(elem), status_code)
    return response

def generate_message(message, status_code=200):
    """Use generate_response to for simple response with only a message entry"""
    json_response = {"message": message}
    return generate_response(json_response, status_code)


def is_loggedin(curr_session):
    """Check if the current user has already logged in"""
    access_token = curr_session.get("access_token", None)
    user_id = curr_session.get("user_id", None)
    # logged in is define by a accesstoken + an existing user_id
    # this prevents case where user doesn't create an account
    return access_token is not None and user_id is not None


def get_email_domain(email_string):
    """Get domain of an email string, assuming it is correctly formatted"""
    res = email_string.split('@')[-1]
    return res


def fetch_test_token(target_audience):
    """
    Fetch test token from a given service account

    verify with:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]

    return: (success, token)
    """
    try:
        request = requests.Request()
        iden_token = id_token.fetch_id_token(
            request, target_audience)
        return True, iden_token
    except:
        return False, None


def verify_email(google_login_token, whitelisted_domains, target_audience):
    """
    Verify user email through Google Auth Token

    Token must satisfy the below criteria:
    1. the token is from a valid issuer
    2. the email domain is currently supported

    return: (status code, result message, the email)
    """
    MESSAGE_VERIFIED = "email is verified. So you are our HOMIE! NOICE"
    MESSAGE_NOT_SUPPORTED = "the domain is not currently supported. We will keep expanding."
    MESSAGE_INVALID_TOKEN = "The token is invalid. Seems like you want to be a con artist. Have you read the Art of Deception?"
    try:
        # first step, verify the token indeeds comes from GAuth
        request = requests.Request()
        id_info = id_token.verify_oauth2_token(
            google_login_token, request, target_audience)
        # second step, verify the email domain is whitelisted
        domain = get_email_domain(id_info['email'])
        if domain in whitelisted_domains:
            return 200, MESSAGE_VERIFIED, id_info['email']
        else:
            return 503, MESSAGE_NOT_SUPPORTED, id_info['email']
    except (GoogleAuthError, ValueError):
        return 401, MESSAGE_INVALID_TOKEN, None

def get_type_map(base):
    """
    Get a map between database entry name and its corresponding python types
    This also checks whether the keys are allowed as set in __user_write_permission_field__ of the base
    """
    # Get the db table column names and their corresponding python types
    type_map = {c.name: c.type.python_type for c in base.__table__.c if c.name in base.__user_write_permission_field__}
    return type_map

def get_valid_request_keys(keys, type_map):
    """
    Get the valid keys that match database schema in json from requests 

    Simply put: filter out all the json entries that aren't in the databse schema
    return (set of keys that contain the existing columns in both request json and database schema)
    """
    return set(key for key in keys if key in type_map)


def verify_request_datatype(valid_keys,name_val_dict, type_map):
    """
    Assumption: it assumes all the keys should be matched with those on the base
    Verify that the request json user submitted has the correct types defined in the database schema
    base is the data model we defined in the database setup

    return (whether all the data are correctly formatted, key value pair if correctly formatted)
    """
    valid_dict = {key:value for key, value in name_val_dict.items() if key in valid_keys}
    # has to be non-empty dict
    correct_format = all(isinstance(value, type_map[key]) for key,value in valid_dict.items()) and len(valid_dict) > 0
    return correct_format,valid_dict

def verify_authentication(client_token, login_session):
    """
    Verify the identity of users when they perform sensitive request such as POST
    Return true if verified, and false with the error response
    """
    MESSAGE_INVALID_TOKEN = "Cross-Site Request Forgery (XSRF/CSRF) attacks huh? GOTCHA!"
    # verify the token
    if client_token != login_session["access_token"]:
        return False,generate_message(MESSAGE_INVALID_TOKEN,401)
    return True, None

def check_verify_token(request,login_session):
    """
    Check the existence of the token and verify the validity of the token

    return (check status, response)
    """
    try:
        client_token = request.cookies["access_token"]
        # verify the token
        verified,response = verify_authentication(client_token,login_session)
        if verified == False: return False,response
    except KeyError:
        # access_token doesn't exist: user hasn't been authorized to create an entry in the db
        response = generate_message(MESSAGE_NO_ACCESS_TOKEN,401)
        return False, response
    # if successfully checked, return true, None(indicating to proceed next actions)
    return True, None

def check_json_form(request, bad_req_message, no_json_message):
    """
    Check the existence of JSON before actually processing the data
    return (check status, response, json_form)
    """
    try:
        requested_json = request.json
    except BadRequest:
        response = generate_message(bad_req_message,400)
        return False,response, None
    if requested_json is None:
        response = generate_message(no_json_message,400)
        return False, response, None
    return True, None, requested_json

def process_request_json(base,value_pairs):
    """
    wrapper to process db related request json
    return (whether the json is in correct format, updates dictionary, error response)
    """
    type_map = get_type_map(base)
    valid_keys = get_valid_request_keys(value_pairs.keys(),type_map)
    # verify the json data types
    correct_format,valid_value_pairs = verify_request_datatype(valid_keys,value_pairs,type_map)
    response = None if correct_format else generate_message("the input data doesn't fit our schema. Did you bypass our frontend?",422)
    return correct_format,valid_value_pairs, response