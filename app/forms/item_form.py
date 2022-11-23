from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class ItemForm(FlaskForm):

    name = StringField('Title', validators=[DataRequired()])
    # user_id = IntegerField('')
    price = IntegerField('Price', validators=[DataRequired()])
    category_id = SelectField("Category", coerce=int, validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])

    # inventory_id = IntegerField('')
    # image_id