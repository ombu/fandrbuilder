Features and Requirements builder
=================================

## Installation

In a [virtualenv](https://virtualenv.pypa.io/en/latest/), or any other Python
environment with `pip`:

Install dependencies:

    $ pip install -r requirements/development.txt

Create database according to settings in `website/settings/local.py`.

Export path to settings file:

    $ export DJANGO_SETTINGS_MODULE=website.settings.local

Set up database

    $ ./manage.py migrate

Optionally, create a super user

    $ ./manage.py createsuperuser

Optionally, load sample data:

    $ ./manage.py loaddata fnr/sample-data/fnr.json

Start server:

    $ ./manage.py runserver

Login to admin interface:

    http://127.0.0.1:8000/admin/

## Development
