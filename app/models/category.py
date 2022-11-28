# from .db import db, environment, SCHEMA
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Category(db.Model):
    __tablename__ = 'categories'

    # if environment == "production":
    #     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    product = db.relationship(
        "Product", 
        back_populates="category"
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.title,
        }
