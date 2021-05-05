import os
from datetime import datetime
from app.db.database_setup import Base, User
import random
from flask import Flask, render_template, request, redirect,\
    jsonify, url_for, flash, make_response, Response
from flask import session as login_session
from flask_cors import CORS
from app.assets.options import others, facilities
from app.util.aws.s3 import get_images
from app.bluePrints.auth import authetication
from app.db.database_setup import Bookmark, Room
from flask_sqlalchemy import SQLAlchemy
from app.util.util import *
from app.util.env_setup import set_backend_config
import json
import os
from app.db.crud import room_json, read_rooms, read_room, write_room, add_bookmark, \
    remove_bookmark, update_field


def create_app(test_config=None):
    try:
        backend_config = json.loads(os.environ["BACKEND_CONFIG"])
    except KeyError:
        # path not yet set
        set_backend_config()
        backend_config = json.loads(os.environ["BACKEND_CONFIG"])
    backend_config["ALLOWED_ORIGINS"] = set(backend_config["ALLOWED_ORIGINS"])
    app = Flask(__name__)
    app.config.update(backend_config)
    app.secret_key = app.config["FLASK_SECRET_KEY"]
    if test_config:
        app.config.update(test_config)
    db = SQLAlchemy(app)
    app.register_blueprint(authetication)
    session = db.create_scoped_session()
    app.config["DB_CONNECTION"] = session
    CORS(app, supports_credentials=True)

    @ app.route("/profile", methods=["POST", "OPTIONS"])
    def edit_profile():
        """Function to let users edit their existing profiles
        edit profile photo currently is disabled
        """
        # handle pre-flight for browsers CORS access
        if request.method == "OPTIONS":
            return generate_response()
        # part1: verify that the request is legit
        checked_and_verified, response = check_verify_token(request,login_session)
        if checked_and_verified != True: return response
        # part2: check json
        checked_json, response, requested_json = check_json_form(request,MESSAGE_BAD_JSON,MESSAGE_CREATE_USER_NO_JSON)
        if checked_json != True: return response
        # part3: verify json data
        try:
            user_email = login_session["login_user_email"]
        except KeyError:
            # key error means we are offline til this far
            user_email = requested_json["email"]
        # design decision: if there are invalid field names, only update the valid fields.
        # check updates keys and formats
        try:
            update_pairs = requested_json["updates"]
            if isinstance(update_pairs,dict) != True:
                response = generate_message("updates are not in form of dictionaries",400)
            else:
                correct_format,valid_update_pairs, response = process_request_json(User,update_pairs)
                if correct_format == True: 
                    update_field(User, session, {"email": user_email},valid_update_pairs)
                    response = generate_message("Successfully update the data!",200)
        except KeyError:
            response = generate_message("no update entries sent",400)
        return response

    @ app.route("/getRecentRoomIds")
    def get_recent_rooms():
        """
        Get recent rooms sorted by date created
        """
        rooms_db = read_rooms(session)
        rooms_db.sort(key=lambda elem: elem.date_created, reverse=True)
        room_ids = [room.id for room in rooms_db]
        return generate_response(elem=room_ids)

    @ app.route("/getRoom/<room_id>")
    def get_room(room_id):
        """
        Get room of particular id
        """
        room_entry = read_room(room_id, session)
        # if the provided id doesn't match any room in the db, return -1 to indicate not found
        if room_entry is None:
            room = {"roomId":-1}
            status_code = 404
        else:
            status_code = 200
            room = room_json(room_entry, session)
        return generate_response(room,status_code)

    # commented since not needed for 1.0 release
    # @ app.route("/postRoom", methods=["POST", "OPTIONS"])
    # def post_rooms():
    #     # handle pre-flight for browsers CORS access
    #     if request.method == "OPTIONS":
    #         return generate_response()
    #     # part1: verify that the request is legit
    #     session = current_app.config["DB_CONNECTION"]
    #     # verify the token
    #     checked_and_verified, response = check_verify_token(request,login_session)
    #     if checked_and_verified == False: return response
    #     photo = request.files.getlist("photos")
    #     requested_json = json.loads(request.form["json"])
    #     requested_json["photos"] = photo
    #     success = write_room(requested_json, session)
    #     message, status = "Successfully created room.", 201
    #     if not success:
    #         message, status = "Internal Database Failure.\
    #                     We are working our ass off to fix it", 500
    #     return generate_response(elem=message, status=status)

    # @ app.route("/bookmark", methods=["POST", "OPTIONS", "GET"])
    # def bookmark():
    #     if request.method == "OPTIONS":
    #         return generate_response()
    #     requested_json = request.json
    #     client_token = request.cookies.get("access_token")
    #     if not client_token or (client_token != login_session["access_token"]):
    #         # if user is not logged in
    #         print(client_token, login_session["access_token"])
    #         return generate_response(elem="Bookmark get/add/remove is forbidden due to invalid token", status=403)
    #     if request.method == "GET":
    #         bookmark_rooms = [bookmark.room_id for bookmark in session.query(
    #             Bookmark).filter_by(user_id=login_session["user_id"]).all()]
    #         return generate_response(elem=bookmark_rooms)
    #     message, status = "Successfully added bookmark.", 201
    #     if requested_json["action"] == "add":
    #         add_bookmark(requested_json["room_id"],
    #                      login_session["user_id"], session)
    #     else:
    #         remove_bookmark(
    #             requested_json["room_id"], login_session["user_id"], session)
    #         message, status = "Successfully deleted bookmark.", 200
    #     return generate_response(elem=message, status=status)

    return app


# if __name__ == "__main__":
#     app.secret_key = b"\xb7\xe2\xd6\xa3\xe2\xe0\x11\xd1\x92\xf1\x92G&>\xa2:"
#     app.debug = True
#     app.run(host="0.0.0.0", port=3002)
