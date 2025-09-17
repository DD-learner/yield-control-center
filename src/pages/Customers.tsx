import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import UserCard from "@/components/UserCard";
import { customersAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: "active" | "inactive" | "pending";
  type: "customer";
  totalPurchases: number;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customersAPI.getAll();
      setCustomers(response.data);
    } catch (error) {
      // Mock data for demo purposes
      const mockCustomers: Customer[] = [
        {
          id: "1",
          name: "Whole Foods Market",
          email: "procurement@wholefoods.com",
          phone: "+1 (555) 111-2222",
          location: "Austin, TX",
          status: "active",
          type: "customer",
          totalPurchases: 125000,
        },
        {
          id: "2",
          name: "Green Valley Co-op",
          email: "orders@greenvalley.com",
          phone: "+1 (555) 222-3333",
          location: "Portland, OR",
          status: "active",
          type: "customer",
          totalPurchases: 85000,
        },
        {
          id: "3",
          name: "Farm Fresh Restaurant",
          email: "chef@farmfresh.com",
          phone: "+1 (555) 333-4444",
          location: "San Francisco, CA",
          status: "pending",
          type: "customer",
          totalPurchases: 45000,
        },
        {
          id: "4",
          name: "Organic Plus",
          email: "buying@organicplus.com",
          phone: "+1 (555) 444-5555",
          location: "Denver, CO",
          status: "active",
          type: "customer",
          totalPurchases: 95000,
        },
        {
          id: "5",
          name: "Local Harvest Market",
          email: "manager@localharvest.com",
          phone: "+1 (555) 555-6666",
          location: "Nashville, TN",
          status: "inactive",
          type: "customer",
          totalPurchases: 32000,
        },
        {
          id: "6",
          name: "Fresh Foods Distribution",
          email: "procurement@freshfoods.com",
          phone: "+1 (555) 666-7777",
          location: "Chicago, IL",
          status: "active",
          type: "customer",
          totalPurchases: 175000,
        },
      ];
      setCustomers(mockCustomers);
      console.error("Using mock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Customer",
      description: `Edit functionality for customer ${id} would be implemented here.`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Delete Customer",
      description: `Delete functionality for customer ${id} would be implemented here.`,
      variant: "destructive",
    });
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Customers</h1>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
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
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage customer relationships and track purchases</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search customers by name, location, or email..."
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
        {filteredCustomers.map((customer) => (
          <UserCard
            key={customer.id}
            user={customer}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No customers found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Customers;