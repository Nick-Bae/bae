from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError


class CartForm(FlaskForm):

    quantity = IntegerField('quantity', validators=[DataRequired()])
    userId = IntegerField('UserId', validators=[DataRequired()])
    itemId = IntegerField('itemId', validators=[DataRequired()])
    