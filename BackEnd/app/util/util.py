from flask import jsonify, make_response


def generateResponse(elem={}, status=200):
    response = make_response(jsonify(elem), status)
    return response


def isLoggedin(curr_session):
    """
    check if the current user has already logged in
    """
    access_token = curr_session.get("access_token", None)
    user_id = curr_session.get("user_id", None)
    return access_token is not None and user_id is not None
