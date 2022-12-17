from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError


class BidForm(FlaskForm):

    userId = IntegerField('UserId', validators=[DataRequired()])
    itemId = IntegerField('itemId', validators=[DataRequired()])
    price = IntegerField('quantity', validators=[DataRequired()])
    