import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, CheckCircle2, MapPin, Gauge, Move } from "lucide-react";
import { useState } from "react";

export const AlertPanel = () => {
  const [filter, setFilter] = useState<"all" | "unacknowledged">("all");

  const alerts = [
    {
      id: "1",
      type: "speeding" as const,
      severity: "high" as const,
      description: "Speed exceeded limit by 15 km/h",
      location: "Nakuru-Nairobi Highway, KM 45",
      speed: 75,
      timestamp: "2025-10-11 14:32",
      acknowledged: false,
    },
    {
      id: "2",
      type: "harsh_braking" as const,
      severity: "medium" as const,
      description: "Sudden braking detected",
      location: "Nakuru Town",
      gForce: 1.2,
      timestamp: "2025-10-11 13:15",
      acknowledged: false,
    },
    {
      id: "3",
      type: "distraction" as const,
      severity: "low" as const,
      description: "Driver looked away for 4 seconds",
      location: "Kabarak Road",
      timestamp: "2025-10-11 09:47",
      acknowledged: true,
    },
    {
      id: "4",
      type: "sharp_turn" as const,
      severity: "medium" as const,
      description: "Sharp turn detected",
      location: "Nakuru-Eldoret Highway",
      gForce: 0.9,
      timestamp: "2025-10-10 16:22",
      acknowledged: true,
    },
    {
      id: "5",
      type: "accident" as const,
      severity: "critical" as const,
      description: "Collision detected - Emergency alert sent",
      location: "Nairobi-Mombasa Road",
      gForce: 2.5,
      timestamp: "2025-10-08 11:30",
      acknowledged: true,
    },
  ];

  const filteredAlerts = filter === "all" ? alerts : alerts.filter(a => !a.acknowledged);

  type SeverityColor = "critical" | "danger" | "warning" | "muted";
  
  const getSeverityColor = (severity: string): SeverityColor => {
    switch (severity) {
      case "critical": return "critical";
      case "high": return "danger";
      case "medium": return "warning";
      default: return "muted";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "speeding": return Gauge;
      case "harsh_braking": case "sharp_turn": return Move;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Safety Alerts</h2>
          <p className="text-muted-foreground">Monitor and manage driving alerts</p>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{alerts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unacknowledged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-danger">
              {alerts.filter(a => !a.acknowledged).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-danger">
              {alerts.filter(a => a.severity === "high" || a.severity === "critical").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Most Common</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-foreground">Speeding</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All Alerts
        </Button>
        <Button
          variant={filter === "unacknowledged" ? "default" : "outline"}
          onClick={() => setFilter("unacknowledged")}
        >
          Unacknowledged
        </Button>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          const severityColor = getSeverityColor(alert.severity);
          
          return (
            <Card key={alert.id} className={`border-l-4 ${
              severityColor === "critical" ? "border-l-critical" :
              severityColor === "danger" ? "border-l-danger" :
              severityColor === "warning" ? "border-l-warning" :
              "border-l-muted"
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3 flex-1">
                    <div className={`mt-0.5 ${
                      severityColor === "critical" ? "text-critical" :
                      severityColor === "danger" ? "text-danger" :
                      severityColor === "warning" ? "text-warning" :
                      "text-muted-foreground"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{alert.description}</span>
                        <Badge variant={
                          severityColor === "critical" || severityColor === "danger" ? "destructive" :
                          severityColor === "warning" ? "secondary" : "outline"
                        }>
                          {alert.severity}
                        </Badge>
                        {alert.acknowledged && (
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Acknowledged
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Bell className="h-3 w-3" />
                          {alert.timestamp}
                        </div>
                      </div>

                      {alert.speed && (
                        <div className="text-sm text-muted-foreground">
                          Speed: <span className="font-medium text-danger">{alert.speed} km/h</span>
                        </div>
                      )}
                      {alert.gForce && (
                        <div className="text-sm text-muted-foreground">
                          G-Force: <span className="font-medium">{alert.gForce}g</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {!alert.acknowledged && (
                    <Button size="sm" variant="outline">
                      Acknowledge
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};