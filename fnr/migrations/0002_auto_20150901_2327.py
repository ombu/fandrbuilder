# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fnr', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='default_scope',
            field=models.ForeignKey(related_name='default_scope', blank=True, to='fnr.Scope', null=True),
        ),
    ]
