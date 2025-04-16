
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ActivitySquare, CheckCircle, Clock, ShieldAlert } from "lucide-react";

interface StatisticsData {
  totalIncidents: number;
  resolvedIncidents: number;
  averageResponseTime: string;
  activeAlerts: number;
  systemStatus: string;
  camerasOnline: number;
  camerasOffline: number;
  detectionAccuracy: number;
}

interface StatsSummaryProps {
  data: StatisticsData;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ data }) => {
  const stats = [
    {
      label: "Total Incidents",
      value: data.totalIncidents,
      icon: ActivitySquare,
      color: "text-safewatch-primary",
      bgColor: "bg-blue-50",
    },
    {
      label: "Resolved",
      value: data.resolvedIncidents,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Avg Response",
      value: data.averageResponseTime,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      label: "Active Alerts",
      value: data.activeAlerts,
      icon: ShieldAlert,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border">
          <CardContent className="p-4 flex items-center">
            <div className={`${stat.bgColor} p-3 rounded-lg mr-3`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSummary;
