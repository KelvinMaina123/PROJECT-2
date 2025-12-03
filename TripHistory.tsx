import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp } from "lucide-react";

export const TripHistory = () => {
  // Mock trip data
  const trips = [
    {
      id: "1",
      date: "2025-10-11",
      startLocation: "Kabarak University",
      endLocation: "Nakuru Town",
      distance: 15.3,
      duration: 25,
      avgSpeed: 36.7,
      maxSpeed: 65,
      alerts: 2,
      status: "completed" as const,
    },
    {
      id: "2",
      date: "2025-10-10",
      startLocation: "Nakuru Town",
      endLocation: "Nairobi CBD",
      distance: 156.8,
      duration: 135,
      avgSpeed: 69.6,
      maxSpeed: 95,
      alerts: 5,
      status: "completed" as const,
    },
    {
      id: "3",
      date: "2025-10-09",
      startLocation: "Nairobi CBD",
      endLocation: "Westlands",
      distance: 8.2,
      duration: 18,
      avgSpeed: 27.3,
      maxSpeed: 45,
      alerts: 0,
      status: "completed" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trip History</h2>
          <p className="text-muted-foreground">Review your past driving sessions</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">24</div>
            <div className="flex items-center gap-1 text-sm text-safe">
              <TrendingUp className="h-4 w-4" />
              <span>12% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,245 km</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Last 30 days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Safety Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-safe">85/100</div>
            <div className="flex items-center gap-1 text-sm text-safe">
              <TrendingUp className="h-4 w-4" />
              <span>+5 points</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trip List */}
      <div className="space-y-4">
        {trips.map((trip) => (
          <Card key={trip.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Trip Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{trip.date}</span>
                    <Badge variant={trip.alerts > 0 ? "destructive" : "outline"}>
                      {trip.alerts} alerts
                    </Badge>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-foreground">{trip.startLocation}</div>
                      <div className="text-muted-foreground">to {trip.endLocation}</div>
                    </div>
                  </div>
                </div>

                {/* Trip Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div>
                    <div className="text-xs text-muted-foreground">Distance</div>
                    <div className="text-lg font-semibold text-foreground">{trip.distance} km</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                    <div className="text-lg font-semibold text-foreground">{trip.duration} min</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Avg Speed</div>
                    <div className="text-lg font-semibold text-foreground">{trip.avgSpeed} km/h</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Max Speed</div>
                    <div className="text-lg font-semibold text-foreground">{trip.maxSpeed} km/h</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};