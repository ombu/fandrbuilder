from rest_framework import serializers
from fnr.models import Feature, Project, Requirement, Audience, Scope
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer


class AudienceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Audience
        fields = ('id', 'name', 'description')


class ScopeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scope
        fields = ('id', 'name', 'description', 'order', 'project')


class FeatureSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Feature
        fields = ('id', 'name', 'description', 'effort', 'tags', 'project')


class ProjectListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('id', 'name')


class ProjectSerializer(serializers.ModelSerializer):

    scopes = ScopeSerializer(many=True)
    audiences = AudienceSerializer(many=True)

    class Meta:
        model = Project
        fields = ('id', 'name', 'default_scope', 'scopes', 'audiences')


class RequirementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Requirement
        fields = ('id', 'scope', 'feature', 'order', 'audience', 'requirement', 'effort')
