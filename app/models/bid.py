# from .db import db, environment, SCHEMA
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Bid(db.Model):
    __tablename__ = 'bids'

    # if environment == "production":
    #     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    itemId = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    price = db.Column(db.Float, default=1.00)

    item = db.relationship("Product", backref="bid")
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'itemId': self.itemId,
            'price': self.price,
            'item': self.item.to_dict()
        }
