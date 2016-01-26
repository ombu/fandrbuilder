from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from fnr import views, api

urlpatterns = [
    #url(r'^api/v1/features/$', api.FeatureList.as_view()),
    url(r'^api/v1/features/(?P<pk>[0-9]+)/$', api.FeatureDetail.as_view()),
    #url(r'^api/v1/requirements/$', api.RequirementList.as_view()),
    #url(r'^api/v1/requirements/(?P<pk>[0-9]+)/$', api.RequirementDetail.as_view()),
    url(r'^api/v1/projects/$', api.ProjectList.as_view()),
    url(r'^api/v1/projects/(?P<pk>[0-9]+)/$', api.ProjectDetail.as_view()),
    url(r'^.*/$', views.index),
    url(r'^$', views.index),
]

urlpatterns = format_suffix_patterns(urlpatterns)
