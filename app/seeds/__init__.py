from flask.cli import AppGroup
from .users import seed_users, undo_users
from .category import seed_categories, undo_categories
from .product import seed_products, undo_products
from .image import seed_images, undo_images
from .comment import seed_comment, undo_comment
# from .wishlist import seed_wishlist, undo_wishlist

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_categories()
        undo_users()
        undo_products()
        undo_images()
        undo_comment()
        undo_wishlist()
    seed_categories()
    seed_images()
    seed_users()
    seed_products()
    seed_comment()
    seed_wishlist()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_categories()
    undo_images()
    undo_users()
    undo_products()
    undo_comment()
    undo_wishlist()
    # Add other undo functions here