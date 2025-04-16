
import React, { useState } from "react";
import { Bell, Menu, X, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { alerts } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const unacknowledgedAlerts = alerts.filter((alert) => !alert.acknowledged);

  const handleAlertClick = () => {
    toast({
      title: "Alerts",
      description: `You have ${unacknowledgedAlerts.length} unacknowledged alerts.`,
    });
  };

  return (
    <nav className="bg-safewatch-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl">SafeWatch AI</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="link" className="text-white">Dashboard</Button>
            <Button variant="link" className="text-white">Cameras</Button>
            <Button variant="link" className="text-white">Alerts</Button>
            <Button variant="link" className="text-white">Analytics</Button>
            <Button variant="link" className="text-white">Settings</Button>
            
            <div className="relative ml-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
                onClick={handleAlertClick}
              >
                <Bell className="h-5 w-5" />
                {unacknowledgedAlerts.length > 0 && (
                  <Badge 
                    className={cn(
                      "absolute -top-1 -right-1 px-1.5 py-0.5 bg-safewatch-alert text-white rounded-full",
                      unacknowledgedAlerts.some(a => a.level === "critical") && "animate-pulse-alert"
                    )}
                  >
                    {unacknowledgedAlerts.length}
                  </Badge>
                )}
              </Button>
            </div>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="relative mr-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative text-white"
                onClick={handleAlertClick}
              >
                <Bell className="h-5 w-5" />
                {unacknowledgedAlerts.length > 0 && (
                  <Badge 
                    className={cn(
                      "absolute -top-1 -right-1 px-1.5 py-0.5 bg-safewatch-alert text-white rounded-full",
                      unacknowledgedAlerts.some(a => a.level === "critical") && "animate-pulse-alert"
                    )}
                  >
                    {unacknowledgedAlerts.length}
                  </Badge>
                )}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-safewatch-dark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Button variant="ghost" className="w-full justify-start text-white">Dashboard</Button>
            <Button variant="ghost" className="w-full justify-start text-white">Cameras</Button>
            <Button variant="ghost" className="w-full justify-start text-white">Alerts</Button>
            <Button variant="ghost" className="w-full justify-start text-white">Analytics</Button>
            <Button variant="ghost" className="w-full justify-start text-white">Settings</Button>
            <Button variant="ghost" className="w-full justify-start text-white">Profile</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
