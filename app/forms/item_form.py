from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, FloatField, DateTimeField
from wtforms.validators import DataRequired, ValidationError


class ItemForm(FlaskForm):

    user_id = IntegerField('UserId', validators=[DataRequired()])
    name = StringField('Title', validators=[DataRequired()])
    price = FloatField('Price', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    category_id = SelectField("Category", coerce=int, validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    end = DateTimeField('Biding')
    