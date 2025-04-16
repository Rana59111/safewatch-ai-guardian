
from django.db import models
from django.contrib.auth.models import User


class Camera(models.Model):
    STATUS_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
        ('maintenance', 'Maintenance'),
    ]
    
    THREAT_LEVEL_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('unknown', 'Unknown'),
    ]
    
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='offline')
    feed_url = models.URLField(blank=True)
    threat_level = models.CharField(max_length=20, choices=THREAT_LEVEL_CHOICES, default='unknown')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} - {self.location}"


class Alert(models.Model):
    LEVEL_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    
    TYPE_CHOICES = [
        ('assault', 'Assault'),
        ('suspicious', 'Suspicious Activity'),
        ('crowd', 'Crowd Gathering'),
        ('gesture', 'Suspicious Gesture'),
        ('abnormal', 'Abnormal Behavior'),
    ]
    
    camera = models.ForeignKey(Camera, related_name='alerts', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.TextField()
    location = models.CharField(max_length=255)
    acknowledged = models.BooleanField(default=False)
    image = models.ImageField(upload_to='alerts/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.get_type_display()} - {self.get_level_display()} - {self.timestamp}"


class Incident(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('investigating', 'Investigating'),
        ('resolved', 'Resolved'),
        ('false_alarm', 'False Alarm'),
    ]
    
    TYPE_CHOICES = [
        ('assault', 'Assault'),
        ('suspicious', 'Suspicious Activity'),
        ('harassment', 'Harassment'),
        ('crowd', 'Crowd Gathering'),
        ('other', 'Other'),
    ]
    
    timestamp = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    location = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    response_time = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
        return f"{self.get_type_display()} - {self.get_status_display()} - {self.timestamp}"


class Responder(models.Model):
    name = models.CharField(max_length=100)
    incident = models.ForeignKey(Incident, related_name='responders_list', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name


class Zone(models.Model):
    name = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    risk_level = models.IntegerField(default=0)  # 0-100
    
    def __str__(self):
        return f"{self.name} - Risk Level: {self.risk_level}"


class Statistics(models.Model):
    total_incidents = models.IntegerField(default=0)
    resolved_incidents = models.IntegerField(default=0)
    average_response_time = models.CharField(max_length=50, default='0m')
    active_alerts = models.IntegerField(default=0)
    system_status = models.CharField(max_length=50, default='Online')
    cameras_online = models.IntegerField(default=0)
    cameras_offline = models.IntegerField(default=0)
    detection_accuracy = models.FloatField(default=0.0)  # 0-100
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Statistics - {self.updated_at}"


class SOSAlert(models.Model):
    location = models.CharField(max_length=255, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    emergency_id = models.CharField(max_length=50, unique=True)
    resolved = models.BooleanField(default=False)
    
    def __str__(self):
        return f"SOS Alert - {self.timestamp}"
