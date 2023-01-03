from .db import db

class Ordered_item(db.Model):
    __tablename__ = "ordered_items"
    id = db.Column(db.Integer, primary_key=True)
    orderId = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    itemId = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    item = db.relationship("Product", back_populates="ordered_items")

    def to_dict(self):
        return {
            'ordered_itemId': self.id,
            # 'itemId': self.itemId,
            'orderId': self.orderId,
            'quantity': self.quantity,
            'item': self.item.to_dict()
        }