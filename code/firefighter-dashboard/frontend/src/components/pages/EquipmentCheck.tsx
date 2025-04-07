import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  condition: string;
  notes: string;
}

const categories = [
  { value: "hoses", label: "Hoses & Water Supply" },
  { value: "extinguishers", label: "Fire Extinguishers" },
  { value: "safety", label: "Safety Equipment" },
  { value: "tools", label: "Tools & Hardware" },
  { value: "communication", label: "Communication" },
  { value: "medical", label: "Medical Equipment" },
];

const EquipmentCheck = () => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form States
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    category: "hoses",
    condition: "good",
    notes: "",
  });

  // Fetch Equipment Data
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/equipment-checks");
        setEquipment(response.data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
        toast.error("Failed to load equipment");
      }
    };
    fetchEquipment();
  }, []);

  // Handle Checkbox Update
  const toggleCheckbox = async (id: string) => {
    try {
      const updatedEquipment = equipment.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setEquipment(updatedEquipment);
      await axios.put(`http://localhost:5000/api/equipment-checks/${id}`, {
        checked: !equipment.find(item => item.id === id)?.checked,
      });
    } catch (error) {
      toast.error("Failed to update equipment");
    }
  };

  // Handle Condition Update
  const updateCondition = async (id: string, condition: string) => {
    try {
      const updatedEquipment = equipment.map((item) =>
        item.id === id ? { ...item, condition } : item
      );
      setEquipment(updatedEquipment);
      await axios.put(`http://localhost:5000/api/equipment-checks/${id}`, { condition });
    } catch (error) {
      toast.error("Failed to update condition");
    }
  };

  // Handle Notes Update
  const updateNotes = async (id: string, notes: string) => {
    try {
      const updatedEquipment = equipment.map((item) =>
        item.id === id ? { ...item, notes } : item
      );
      setEquipment(updatedEquipment);
      await axios.put(`http://localhost:5000/api/equipment-checks/${id}`, { notes });
    } catch (error) {
      toast.error("Failed to update notes");
    }
  };

  // Add New Equipment (Form Submission)
  const handleAddEquipment = async () => {
    if (!newEquipment.name) {
      toast.error("Equipment name is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/equipment-checks/add-item", newEquipment);
      setEquipment([...equipment, response.data]);
      toast.success("Equipment added successfully!");
      setIsModalOpen(false);
      setNewEquipment({ name: "", category: "hoses", condition: "good", notes: "" });
    } catch (error) {
      toast.error("Failed to add equipment");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Equipment Check</h1>
      <p className="text-muted-foreground">Verify the condition of all equipment and log any issues</p>

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Equipment Checklist</CardTitle>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {equipment
            .filter((item) => categoryFilter === "all" || item.category === categoryFilter)
            .map((item) => (
              <div key={item.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={() => toggleCheckbox(item.id)}
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {categories.find(c => c.value === item.category)?.label}
                    </p>
                  </div>
                </div>

                <Select value={item.condition} onValueChange={(value) => updateCondition(item.id, value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Add Equipment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Equipment</DialogTitle>
              </DialogHeader>
              <Input 
                placeholder="Equipment Name" 
                value={newEquipment.name} 
                onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })} 
              />
              <Select value={newEquipment.category} onValueChange={(value) => setNewEquipment({ ...newEquipment, category: value })}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea placeholder="Notes" value={newEquipment.notes} onChange={(e) => setNewEquipment({ ...newEquipment, notes: e.target.value })} />
              <DialogFooter>
                <Button onClick={handleAddEquipment}>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EquipmentCheck;
