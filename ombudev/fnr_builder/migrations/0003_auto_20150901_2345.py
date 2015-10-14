# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fnr', '0002_auto_20150901_2327'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requirements',
            name='type',
            field=models.CharField(max_length=128, choices=[(b'user_story', b'user story'), (b'validation', b'validation')]),
        ),
    ]
