from fnr.models import Feature, Project, Requirement
from fnr.serializers import FeatureSerializer, ProjectSerializer, RequirementSerializer
from rest_framework import generics

class FeatureList(generics.ListCreateAPIView):
    """
    List all features, or create a new feature.
    """
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

class FeatureDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a feature.
    """
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

class ProjectList(generics.ListCreateAPIView):
    """
    List all features, or create a new project.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a project.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class RequirementList(generics.ListCreateAPIView):
    """
    List all features, or create a new requirement.
    """
    queryset = Requirement.objects.all()
    serializer_class = RequirementSerializer

class RequirementDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a requirement.
    """
    queryset = Requirement.objects.all()
    serializer_class = RequirementSerializer
