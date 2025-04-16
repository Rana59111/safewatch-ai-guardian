
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Incident } from "@/types";
import { format } from "date-fns";
import { ClipboardList, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface IncidentLogProps {
  incidents: Incident[];
}

const IncidentLog: React.FC<IncidentLogProps> = ({ incidents }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <ClipboardList className="mr-2 h-5 w-5 text-safewatch-primary" />
          Incident Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-8"
            placeholder="Search incidents..."
          />
        </div>
        
        <div className="space-y-1 max-h-[300px] overflow-auto pr-1">
          {incidents.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <p>No incidents to display</p>
            </div>
          ) : (
            incidents.map((incident) => (
              <div 
                key={incident.id}
                className={cn(
                  "border-l-4 p-3 rounded-r-lg mb-2",
                  incident.status === "resolved" && "border-l-green-500 bg-green-50",
                  incident.status === "investigating" && "border-l-yellow-500 bg-yellow-50",
                  incident.status === "new" && "border-l-blue-500 bg-blue-50",
                  incident.status === "false_alarm" && "border-l-gray-400 bg-gray-50",
                )}
              >
                <div className="flex justify-between">
                  <div className="font-medium">{incident.description}</div>
                  <div className="text-xs py-1 px-2 rounded bg-white">
                    {incident.status}
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 mt-1 flex justify-between">
                  <div>{incident.location}</div>
                  <div>{format(new Date(incident.timestamp), "MMM d, h:mm a")}</div>
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Response:</span> {incident.responseTime}
                  </div>
                  <div className="flex">
                    {incident.responders.map((responder, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-safewatch-primary text-white px-1.5 py-0.5 rounded ml-1"
                      >
                        {responder}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentLog;
