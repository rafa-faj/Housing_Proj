import os
import json


backend_config_dir = os.path.join('.', '.env', 'backend_config.json')
google_cred_dir = os.path.join('.', '.env', 'google_auth_credentials.json')
aws_cred_dir = os.path.join('.', '.env', 'aws_credentials.json')

def set_backend_config():
    """
    set-up backend config to feed flask
    """
    config = json.load(open(backend_config_dir))
    os.environ['BACKEND_CONFIG'] = json.dumps(config)
    return

def set_google_cred():
    """
    set-up google service account credentials for testing
    """
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = google_cred_dir
    return

def set_aws_config():
    """
    set-up aws config to feed flask
    """
    config = json.load(open(aws_cred_dir))
    os.environ['AWS_CONFIG'] = json.dumps(config)
    return