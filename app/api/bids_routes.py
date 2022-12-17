from flask import Blueprint, request, jsonify
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import Product, db, Bid
from flask_login import login_required, current_user
from ..forms import BidForm

bids_routes = Blueprint('bids', __name__)

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


@bids_routes.route('/<int:id>',  methods=['PUT'])
@login_required
def edit_bid(id):
    bid = Bid.query.get(id)
    form = BidForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        data = form.data
        bid.user_id = current_user.id
        bid.itemId = data['itemId']
        bid.price = data['price']
        bid.quantity = data['quantity']
        bid.category_id = data['category_id']
        bid.description = data['description']
       
        db.session.add(bid)
        db.session.commit()
        return bid.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
