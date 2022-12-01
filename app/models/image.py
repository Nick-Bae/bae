# from .db import db, environment, SCHEMA
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# sigle_image = db.Table(
#     "sigle_image",
#     db.Column("image_id", db.Integer, db.ForeignKey(add_prefix_for_prod("images.id"))),
#     db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
# )

class Image(db.Model):
    __tablename__ = 'images'
    # if environment == "production":
    #     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    url = db.Column(db.String)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

    # user = db.relationship("User", back_populates="images")
    
    product = db.relationship(
        "Product",
        back_populates="image"
    )

    def to_dict(self):
        return {
            'id': self.id,
            # "username": self.user_id,
            'url': self.url,
            'product_id': self.product_id,
            'Product': self.product.to_dict()
        }
   
    