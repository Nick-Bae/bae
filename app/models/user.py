from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

wishlist = db.Table(
    "wishlist",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    # if environment == "production":
    #     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    items = db.relationship("Product", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")

    wish_item = db.relationship(
        "Product",
        secondary=wishlist,
        lazy='dynamic',
        back_populates = "wish_user"
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
