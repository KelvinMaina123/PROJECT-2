import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, UserPlus, Star, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const EmergencyContacts = () => {
  const [contacts] = useState([
    {
      id: "1",
      name: "Jane Mwangi",
      phone: "+254 712 345 678",
      relationship: "Spouse",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Dr. Andrew Kipkebut",
      phone: "+254 720 123 456",
      relationship: "Supervisor",
      isPrimary: false,
    },
    {
      id: "3",
      name: "Emergency Services",
      phone: "999",
      relationship: "Emergency",
      isPrimary: false,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Emergency Contacts</h2>
          <p className="text-muted-foreground">Manage contacts for accident alerts</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter contact name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+254 712 345 678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Input id="relationship" placeholder="e.g., Spouse, Parent, Friend" />
              </div>
              <Button className="w-full">Save Contact</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white/20 p-3">
              <Phone className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Accident Alert System</h3>
              <p className="text-sm opacity-90">
                In case of a detected accident, the system will automatically send SMS alerts with your GPS location 
                to all emergency contacts listed below. The primary contact will be notified first.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <div className="space-y-3">
        {contacts.map((contact) => (
          <Card key={contact.id} className={contact.isPrimary ? "border-primary shadow-glow" : ""}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {contact.isPrimary ? (
                      <Star className="h-5 w-5 fill-current" />
                    ) : (
                      <Phone className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{contact.name}</h4>
                      {contact.isPrimary && (
                        <Badge className="bg-primary text-primary-foreground">Primary</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span>{contact.phone}</span>
                      <span>•</span>
                      <span>{contact.relationship}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-danger hover:text-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Testing Alert System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• The system detects accidents based on sudden G-force changes (threshold: {">"} 2.0g)</p>
          <p>• SMS alerts include your GPS coordinates and accident severity</p>
          <p>• Primary contact receives immediate notification</p>
          <p>• Other contacts are notified after 30 seconds if no response</p>
        </CardContent>
      </Card>
    </div>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${className}`}>
    {children}
  </span>
);