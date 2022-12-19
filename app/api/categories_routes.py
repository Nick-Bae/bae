from flask import Blueprint
from app.models import Product, db, Inventory, Category, Image, Comment, User, wishlist, Cart, Bid

categories_routes = Blueprint('categories', __name__)

# =======================Validation=================================

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@categories_routes.route('/<category>')
def get_itemsByCategory(category):
    products = Product.query.filter(Product.category_id == category).all()
  
    return {item.to_dict()['id']: item.to_dict() for item in products}


