from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from fnr import views

urlpatterns = [
    # url(r'^$', views.index, name='index'),
    # url(r'^$', views.test, name='test'),
    url(r'^features/$', views.FeatureList.as_view()),
    url(r'^features/(?P<pk>[0-9]+)/$', views.FeatureDetail.as_view()),
    url(r'^projects/$', views.ProjectList.as_view()),
    url(r'^projects/(?P<pk>[0-9]+)/$', views.ProjectDetail.as_view()),
    url(r'^requirements/$', views.RequirementList.as_view()),
    url(r'^requirements/(?P<pk>[0-9]+)/$', views.RequirementDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
