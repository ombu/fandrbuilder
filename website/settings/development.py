from .base import *

DEBUG = True
DEBUG_TOOLBAR_CONFIG = {
    'INTERCEPT_REDIRECTS': False
}

#if DEBUG:
    #INSTALLED_APPS = INSTALLED_APPS + ('debug_toolbar',)


DATABASES['default']['NAME'] = 'fnr'
DATABASES['default']['USER'] = 'root'
DATABASES['default']['PASSWORD'] = 'meh'
DATABASES['default']['HOST'] = 'localhost'

INTERNAL_IPS = (
    '0.0.0.0',
    '127.0.0.1',
)
