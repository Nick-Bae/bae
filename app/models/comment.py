from flask_sqlalchemy import SQLAlchemy
from .db import db, add_prefix_for_prod, environment, SCHEMA

class Comment(db.Model):
    __tablename__ = 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    # rate = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    item_id = db.Column(db.Integer, db.ForeignKey("products.id"))
    user = db.relationship("User", back_populates="comments")
    item = db.relationship("Product", back_populates="comments")

    # liked_comment_user = db.relationship(
    #     "User",
    #     secondary=like_comment,
    #     lazy='dynamic',
    #     back_populates = 'liked_comment')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'user_id': self.user_id,
            'item_id': self.item_id,
            'User': self.user.to_dict()
        }
    
    def avg(self):
        return {

        }
