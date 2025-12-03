import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, Activity, Bell, Users, TrendingUp, MapPin } from "lucide-react";
import { supabase } from "@/components/ui/clients";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      if (session) navigate("/dashboard");
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      if (session) navigate("/dashboard");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const features = [
    { icon: Activity, title: "Real-Time Monitoring", description: "Track driver behavior with GPS and IMU sensors for continuous safety monitoring" },
    { icon: AlertTriangle, title: "Instant Alerts", description: "Get immediate notifications for speeding, harsh braking, sharp turns, and distractions" },
    { icon: Bell, title: "Accident Detection", description: "Automatic crash detection with emergency SMS alerts to your contacts" },
    { icon: MapPin, title: "GPS Tracking", description: "Precise location tracking with detailed trip logs and route history" },
    { icon: Users, title: "Emergency Contacts", description: "Manage emergency contacts who receive alerts during accidents" },
    { icon: TrendingUp, title: "Safety Analytics", description: "Track your driving habits and improve with detailed performance insights" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground md:text-6xl">DriveGuard</h1>
            <p className="text-xl text-muted-foreground md:text-2xl">Advanced Driver Behavior Monitoring & Accident Detection System</p>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Enhance road safety with intelligent vehicle-integrated monitoring. Track driver behavior, prevent distractions, and ensure rapid emergency response through automated accident detection.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button size="lg" onClick={() => navigate("/auth")} className="gap-2 text-lg px-8">
              Get Started
              <Shield className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="text-lg px-8">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Safety Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built on cutting-edge sensor technology and real-time data analysis to keep drivers safe on the road
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;