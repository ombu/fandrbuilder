# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Audience',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('test', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('effort', models.SmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Requirements',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('order', models.SmallIntegerField()),
                ('requirement', models.TextField()),
                ('effort', models.SmallIntegerField()),
                ('type', models.CharField(max_length=2, choices=[(b'user_story', b'user story'), (b'validation', b'validation')])),
                ('audience', models.ForeignKey(to='fnr.Audience')),
                ('feature', models.ForeignKey(to='fnr.Feature')),
            ],
        ),
        migrations.CreateModel(
            name='Scope',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('order', models.SmallIntegerField()),
                ('project', models.ForeignKey(to='fnr.Project')),
            ],
        ),
        migrations.AddField(
            model_name='requirements',
            name='scope',
            field=models.ForeignKey(to='fnr.Scope'),
        ),
        migrations.AddField(
            model_name='project',
            name='default_scope',
            field=models.ForeignKey(related_name='default_scope', to='fnr.Scope'),
        ),
        migrations.AddField(
            model_name='audience',
            name='project',
            field=models.ForeignKey(to='fnr.Project'),
        ),
    ]
