from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# sigle_image = db.Table(
#     "sigle_image",
#     db.Column("image_id", db.Integer, db.ForeignKey(add_prefix_for_prod("images.id"))),
#     db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
# )

class Image(db.Model):
    __tablename__ = 'images'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    
    product = db.relationship(
        "Product",
        back_populates="image"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'product_id': self.product_id,
            'Product': self.product.to_dict()
        }
   
    # user = db.relationship("User", lazy='joined', back_populates="stories")
    # comments = db.relationship("Comment", cascade="all,delete", back_populates="story")

    # liked_story_user = db.relationship(
    #     "User",
    #     secondary=like_story,
    #     lazy='dynamic',
    #     back_populates = 'liked')


  