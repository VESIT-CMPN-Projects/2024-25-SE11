
import { useState, useEffect } from "react";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Badge
} from "@/components/ui/badge";


const ViewIncidents = () => {
  const [incidents, setIncidents] = useState([]);  // Store fetched incidents
  const [loading, setLoading] = useState(true);    // Loading state
  const [error, setError] = useState(null);        // Error state
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Fetch incidents from backend
  useEffect(() => {
    const fetchIncidents = async () => {
      const token = localStorage.getItem("token"); // Get JWT token from localStorage

      try{
        const response = await fetch("http://localhost:5000/api/incidents", {
          method: "GET",
          headers: {
            "Authorization": token ? `Bearer ${token}` : "", // Include token in Authorization header
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) throw new Error("Failed to fetch incidents");
        
        const data = await response.json();
        setIncidents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  // Filter incidents based on search and type filter
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       incident.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || incident.type.toLowerCase().includes(typeFilter.toLowerCase());
    
    return matchesSearch && matchesType;
  });
  
  // Get severity badge color
  const getSeverityBadge = (severity: string) => {
    if (!severity) return '⚪ Unknown'; // Default value if undefined
    switch(severity.toLowerCase()) {
      case "critical":
        return <Badge className="bg-red-600 text-white">Critical</Badge>;
      case "high":
        return <Badge className="bg-red-500 text-white">High</Badge>;
      case "medium":
        return <Badge className="bg-red-400 text-white">Medium</Badge>;
      case "low":
        return <Badge className="bg-red-300 text-white">Low</Badge>;
      default:
        return <Badge className="bg-red-200 text-red-800">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-red-600">AIFA Incident Reports</h1>
        <p className="text-muted-foreground">
          View and filter all logged incident reports
        </p>
      </div>
      
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-700">Filters</CardTitle>
          <CardDescription>
            Filter incident reports by location or type
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Input
                placeholder="Search by location or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-red-200 focus-visible:ring-red-300"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="border-red-200 focus-visible:ring-red-300">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="structure fire">Structure Fire</SelectItem>
                <SelectItem value="vehicle accident">Vehicle Accident</SelectItem>
                <SelectItem value="medical">Medical Emergency</SelectItem>
                <SelectItem value="hazardous">Hazardous Materials</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <CardTitle className="text-red-700">Incident List</CardTitle>
          <CardDescription>
            {filteredIncidents.length} incidents found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-red-50">
                <TableHead>ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.length > 0 ? (
                filteredIncidents.map((incident) => (
                  <TableRow key={incident.id || incident._id} className="hover:bg-red-50">
                    <TableCell className="font-medium">{incident.id ? incident.id : incident._id.slice(-6)}</TableCell>
                    <TableCell>{incident.location}</TableCell>
                    <TableCell>{new Date(incident.incidentDate).toLocaleDateString()}</TableCell>
                    <TableCell>{incident.incidentType}</TableCell>
                    <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No incidents found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewIncidents;
