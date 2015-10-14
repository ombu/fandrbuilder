# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fnr', '0004_auto_20150901_2347'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='audience',
            name='test',
        ),
    ]
