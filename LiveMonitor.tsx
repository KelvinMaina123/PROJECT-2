import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Gauge, MapPin, Play, Square } from "lucide-react";
import { useState } from "react";

export const LiveMonitor = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  // Mock data - in real app, this would come from sensors
  const currentSpeed = 45;
  const maxSpeed = 60;
  const location = "Nakuru-Nairobi Highway, KM 45";
  const gForce = 0.8;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Monitoring Control</CardTitle>
            <Button
              onClick={() => setIsMonitoring(!isMonitoring)}
              variant={isMonitoring ? "destructive" : "default"}
              className="gap-2"
            >
              {isMonitoring ? (
                <>
                  <Square className="h-4 w-4" />
                  Stop Monitoring
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Trip
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${isMonitoring ? 'bg-safe animate-pulse' : 'bg-muted'}`} />
            <span className="text-sm text-muted-foreground">
              {isMonitoring ? "Active monitoring in progress" : "Not monitoring"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Live Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Speed Card */}
        <Card className={isMonitoring && currentSpeed > maxSpeed ? "border-danger shadow-danger" : ""}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Current Speed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">{currentSpeed} km/h</div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">Limit: {maxSpeed} km/h</div>
                {isMonitoring && currentSpeed > maxSpeed && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Speeding
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">{location}</div>
              <div className="text-xs text-muted-foreground">
                Lat: -0.5242 | Long: 36.0473
              </div>
            </div>
          </CardContent>
        </Card>

        {/* G-Force Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">G-Force</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">{gForce}g</div>
              <div className="text-sm text-muted-foreground">Normal range</div>
            </div>
          </CardContent>
        </Card>

        {/* Driver Status Card */}
        <Card className="bg-gradient-safe text-safe-foreground">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Driver Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">Attentive</div>
              <div className="text-sm opacity-90">Eyes on road</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Event Log */}
      <Card>
        <CardHeader>
          <CardTitle>Event Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {isMonitoring ? (
              <>
                <div className="flex items-start gap-3 rounded-lg border border-border-default bg-muted/50 p-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-safe" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Trip Started</div>
                    <div className="text-xs text-muted-foreground">Just now</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border-default bg-muted/50 p-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Monitoring Active</div>
                    <div className="text-xs text-muted-foreground">Sensors online</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Start a trip to see real-time events
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};