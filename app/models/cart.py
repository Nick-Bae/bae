# from .db import db, environment, SCHEMA, add_prefix_for_prod
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user
# from app.models.product import Product

product_cart = db.Table(
    "product_cart",
    db.Column('product_id', db.Integer, db.ForeignKey("products.id")),
    db.Column('cart_id', db.Integer, db.ForeignKey("carts.id"))
)

class Cart(db.Model):
    __tablename__ = 'carts'

    # if environment == "production":
    #     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    # total = db.Column(db.Float, default=1.00)

    items = db.relationship(
        "Product", 
        secondary=product_cart, 
        lazy='dynamic',
        back_populates="cart"
    )
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'quantity': self.quantity,
            # 'items': self.items.to_dict()
        }
    