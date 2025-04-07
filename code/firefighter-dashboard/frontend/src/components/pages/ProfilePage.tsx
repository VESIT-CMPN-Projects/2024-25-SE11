import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Mail, Phone, Shield } from "lucide-react";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [firefighter, setFirefighter] = useState({
    name: "John Smith",
    badgeId: "FF-2023-1234",
    role: "Senior Firefighter",
    station: "Station #3",
    joinDate: "2018-05-12",
    email: "john.smith@firedept.gov",
    phone: "(555) 123-4567",
    certifications: [],
    incidents: [],  // Ensure it's always an array
    drills: [],
  });

  useEffect(() => {
    const fetchIncidents = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
    
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/incidents", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token
          },
        });

        if (!response.ok) {
          throw new Error(`Unexpected API response: ${response.statusText}`);
        }

        const data = await response.json();

        // Ensure that incidents is always an array
        setFirefighter((prev) => ({
          ...prev,
          incidents: Array.isArray(data) ? data : [],  // ✅ Ensure incidents is an array
        }));
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getYearsOfService = (joinDate: string) => {
    const start = new Date(joinDate);
    const now = new Date();
    const diffYears = now.getFullYear() - start.getFullYear();
    return now.getMonth() >= start.getMonth() && now.getDate() >= start.getDate()
      ? diffYears
      : diffYears - 1;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your firefighter profile
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{firefighter.name}</CardTitle>
            <CardDescription>{firefighter.role}</CardDescription>
            <div className="mt-2">
              <Badge className="bg-blue-600">{firefighter.station}</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Badge ID</span>
                <span className="font-medium">{firefighter.badgeId}</span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">
                  Years of Service
                </span>
                <span className="font-medium">
                  {getYearsOfService(firefighter.joinDate)} years
                </span>
              </div>

              <div className="flex items-center pt-2">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{firefighter.email}</span>
              </div>

              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{firefighter.phone}</span>
              </div>

              <div className="flex items-center pt-2">
                <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">
                  Joined {formatDate(firefighter.joinDate)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity History */}
        <Card className="md:col-span-3">
          <Tabs defaultValue="incidents" className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Activity History</CardTitle>
                <TabsList>
                  <TabsTrigger value="incidents">Incidents</TabsTrigger>
                  <TabsTrigger value="drills">Drills</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>

            <CardContent>
              {/* Incidents Tab */}
              <TabsContent value="incidents" className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Recent Incidents
                </h3>

                <div className="rounded-md border">
                  <div className="grid grid-cols-3 p-4 border-b bg-muted/50 text-sm font-medium">
                    <div>Incident ID</div>
                    <div>Type</div>
                    <div>Date</div>
                  </div>

                  {firefighter.incidents?.length > 0 ? (
                    firefighter.incidents.map((incident, i) => (
                      <div
                        key={incident._id || i}  // Use _id from MongoDB or fallback to index
                        className={`grid grid-cols-3 p-4 text-sm ${
                          i !== firefighter.incidents.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div>{incident.id ? incident.id : incident._id.slice(-6)}</div>
                        <div>{incident.incidentType || "Unknown"}</div>
                        <div>{formatDate(incident.incidentDate) || "N/A"}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No incident reports found
                    </div>
                  )}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
