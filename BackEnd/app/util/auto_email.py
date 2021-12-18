"""
Auto Email Sender

This script allows the user to easily send an email.
"""

import os
import json
from app.util.env_setup import set_yagmail_config, set_backend_config

import yagmail
from yagmail.error import YagInvalidEmailAddress

try:
    yagmail_config = os.environ["YAGMAIL_CONFIG"]
    backend_config = json.loads(os.environ["BACKEND_CONFIG"])
except KeyError:  # path not yet set
    set_yagmail_config()
    set_backend_config()
    yagmail_config = os.environ["YAGMAIL_CONFIG"]
    backend_config = json.loads(os.environ["BACKEND_CONFIG"])

yag = yagmail.SMTP(
    backend_config["YAGMAIL_DEFAULT_DEST"],
    oauth2_file=yagmail_config
)


def send_email(to, subject, content, ip_address, cc=None, bcc=None, attachments=None, priority=False):
    """
    :param to: a string or a list of strings of recipient's address(es)
    :param subject: a string of the subject of the email
    :param content: a string of the body text of the email
    :param ip_address: a string of the ip address of the user
    :param cc: a string or a list of strings of cc address(es)
    :param bcc: a string or alist of strings of bcc address(es)
    :param attachments: a string or a list of strings of file directory
    :param priority: boolean value; if True, sends email even if function is being abused
    :return: True if email was successfully sent, False if not

    Exception raised when invalid data types or email addresses are passed.
    False returned when email can't be sent.
    """

    # check argument types
    argument_type_check = all([
        isinstance(to, (str, list)),
        isinstance(subject, str),
        isinstance(content, str),
        isinstance(ip_address, str),
        isinstance(cc, (type(None), str, list)),
        isinstance(bcc, (type(None), str, list)),
        isinstance(attachments, (type(None), str, list)),
        isinstance(priority, bool)
    ])

    if not argument_type_check:
        raise ValueError('Invalid parameter type')

    # check if email addresses are string
    for argument in [to, cc, bcc]:
        if not isinstance(argument, (type(None), str)):
            if isinstance(argument, list):
                if not(all(isinstance(item, str) for item in argument)):
                    raise ValueError('Invalid parameter type')

    # check if attachments exist
    if not isinstance(attachments, type(None)):
        if not isinstance(attachments, list):
            attachments = [attachments]

        for attachment in attachments:
            if isinstance(attachment, str):         # checks if attachments are string values
                # checks if attachments exist
                if not os.path.isfile(attachment):
                    raise ValueError(
                        'One or more attachments could not be found')
            else:
                raise ValueError('One or more attachments are not in string')

    # send email
    try:
        response = yag.send(to, subject, content, cc=cc,
                            bcc=bcc, attachments=attachments)
        return response != False

    except YagInvalidEmailAddress:
        raise ValueError('One or more email addresses are invalid')

# TODO: add function that checks how often an ip address is using the send_email function
# and checks how often, across all ip addresses, the send_email function is being used
# so that our inbox is not overloaded with email

# TODO: define an exception to be thrown when abusing of function is detected
