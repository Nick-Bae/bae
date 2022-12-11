from .db import db

class Ordered_item(db.Model):
    __tablename__ = "ordered_items"
    id = db.Column(db.Integer, primary_key=True)
    orderId = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    itemId = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    # quantity = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, db.ForeignKey('carts.quantity'), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'orderId': self.orderId,
            'itemId': self.itemId,
            'quantity': self.quantity,
        }