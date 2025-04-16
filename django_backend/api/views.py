
import uuid
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from .models import Camera, Alert, Incident, Zone, Statistics, SOSAlert
from .serializers import (
    CameraSerializer, AlertSerializer, IncidentSerializer,
    ZoneSerializer, StatisticsSerializer, SOSAlertSerializer
)


class CameraViewSet(viewsets.ModelViewSet):
    queryset = Camera.objects.all()
    serializer_class = CameraSerializer
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        camera = self.get_object()
        status = request.data.get('status')
        if status not in ['online', 'offline', 'maintenance']:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        
        camera.status = status
        camera.save()
        serializer = self.get_serializer(camera)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'])
    def update_threat_level(self, request, pk=None):
        camera = self.get_object()
        threat_level = request.data.get('threatLevel')
        if threat_level not in ['low', 'medium', 'high', 'unknown']:
            return Response({'error': 'Invalid threat level'}, status=status.HTTP_400_BAD_REQUEST)
        
        camera.threat_level = threat_level
        camera.save()
        serializer = self.get_serializer(camera)
        return Response(serializer.data)


class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all().order_by('-timestamp')
    serializer_class = AlertSerializer
    
    @action(detail=True, methods=['post'])
    def acknowledge(self, request, pk=None):
        alert = self.get_object()
        alert.acknowledged = True
        alert.save()
        serializer = self.get_serializer(alert)
        return Response(serializer.data)


class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all().order_by('-timestamp')
    serializer_class = IncidentSerializer
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        incident = self.get_object()
        status_val = request.data.get('status')
        if status_val not in ['new', 'investigating', 'resolved', 'false_alarm']:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        
        incident.status = status_val
        incident.save()
        serializer = self.get_serializer(incident)
        return Response(serializer.data)


class ZoneViewSet(viewsets.ModelViewSet):
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer


@api_view(['GET'])
def get_statistics(request):
    # Get the latest statistics or create a default one if none exists
    stats, created = Statistics.objects.get_or_create(
        pk=1,
        defaults={
            'total_incidents': 0,
            'resolved_incidents': 0,
            'average_response_time': '0m',
            'active_alerts': 0,
            'system_status': 'Online',
            'cameras_online': 0,
            'cameras_offline': 0,
            'detection_accuracy': 0.0
        }
    )
    
    # Update some statistics dynamically
    stats.total_incidents = Incident.objects.count()
    stats.resolved_incidents = Incident.objects.filter(status='resolved').count()
    stats.active_alerts = Alert.objects.filter(acknowledged=False).count()
    stats.cameras_online = Camera.objects.filter(status='online').count()
    stats.cameras_offline = Camera.objects.filter(status='offline').count()
    stats.save()
    
    serializer = StatisticsSerializer(stats)
    return Response(serializer.data)


@api_view(['POST'])
def trigger_sos(request):
    location = request.data.get('location', 'Unknown location')
    emergency_id = str(uuid.uuid4())[:8].upper()
    
    sos = SOSAlert.objects.create(
        location=location,
        emergency_id=emergency_id
    )
    
    response_data = {
        'success': True,
        'message': 'SOS alert triggered successfully',
        'timestamp': sos.timestamp.isoformat(),
        'emergencyId': emergency_id
    }
    
    return Response(response_data, status=status.HTTP_201_CREATED)
