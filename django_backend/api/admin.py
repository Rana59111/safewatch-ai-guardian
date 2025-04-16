
from django.contrib import admin
from .models import Camera, Alert, Incident, Responder, Zone, Statistics, SOSAlert

class ResponderInline(admin.TabularInline):
    model = Responder
    extra = 1

class IncidentAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'location', 'status', 'timestamp')
    list_filter = ('status', 'type')
    search_fields = ('description', 'location')
    inlines = [ResponderInline]

class CameraAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'location', 'status', 'threat_level')
    list_filter = ('status', 'threat_level')
    search_fields = ('name', 'location')

class AlertAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'level', 'location', 'acknowledged', 'timestamp')
    list_filter = ('level', 'type', 'acknowledged')
    search_fields = ('description', 'location')

class ZoneAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'risk_level')
    list_filter = ('risk_level',)
    search_fields = ('name',)

class StatisticsAdmin(admin.ModelAdmin):
    list_display = ('total_incidents', 'resolved_incidents', 'active_alerts', 'updated_at')
    
class SOSAlertAdmin(admin.ModelAdmin):
    list_display = ('id', 'location', 'timestamp', 'emergency_id', 'resolved')
    list_filter = ('resolved',)
    search_fields = ('emergency_id', 'location')

admin.site.register(Camera, CameraAdmin)
admin.site.register(Alert, AlertAdmin)
admin.site.register(Incident, IncidentAdmin)
admin.site.register(Zone, ZoneAdmin)
admin.site.register(Statistics, StatisticsAdmin)
admin.site.register(SOSAlert, SOSAlertAdmin)
