
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera as CameraType } from "@/types";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { AlertTriangle, Brain, Camera } from "lucide-react";

interface ThreatDetectionProps {
  cameras: CameraType[];
}

interface ThreatData {
  name: string;
  value: number;
}

const ThreatDetection: React.FC<ThreatDetectionProps> = ({ cameras }) => {
  // Prepare data for the chart
  const threatData: ThreatData[] = [
    { name: "Assault", value: 75 },
    { name: "Harassment", value: 62 },
    { name: "Suspicious", value: 88 },
    { name: "Abnormal", value: 53 },
    { name: "Crowd", value: 40 },
  ];
  
  // Count cameras by threat level
  const threatCounts = {
    high: cameras.filter(c => c.threatLevel === "high").length,
    medium: cameras.filter(c => c.threatLevel === "medium").length,
    low: cameras.filter(c => c.threatLevel === "low").length,
    unknown: cameras.filter(c => c.threatLevel === "unknown").length,
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center">
            <Brain className="mr-2 h-5 w-5 text-safewatch-primary" />
            AI Threat Analysis
          </CardTitle>
          <div className="flex space-x-2 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
              <span>High: {threatCounts.high}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
              <span>Medium: {threatCounts.medium}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
              <span>Low: {threatCounts.low}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1 text-safewatch-warning" />
              Current Threat Detection Probability
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={threatData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis hide />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Probability']}
                  labelFormatter={(name) => `${name} Detection`}
                />
                <Bar 
                  dataKey="value" 
                  fill="#0056b3" 
                  radius={[4, 4, 0, 0]}
                  background={{ fill: '#eee' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium mb-2 flex items-center">
              <Camera className="h-4 w-4 mr-1 text-safewatch-primary" />
              Camera Status Summary
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Cameras by Threat Level</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="flex h-2.5 rounded-full">
                    <div 
                      className="bg-red-500 h-2.5 rounded-l-full" 
                      style={{ width: `${(threatCounts.high / cameras.length) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-yellow-500 h-2.5" 
                      style={{ width: `${(threatCounts.medium / cameras.length) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-green-500 h-2.5 rounded-r-full" 
                      style={{ width: `${(threatCounts.low / cameras.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-3xl font-bold text-safewatch-primary">
                    {cameras.filter(c => c.status === "online").length}
                  </div>
                  <div className="text-xs text-gray-500">Cameras Online</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-3xl font-bold text-safewatch-alert">
                    {threatCounts.high}
                  </div>
                  <div className="text-xs text-gray-500">High Threats</div>
                </div>
              </div>
              
              <div className="bg-safewatch-dark bg-opacity-5 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="text-xs">AI Detection Active</div>
                  <div className="text-xs font-medium flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                    Running
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatDetection;
