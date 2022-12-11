# from .db import db, environment, SCHEMA
from .db import db
from .image import Image
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models.user import wishlist
from app.models.cart import product_cart


class Product(db.Model):
    __tablename__ = 'products'

    # if environment == "production":
    #     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    price = db.Column(db.Float, default=1.00)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id", ondelete='RESTRICT'))
    quantity = db.Column(db.Integer)
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

    cart = db.relationship(
        "Cart", 
        secondary=product_cart, 
        lazy='dynamic',
        back_populates="items"
    )

    orders = db.relationship("Ordered_item", backref="item")

    def add_to_cart(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'price': self.price,
            'category_id': self.category_id,
            'description': self.description,
            'image': self.image[0].url,
            'quantity':self.cart[0].quantity,
            'cartId':self.cart[0].id,
            'total': self.price * self.cart[0].quantity
        }

    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'price': self.price,
            'quantity': self.quantity,
            'category_id': self.category_id,
            'description': self.description,
            'image': self.image[0].url,
        }
