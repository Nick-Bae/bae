from flask import Blueprint, request, jsonify
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import Product, db, Comment, User
from flask_login import login_required, current_user
# from app.forms import StoryForm
# from app.forms import CommentForm

product_routes = Blueprint('items', __name__)

@product_routes.route('')
def get_items():
    data = Product.query.all()
    return {}