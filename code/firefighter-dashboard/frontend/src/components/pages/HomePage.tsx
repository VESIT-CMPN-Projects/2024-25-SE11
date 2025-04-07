import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Users, Calendar, ShieldAlert } from "lucide-react";

const HomePage = () => {
  const [stats, setStats] = useState({
    incidentsThisMonth: 0,
    firefightersOnDuty: 0,
    drillsCompleted: 0,
    equipmentChecksDue: 0,
  });

  const [recentIncidents, setRecentIncidents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

    // Fetch dashboard stats
    axios.get("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setStats(response.data))
      .catch(error => console.error("Error fetching dashboard stats:", error));

    // Fetch recent incidents
    axios.get("http://localhost:5000/api/incidents", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setRecentIncidents(response.data.slice(0, 5))) // Show latest 5 incidents
      .catch(error => console.error("Error fetching incidents:", error));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your firefighter dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents This Month</CardTitle>
            <ClipboardList className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.incidentsThisMonth}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Firefighters On Duty</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.firefightersOnDuty}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drills Completed</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.drillsCompleted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipment Checks Due</CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.equipmentChecksDue}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            {recentIncidents.length > 0 ? (
              <ul className="text-sm text-muted-foreground">
                {recentIncidents.map((incident, index) => (
                  <li key={index} className="border-b py-2">
                    <strong>{incident.incidentType}</strong> at {incident.location} on {new Date(incident.incidentDate).toLocaleDateString()}  
                    <br />
                    <span className="text-xs text-gray-500">ID: {incident._id.slice(-6)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No recent incidents to display.</p>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Drills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No upcoming drills scheduled. Check back soon for updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
