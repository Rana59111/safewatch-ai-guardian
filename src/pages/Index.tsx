
import React, { useState } from "react";
import Navbar from "@/components/Layout/Navbar";
import CameraFeed from "@/components/Dashboard/CameraFeed";
import ThreatDetection from "@/components/Dashboard/ThreatDetection";
import AlertSystem from "@/components/Dashboard/AlertSystem";
import SOSButton from "@/components/Dashboard/SOSButton";
import RiskMap from "@/components/Dashboard/RiskMap";
import IncidentLog from "@/components/Dashboard/IncidentLog";
import StatsSummary from "@/components/Dashboard/StatsSummary";
import { Alert } from "@/types";
import { useCameras } from "@/hooks/useCameras";
import { useAlerts } from "@/hooks/useAlerts";
import { useIncidents } from "@/hooks/useIncidents";
import { useRiskZones } from "@/hooks/useRiskZones";
import { useStatistics } from "@/hooks/useStatistics";
import { toast } from "sonner";

const Index = () => {
  // Fetch data using React Query hooks
  const { cameras, isLoading: camerasLoading } = useCameras();
  const { alerts, acknowledgeAlert } = useAlerts();
  const { incidents } = useIncidents();
  const { zones } = useRiskZones();
  const { statistics } = useStatistics();

  // Handle acknowledging an alert
  const handleAcknowledgeAlert = (id: number) => {
    acknowledgeAlert.mutate(id);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">SafeWatch AI Guardian Dashboard</h1>
        
        {/* Stats Summary */}
        <div className="mb-6">
          <StatsSummary data={statistics || {
            totalIncidents: 0,
            resolvedIncidents: 0,
            averageResponseTime: '0m',
            activeAlerts: 0,
            systemStatus: 'Online',
            camerasOnline: 0,
            camerasOffline: 0,
            detectionAccuracy: 0
          }} />
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Camera Feeds */}
          <div className="md:col-span-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
              {camerasLoading ? (
                <p>Loading cameras...</p>
              ) : cameras.length === 0 ? (
                <p>No cameras available</p>
              ) : (
                cameras.map((camera) => (
                  <CameraFeed 
                    key={camera.id} 
                    camera={camera} 
                    onClick={() => {
                      toast({
                        title: camera.name,
                        description: `Location: ${camera.location}`,
                      });
                    }}
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Middle Column: Threat Detection and Alerts */}
          <div className="md:col-span-1 space-y-6">
            <ThreatDetection cameras={cameras} />
            <AlertSystem 
              alerts={alerts} 
              onAcknowledge={handleAcknowledgeAlert}
            />
          </div>
          
          {/* Right Column: SOS, Risk Map, and Incident Log */}
          <div className="md:col-span-1 space-y-6">
            <SOSButton />
            <RiskMap zones={zones} />
            <IncidentLog incidents={incidents} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>SafeWatch AI Guardian System v1.0</p>
          <p className="text-xs mt-1 text-gray-400">Powered by AI and computer vision for enhanced public safety</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
