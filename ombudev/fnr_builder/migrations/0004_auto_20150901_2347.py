# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fnr', '0003_auto_20150901_2345'),
    ]

    operations = [
        migrations.CreateModel(
            name='Requirement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('order', models.SmallIntegerField()),
                ('requirement', models.TextField()),
                ('effort', models.SmallIntegerField()),
                ('type', models.CharField(max_length=128, choices=[(b'user_story', b'user story'), (b'validation', b'validation')])),
                ('audience', models.ForeignKey(to='fnr.Audience')),
                ('feature', models.ForeignKey(to='fnr.Feature')),
                ('scope', models.ForeignKey(to='fnr.Scope')),
            ],
        ),
        migrations.RemoveField(
            model_name='requirements',
            name='audience',
        ),
        migrations.RemoveField(
            model_name='requirements',
            name='feature',
        ),
        migrations.RemoveField(
            model_name='requirements',
            name='scope',
        ),
        migrations.DeleteModel(
            name='Requirements',
        ),
    ]
