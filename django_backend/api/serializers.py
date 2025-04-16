
from rest_framework import serializers
from .models import Camera, Alert, Incident, Responder, Zone, Statistics, SOSAlert
from django.contrib.auth.models import User


class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = ['id', 'name', 'location', 'status', 'feed_url', 'threat_level']


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = ['id', 'camera', 'timestamp', 'level', 'type', 'description', 'location', 'acknowledged', 'image']
        read_only_fields = ['id', 'timestamp']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['camera_id'] = instance.camera.id
        return representation


class ResponderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responder
        fields = ['id', 'name']


class IncidentSerializer(serializers.ModelSerializer):
    responders = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )
    responders_list = ResponderSerializer(many=True, read_only=True)
    
    class Meta:
        model = Incident
        fields = ['id', 'timestamp', 'type', 'location', 'description', 'status', 'response_time', 'responders', 'responders_list']
        read_only_fields = ['id', 'timestamp']
    
    def create(self, validated_data):
        responders_data = validated_data.pop('responders', [])
        incident = Incident.objects.create(**validated_data)
        
        for responder_name in responders_data:
            Responder.objects.create(incident=incident, name=responder_name)
        
        return incident
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['responders'] = [resp.name for resp in instance.responders_list.all()]
        return representation


class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = ['id', 'name', 'lat', 'lng', 'risk_level']


class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        fields = [
            'total_incidents', 'resolved_incidents', 'average_response_time', 
            'active_alerts', 'system_status', 'cameras_online', 
            'cameras_offline', 'detection_accuracy'
        ]


class SOSAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = SOSAlert
        fields = ['id', 'location', 'timestamp', 'emergency_id', 'resolved']
        read_only_fields = ['id', 'timestamp', 'emergency_id']
