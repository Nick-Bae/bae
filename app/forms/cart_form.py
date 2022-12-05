from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError


class CartForm(FlaskForm):

    userId = IntegerField('UserId', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    itemId = IntegerField('itemId', validators=[DataRequired()])
    