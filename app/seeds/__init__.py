from flask.cli import AppGroup
from .users import seed_users, undo_users
from .category import seed_categories, undo_categories
from .product import seed_products, undo_products
from .image import seed_images, undo_images
from .comment import seed_comment, undo_comment
# from .wishlist import seed_wishlist, undo_wishlist

# from app.models.db import db, environment, SCHEMA
from app.models.db import db

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # comments
    seed_categories()
    seed_images()
    seed_users()
    seed_products()
    seed_comment()
# comments    

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_categories()
    undo_images()
    undo_users()
    undo_products()
    undo_comment()
    # undo_wishlist()
    # Add other undo functions here

