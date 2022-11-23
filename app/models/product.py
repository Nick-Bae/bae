from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Product(db.Model):
    __tablename__ = 'products'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    price = db.Column(db.Float, default=1.00)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))
    image_id = db.Column(db.Integer, db.ForeignKey("images.id"))
    description = db.Column(db.String)

    category = db.relationship(
        "Category", uselist=False,
        cascade="all,delete",
        back_populates="product"
    )
    inventory = db.relationship(
        "Inventory", uselist=False,
        cascade="all,delete",
        back_populates="item"
    )
    image =  db.relationship(
        "Image",
        cascade="all,delete",
        back_populates="product"
    )

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
            'user_id': self.user_id,
            'name': self.name,
            'price': self.price,
            'category_id': self.category_id,
            'image_id': self.image_id,
            'description': self.description
            # 'User': self.user.to_dict(),
            # 'Comments': [comment.to_dict() for comment in self.comments]
        }
