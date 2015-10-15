from django.shortcuts import render_to_response
from models import Project

def index(request):
    return render_to_response('index.html', {})

