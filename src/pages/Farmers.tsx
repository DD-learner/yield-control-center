import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import UserCard from "@/components/UserCard";
import { farmersAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: "active" | "inactive" | "pending";
  type: "farmer";
  farmSize: string;
  crops: string[];
}

const Farmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const response = await farmersAPI.getAll();
      setFarmers(response.data);
    } catch (error) {
      // Mock data for demo purposes
      const mockFarmers: Farmer[] = [
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@email.com",
          phone: "+1 (555) 123-4567",
          location: "Springfield Valley",
          status: "active",
          type: "farmer",
          farmSize: "150 acres",
          crops: ["Corn", "Wheat", "Soybeans"],
        },
        {
          id: "2",
          name: "Maria Garcia",
          email: "maria.garcia@email.com",
          phone: "+1 (555) 234-5678",
          location: "Green Hills Farm",
          status: "active",
          type: "farmer",
          farmSize: "85 acres",
          crops: ["Tomatoes", "Peppers", "Lettuce"],
        },
        {
          id: "3",
          name: "David Wilson",
          email: "david.wilson@email.com",
          phone: "+1 (555) 345-6789",
          location: "Sunset Ranch",
          status: "pending",
          type: "farmer",
          farmSize: "200 acres",
          crops: ["Cattle", "Hay", "Pasture"],
        },
        {
          id: "4",
          name: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          phone: "+1 (555) 456-7890",
          location: "Riverside Farms",
          status: "active",
          type: "farmer",
          farmSize: "120 acres",
          crops: ["Apples", "Cherries", "Pears"],
        },
        {
          id: "5",
          name: "Michael Brown",
          email: "michael.brown@email.com",
          phone: "+1 (555) 567-8901",
          location: "Golden Fields",
          status: "inactive",
          type: "farmer",
          farmSize: "75 acres",
          crops: ["Potatoes", "Carrots", "Onions"],
        },
        {
          id: "6",
          name: "Lisa Anderson",
          email: "lisa.anderson@email.com",
          phone: "+1 (555) 678-9012",
          location: "Mountain View Farm",
          status: "active",
          type: "farmer",
          farmSize: "300 acres",
          crops: ["Barley", "Oats", "Rye"],
        },
      ];
      setFarmers(mockFarmers);
      console.error("Using mock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Farmer",
      description: `Edit functionality for farmer ${id} would be implemented here.`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Delete Farmer",
      description: `Delete functionality for farmer ${id} would be implemented here.`,
      variant: "destructive",
    });
  };

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Farmers</h1>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Add Farmer
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-admin-dashboard-bg min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Farmers</h1>
          <p className="text-muted-foreground mt-1">Manage and track all registered farmers</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Farmer
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search farmers by name, location, or crops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="whitespace-nowrap">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer) => (
          <UserCard
            key={farmer.id}
            user={farmer}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredFarmers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No farmers found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Farmers;