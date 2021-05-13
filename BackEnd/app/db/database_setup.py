import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey, Integer, String, FLOAT, DateTime, \
    Boolean

sys.path.insert(0, os.path.dirname(__file__))

Base = declarative_base()


class User(Base):
    __tablename__ = "user"
    __user_write_permission_field__ = {"phone","name","school_year","major","description"}
    __user_read_permission_field__ = {"email","phone","name","school_year","major","description"}

    id = Column(Integer, primary_key=True)
    email = Column(String(250), nullable=False)
    date_created = Column(DateTime, nullable=False)
    phone = Column(String(250), nullable=False)
    name = Column(String(250), nullable=False)
    school_year = Column(String(20), nullable=False)
    major = Column(String(250))
    description = Column(String(1000), nullable=False)
    room = relationship("Room", backref="user")
    favorite = relationship("Favorite", backref="user")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            "id": self.id,
            "email": self.email,
            "phone": self.phone,
            "name": self.name,
            "school_year": self.school_year,
            "major": self.major,
            "description": self.description
        }


class Room(Base):
    __tablename__ = "room"
    __user_write_permission_field__ = {"room_type","price_per_month","negotiable","room_description","num_beds","num_baths"}
    __user_read_permission_field__ = {"id","date_created","room_type","price_per_month","negotiable","room_description","num_beds","num_baths","user_id"}

    id = Column(Integer, primary_key=True)
    date_created = Column(DateTime, nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"))
    room_type = Column(String(250), nullable=False)
    price_per_month = Column(Integer, nullable=False)
    negotiable = Column(Boolean, nullable=False)
    room_description = Column(String(1000), nullable=False)
    move_in_id = Column(Integer, ForeignKey("move_in.id"))
    address_id = Column(Integer, ForeignKey("address.id"))
    stay_period_id = Column(Integer, ForeignKey("stay_period.id"))
    num_beds = Column(Integer, nullable=False)
    num_baths = Column(FLOAT, nullable=False)
    house_attribute = relationship("House_Attribute", backref="room")
    move_in = relationship("Move_In", backref="room")
    favorite = relationship("Favorite", backref="room")
    address = relationship("Address", backref="room")
    stay_period = relationship("Stay_Period", backref="room")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "room_type": self.room_type,
            "price_per_month": self.price_per_month,
            "negotiable": self.negotiable,
            "room_description": self.room_description,
            "num_beds": self.num_beds,
            "num_baths": self.num_baths
        }


class Address(Base):
    __tablename__ = "address"
    __user_write_permission_field__ = {"address"}
    __user_read_permission_field__ = {"distance","address"}

    id = Column(Integer, primary_key=True)
    distance = Column(String(250), nullable=False)
    address = Column(String(250), nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            "id": self.id,
            "distance": self.distance,
            "address": self.address,
        }


class Stay_Period(Base):
    __tablename__ = "stay_period"
    __user_write_permission_field__ = {"from_month","to_month"}
    __user_read_permission_field__ = {"from_month","to_month"}

    id = Column(Integer, primary_key=True)
    from_month = Column(DateTime, nullable=False)
    to_month = Column(DateTime, nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            "id": self.id,
            "from_month": self.from_month,
            "to_month": self.to_month,
        }


class Move_In(Base):
    __tablename__ = "move_in"
    __user_write_permission_field__ = {"early_date","late_date"}
    __user_read_permission_field__ = {"early_date","late_date"}

    id = Column(Integer, primary_key=True)
    early_date = Column(DateTime, nullable=False)
    late_date = Column(DateTime, nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            "id": self.id,
            "early_date": self.early_date,
            "late_date": self.late_date,
        }


class House_Attribute(Base):
    __tablename__ = "house_attribute"
    __user_write_permission_field__ = {"attribute_name"}
    __user_read_permission_field__ = {"room_id","attribute_name"}

    id = Column(Integer, primary_key=True)
    room_id = Column(Integer, ForeignKey("room.id"))
    attribute_name = Column(String(250), ForeignKey(
        "attribute.name"), nullable=False)
    house_attribute = relationship("Attribute", backref="house_attribute")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            "id": self.id,
            "room_id": self.room_id,
            "attribute_name": self.attribute_name
        }


class Attribute(Base):
    __tablename__ = "attribute"
    __user_write_permission_field__ = {}
    __user_read_permission_field__ = {"name","category"}

    name = Column(String(250), primary_key=True)
    category = Column(String(250), nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            "name": self.name,
            "category": self.category
        }


class Favorite(Base):
    __tablename__ = "favorite"
    __user_write_permission_field__ = {}
    __user_read_permission_field__ = {"room_id","user_id"}

    id = Column(Integer, primary_key=True)
    room_id = Column(Integer, ForeignKey("room.id"))
    user_id = Column(Integer, ForeignKey("user.id"))

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            "id": self.id,
            "room_id": self.room_id,
            "user_id": self.user_id
        }


def createDB(db_path):
    """
    create a DB given the database schema
    return True if the db is created successfully
    """
    try:
        engine = create_engine(db_path)
        Base.metadata.create_all(engine)
        return True
    except:
        return False


if __name__ == "__main__":
    print(createDB("sqlite:///housing.db"))
