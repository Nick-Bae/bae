from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError


class OrderForm(FlaskForm):

    status = StringField('Status', validators=[DataRequired()])
    userId = IntegerField('UserId', validators=[DataRequired()])
    itemId = IntegerField('itemId', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    # items =  

    # date = DateField('Date', )
