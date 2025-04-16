
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert as AlertType } from "@/types";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, CheckCircle, Clock } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface AlertSystemProps {
  alerts: AlertType[];
  onAcknowledge?: (id: number) => void;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ alerts, onAcknowledge }) => {
  const [expandedAlertId, setExpandedAlertId] = useState<number | null>(null);

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const hasCriticalAlerts = unacknowledgedAlerts.some(alert => alert.level === "critical");
  
  const toggleExpandAlert = (id: number) => {
    setExpandedAlertId(expandedAlertId === id ? null : id);
  };

  const handleAcknowledge = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onAcknowledge?.(id);
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case "assault":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "suspicious":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className={cn(
      "h-full transition-all duration-300",
      hasCriticalAlerts && "ring-2 ring-red-500"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center">
            <Bell className="mr-2 h-5 w-5 text-safewatch-primary" />
            Alert System
            {unacknowledgedAlerts.length > 0 && (
              <span className={cn(
                "ml-2 px-2 py-0.5 text-xs rounded-full",
                hasCriticalAlerts 
                  ? "bg-red-100 text-red-700 animate-pulse-alert" 
                  : "bg-blue-100 text-blue-700"
              )}>
                {unacknowledgedAlerts.length} unacknowledged
              </span>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[400px]">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-10 w-10 mx-auto mb-2 text-gray-400" />
            <p>No alerts to display</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={cn(
                  "border rounded-lg overflow-hidden transition-all duration-200",
                  expandedAlertId === alert.id ? "shadow-md" : "shadow-sm",
                  !alert.acknowledged && alert.level === "critical" && "bg-red-50 border-red-200",
                  !alert.acknowledged && alert.level !== "critical" && "bg-blue-50 border-blue-200",
                  alert.acknowledged && "bg-white"
                )}
              >
                <div 
                  className="p-3 cursor-pointer"
                  onClick={() => toggleExpandAlert(alert.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {getAlertTypeIcon(alert.type)}
                      <span className="font-medium ml-2">{alert.description}</span>
                    </div>
                    <StatusBadge 
                      status={alert.level} 
                      type="alert" 
                      size="sm"
                      className={cn(
                        alert.level === "critical" && !alert.acknowledged && "animate-pulse-alert"
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </div>
                    <div>{alert.location}</div>
                  </div>
                  
                  {expandedAlertId === alert.id && (
                    <div className="mt-3">
                      {alert.image && (
                        <div className="mt-2 mb-3">
                          <img 
                            src={alert.image} 
                            alt="Alert evidence" 
                            className="w-full h-32 object-cover rounded" 
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-end mt-2">
                        {!alert.acknowledged ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs"
                            onClick={(e) => handleAcknowledge(alert.id, e)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Acknowledge
                          </Button>
                        ) : (
                          <span className="text-xs text-green-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Acknowledged
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertSystem;
