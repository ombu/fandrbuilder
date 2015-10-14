from django.db import models

# Import taggit
from taggit.managers import TaggableManager

class Feature(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    effort = models.SmallIntegerField()
    tags = TaggableManager(blank=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=200)
    default_scope = models.ForeignKey('Scope', related_name='default_scope', blank=True, null=True,)

    def __str__(self):
        return self.name


class Scope(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    order = models.SmallIntegerField()
    project = models.ForeignKey(Project)

    def __str__(self):
        return self.name

class Audience(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    project = models.ForeignKey(Project)

    def __str__(self):
        return self.name

class Requirement(models.Model):
    scope = models.ForeignKey(Scope)
    feature = models.ForeignKey(Feature)
    order = models.SmallIntegerField()
    audience = models.ForeignKey(Audience)
    requirement = models.TextField()
    effort = models.SmallIntegerField()

    def __str__(self):
        return self.requirement

    TYPE_CHOICES = (
        ('user_story', 'user story'),
        ('validation', 'validation'),
    )

    type = models.CharField(max_length=128, choices=TYPE_CHOICES)
