from django.shortcuts import render_to_response
from django.template import RequestContext
from rest_framework.renderers import JSONRenderer
from fnr.serializers import ProjectsListSerializer
from models import Project

def index(request):
    # Always return the list of projects.

    projectsJSON = JSONRenderer().render(ProjectsListSerializer(Project.objects.all(), many=True).data)
    return render_to_response('index.html', {
        'projectsJSON': projectsJSON
    }, context_instance=RequestContext(request))

