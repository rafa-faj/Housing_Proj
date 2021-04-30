from flask import jsonify, make_response
from google.oauth2 import id_token
from google.auth.transport import requests
from google.auth.exceptions import GoogleAuthError


def generateResponse(elem={}, status=200):
    """Simple wrapper to return consumable json response"""
    # generated response in default has 200 status code
    response = make_response(jsonify(elem), status)
    return response


def isLoggedin(curr_session):
    """Check if the current user has already logged in"""
    access_token = curr_session.get("access_token", None)
    user_id = curr_session.get("user_id", None)
    # logged in is define by a accesstoken + an existing user_id
    # this prevents case where user doesn't create an account
    return access_token is not None and user_id is not None


def getEmailDomain(email_string):
    """Get domain of an email string, assuming it is correctly formatted"""
    res = email_string.split('@')[-1]
    return res


def fetchTestToken(target_audience):
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


def verifyEmail(google_login_token, whitelisted_domains, target_audience):
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
        domain = getEmailDomain(id_info['email'])
        if domain in whitelisted_domains:
            return 200, MESSAGE_VERIFIED, id_info['email']
        else:
            return 503, MESSAGE_NOT_SUPPORTED, id_info['email']
    except (GoogleAuthError, ValueError):
        return 401, MESSAGE_INVALID_TOKEN, None
