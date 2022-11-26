from .db import db, environment, SCHEMA
from .image import Image
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models.user import wishlist
from app.models.user import cartlist


class Product(db.Model):
    __tablename__ = 'products'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    price = db.Column(db.Float, default=1.00)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id", ondelete='RESTRICT'))
    # image_id = db.Column(db.Integer, db.ForeignKey("images.id", ondelete='RESTRICT'))
    # images = db.relationship("Image", back_populates="product")
    description = db.Column(db.String)

    user = db.relationship("User", lazy='joined', back_populates="items")
    comments = db.relationship("Comment", cascade="all,delete", back_populates="item")

    category = db.relationship(
        "Category", 
        # cascade="all,delete",
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

    wish_user = db.relationship(
        "User",
        secondary=wishlist,
        lazy='dynamic',
        back_populates = 'wish_item')
    
    user_cart = db.relationship(
        "User",
        secondary=cartlist,
        lazy='dynamic',
        back_populates = 'cart')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'price': self.price,
            'category_id': self.category_id,
            'description': self.description,
            # 'image': self.image.url
            # 'image': self.image.to_dict()
        }
