import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle, Navigation, Settings, Shield, Users } from "lucide-react";
import { LiveMonitor } from "@/components/dashboard/LiveMonitor";
import { TripHistory } from "@/components/dashboard/TripHistory";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import { EmergencyContacts } from "@/components/dashboard/EmergencyContact";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"monitor" | "trips" | "alerts" | "contacts">("monitor");

  const tabComponents = {
    monitor: <LiveMonitor />,
    trips: <TripHistory />,
    alerts: <AlertPanel />,
    contacts: <EmergencyContacts />,
  };

  const tabs = [
    { key: "monitor", label: "Live Monitor", icon: <Activity className="h-4 w-4" /> },
    { key: "trips", label: "Trip History", icon: <Navigation className="h-4 w-4" /> },
    { key: "alerts", label: "Alerts", icon: <AlertTriangle className="h-4 w-4" /> },
    { key: "contacts", label: "Emergency Contacts", icon: <Users className="h-4 w-4" /> },
  ] as const;

  const getTabClass = (tabKey: typeof activeTab) =>
    `flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
      activeTab === tabKey
        ? "border-b-2 border-primary text-primary"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border-default bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">DriveGuard</h1>
                <p className="text-sm text-muted-foreground">Driver Safety Monitoring System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2">
                <div className="h-2 w-2 rounded-full bg-safe animate-pulse" />
                System Active
              </Badge>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border-default bg-card">
        <div className="container mx-auto px-4" role="tablist">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={getTabClass(tab.key)}
                role="tab"
                aria-selected={activeTab === tab.key}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {tabComponents[activeTab]}
      </main>
    </div>
  );
};

export default Dashboard;
