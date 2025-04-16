
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import CameraFeed from "@/components/Dashboard/CameraFeed";
import ThreatDetection from "@/components/Dashboard/ThreatDetection";
import AlertSystem from "@/components/Dashboard/AlertSystem";
import SOSButton from "@/components/Dashboard/SOSButton";
import RiskMap from "@/components/Dashboard/RiskMap";
import IncidentLog from "@/components/Dashboard/IncidentLog";
import StatsSummary from "@/components/Dashboard/StatsSummary";
import { useToast } from "@/components/ui/use-toast";
import { cameras, alerts as initialAlerts, incidents, riskZones, statistics, generateRandomAlert } from "@/lib/mockData";
import { Alert } from "@/types";

const Index = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  
  // Acknowledge an alert
  const acknowledgeAlert = (id: number) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
    
    toast({
      title: "Alert Acknowledged",
      description: "The alert has been marked as acknowledged.",
    });
  };
  
  // Simulate receiving new alerts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance of generating a new alert every 15 seconds
      if (Math.random() < 0.1) {
        const newAlert = generateRandomAlert();
        setAlerts(prev => [newAlert, ...prev]);
        
        // Show toast notification for new alert
        toast({
          title: `New ${newAlert.level} Alert`,
          description: newAlert.description,
          variant: newAlert.level === "critical" ? "destructive" : "default",
        });
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, [toast]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">SafeWatch AI Guardian Dashboard</h1>
        
        {/* Stats Summary */}
        <div className="mb-6">
          <StatsSummary data={statistics} />
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Camera Feeds */}
          <div className="md:col-span-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
              {cameras.map((camera) => (
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
              ))}
            </div>
          </div>
          
          {/* Middle Column: Threat Detection and Alerts */}
          <div className="md:col-span-1 space-y-6">
            <ThreatDetection cameras={cameras} />
            <AlertSystem 
              alerts={alerts} 
              onAcknowledge={acknowledgeAlert}
            />
          </div>
          
          {/* Right Column: SOS, Risk Map, and Incident Log */}
          <div className="md:col-span-1 space-y-6">
            <SOSButton />
            <RiskMap zones={riskZones} />
            <IncidentLog incidents={incidents} />
          </div>
        </div>
      </main>
      
      <footer className="bg-safewatch-dark text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>SafeWatch AI Guardian System v1.0</p>
          <p className="text-xs mt-1 text-gray-400">Powered by AI and computer vision for enhanced public safety</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
