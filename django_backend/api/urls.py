
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'cameras', views.CameraViewSet)
router.register(r'alerts', views.AlertViewSet)
router.register(r'incidents', views.IncidentViewSet)
router.register(r'risk-zones', views.ZoneViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('statistics/', views.get_statistics, name='statistics'),
    path('sos/trigger/', views.trigger_sos, name='trigger_sos'),
]
