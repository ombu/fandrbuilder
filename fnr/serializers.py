from rest_framework import serializers
from fnr.models import Feature, Project, Requirement
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer


class FeatureSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    class Meta:
        model = Feature
        fields = ('id', 'name', 'description', 'effort', 'tags')

    def create(self, validated_data):
        """
        Create and return a new `Feature` instance, given validated data.
        """
        return Feature.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Feature` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.effort = validated_data.get('effort', instance.effort)
        instance.tags = validated_data.get('tags', instance.tags)
        instance.save()
        return instance

class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('id', 'name', 'default_scope')

    def create(self, validated_data):
        """
        Create and return a new `Project` instance, given validated data.
        """
        return Project.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Project` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.default_scope = validated_data.get('default_scope', instance.default_scope)
        instance.save()
        return instance

class RequirementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Requirement
        fields = ('id', 'scope', 'feature', 'order', 'audience', 'requirement', 'effort')

    def create(self, validated_data):
        """
        Create and return a new `Requirement` instance, given validated data.
        """
        return Requirement.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Requirement` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.default_scope = validated_data.get('default_scope', instance.default_scope)
        instance.save()
        return instance
