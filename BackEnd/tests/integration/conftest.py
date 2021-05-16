from app import create_app
from app.db.create_houses import setup_houses
import pytest
import os


@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    # create the app with common test config
    file_path = os.getcwd()+"/tests/integration/housing.db"
    db_path = "sqlite:///"+file_path
    # setup_houses(db_path)
    app = create_app(
        {"TESTING": True,
        "OFFLINE_TESTING": True,
        "SQLALCHEMY_DATABASE_URI": db_path})
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
