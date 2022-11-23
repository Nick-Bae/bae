from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Inventory(db.Model):
    __tablename__ = 'inventories'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    quantity = db.Column(db.Integer)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))


    item = db.relationship("Product", back_populates="inventory")
    # user = db.relationship("User", lazy='joined', back_populates="stories")
    # comments = db.relationship("Comment", cascade="all,delete", back_populates="story")

    # liked_story_user = db.relationship(
    #     "User",
    #     secondary=like_story,
    #     lazy='dynamic',
    #     back_populates = 'liked')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.title,
            'user_id': self.user_id,
            'price': self.price,
            'category_id': self.category_id,
            'inventory_id': self.inventory_id,
            'image_id': self.image_id,
            # 'User': self.user.to_dict(),
            # 'Comments': [comment.to_dict() for comment in self.comments]
        }
