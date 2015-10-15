# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fnr', '0007_auto_20150911_1736'),
    ]

    operations = [
        migrations.AddField(
            model_name='feature',
            name='project',
            field=models.ForeignKey(default=1, to='fnr.Project'),
            preserve_default=False,
        ),
    ]
