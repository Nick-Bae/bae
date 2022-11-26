from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class ImageForm(FlaskForm):

    url = StringField('url', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
