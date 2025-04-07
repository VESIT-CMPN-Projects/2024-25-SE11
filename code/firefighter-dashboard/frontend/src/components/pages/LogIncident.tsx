
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Define schema for incident form
const incidentSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  incidentDate: z.string().min(1, { message: "Date is required" }),
  incidentTime: z.string().min(1, { message: "Time is required" }),
  incidentType: z.string().min(1, { message: "Please select incident type" }),
  severity: z.string().min(1, { message: "Please select severity" }),
  actionTaken: z.string().min(10, { message: "Please describe actions taken (min 10 characters)" }),
  casualties: z.boolean().default(false),
  casualtyDetails: z.string().optional(),
  detailedReport: z.string().min(20, { message: "Please provide a detailed report (min 20 characters)" }),
});

type IncidentFormValues = z.infer<typeof incidentSchema>;

const LogIncident = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentSchema),
    defaultValues: {
      location: "",
      incidentDate: "",
      incidentTime: "",
      incidentType: "",
      severity: "",
      actionTaken: "",
      casualties: false,
      casualtyDetails: "",
      detailedReport: "",
    },
  });
  
  const { watch } = form;
  const casualties = watch("casualties");

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found! User might not be logged in.");
  } else {
    console.log("Token being sent:", token);
  }
  
  const onSubmit = async (data: IncidentFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "", 
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error("Server error:", responseData);
        throw new Error(`Failed to submit: ${response.status} ${response.statusText}`);
      }
      
      console.log("Incident submitted:", responseData);
      
      toast.success("Incident report submitted successfully");
      form.reset();
    } catch (error) {
      console.error("Error submitting incident:", error);
      toast.error("Failed to submit incident report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Log an Incident</h1>
        <p className="text-muted-foreground">
          Fill in the details of the incident you are reporting
        </p>
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter incident location" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide the exact address or coordinates
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="incidentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="incidentTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="incidentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select incident type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="structure_fire">Structure Fire</SelectItem>
                        <SelectItem value="wildfire">Wildfire</SelectItem>
                        <SelectItem value="vehicle_accident">Vehicle Accident</SelectItem>
                        <SelectItem value="medical">Medical Emergency</SelectItem>
                        <SelectItem value="hazmat">Hazardous Materials</SelectItem>
                        <SelectItem value="rescue">Rescue Operation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="actionTaken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action Taken</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the actions taken to address the incident"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="casualties"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Casualties or Injuries</FormLabel>
                      <FormDescription>
                        Check if there were any casualties or injuries
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              {casualties && (
                <FormField
                  control={form.control}
                  name="casualtyDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Casualty Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide details about casualties or injuries"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <FormField
              control={form.control}
              name="detailedReport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Report</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide a comprehensive description of the incident"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include all relevant details about the incident
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Incident Report"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LogIncident;
