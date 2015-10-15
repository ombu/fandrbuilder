from django.shortcuts import render_to_response
from fnr.models import Project

def index(request):
    return render_to_response('home.html', {})
