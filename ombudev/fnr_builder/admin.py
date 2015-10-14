from django.contrib import admin

# Register your models here.
from .models import Feature,Project,Scope,Audience,Requirement

admin.site.register(Feature)
admin.site.register(Project)
admin.site.register(Scope)
admin.site.register(Audience)
admin.site.register(Requirement)
