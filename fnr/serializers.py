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


class RequirementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Requirement
        fields = ('id', 'scope', 'feature', 'order', 'audience', 'requirement', 'effort')


class ProjectsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('id', 'name', 'scopes')


class ProjectSerializer(serializers.ModelSerializer):
    audiences = AudienceSerializer(many=True, read_only=True)
    scopes = ScopeSerializer(many=True, read_only=True)
    features = FeatureSerializer(many=True, read_only=True)
    requirements = RequirementSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'name', 'default_scope', 'scopes', 'audiences', 'features', 'requirements')

