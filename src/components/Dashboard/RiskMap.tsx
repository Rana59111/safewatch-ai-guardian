
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zone } from "@/types";
import { MapPin } from "lucide-react";

interface RiskMapProps {
  zones: Zone[];
}

const RiskMap: React.FC<RiskMapProps> = ({ zones }) => {
  // For simplicity, we'll create a mock heatmap visualization
  // In a real application, you would integrate with a mapping library like Mapbox, Google Maps, or Leaflet
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-safewatch-primary" />
          High-Risk Zone Mapping
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 rounded-lg p-4 h-[300px] relative">
          {/* Mock map container */}
          <div className="absolute inset-0 bg-[#e9ecef] overflow-hidden rounded-lg">
            {/* Simple grid to simulate a map */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
              {Array.from({ length: 144 }).map((_, idx) => (
                <div key={idx} className="border border-gray-200 opacity-20" />
              ))}
            </div>
            
            {/* Mock map features */}
            <div className="absolute top-[20%] left-[10%] w-[40%] h-[5%] bg-gray-300 rounded-full"></div>
            <div className="absolute top-[40%] left-[15%] w-[30%] h-[5%] bg-gray-300 rounded-full"></div>
            <div className="absolute top-[60%] left-[25%] w-[50%] h-[5%] bg-gray-300 rounded-full"></div>
            <div className="absolute top-[30%] left-[60%] w-[25%] h-[40%] bg-gray-300 rounded"></div>
            
            {/* Mock risk zones as colored circles */}
            {zones.map((zone) => {
              // Convert risk level to opacity and size
              const opacity = zone.riskLevel / 100;
              const size = 30 + (zone.riskLevel / 5);
              
              // Convert lat/lng to position on our mock map
              // This is simplified and not geographically accurate
              const left = ((zone.lng + 180) / 360) * 100;
              const top = ((90 - zone.lat) / 180) * 100;
              
              // Determine color based on risk level
              let color = "bg-green-500";
              if (zone.riskLevel > 70) {
                color = "bg-red-500";
              } else if (zone.riskLevel > 40) {
                color = "bg-yellow-500";
              }
              
              return (
                <div 
                  key={zone.id}
                  className={`absolute rounded-full ${color}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    top: `${top}%`,
                    opacity: opacity,
                    transform: "translate(-50%, -50%)",
                    filter: "blur(8px)",
                    zIndex: Math.floor(zone.riskLevel / 10)
                  }}
                />
              );
            })}
            
            {/* Zone labels */}
            {zones.map((zone) => {
              const left = ((zone.lng + 180) / 360) * 100;
              const top = ((90 - zone.lat) / 180) * 100;
              
              return (
                <div
                  key={`label-${zone.id}`}
                  className="absolute bg-white px-1 py-0.5 rounded text-xs font-medium shadow-sm z-10"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: "translate(-50%, -150%)"
                  }}
                >
                  {zone.name}
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-2 right-2 bg-white rounded-md shadow-sm px-2 py-1 text-xs">
            <div className="flex items-center mb-1">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
              <span>High Risk</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
              <span>Low Risk</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-safewatch-dark bg-opacity-5 p-3 rounded-lg">
            <div className="text-sm font-medium mb-1">Highest Risk Zone</div>
            <div className="text-base">
              {zones.sort((a, b) => b.riskLevel - a.riskLevel)[0]?.name}
            </div>
          </div>
          <div className="bg-safewatch-dark bg-opacity-5 p-3 rounded-lg">
            <div className="text-sm font-medium mb-1">Average Risk Level</div>
            <div className="text-base">
              {Math.round(zones.reduce((sum, zone) => sum + zone.riskLevel, 0) / zones.length)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskMap;
