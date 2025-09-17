import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Calendar, MapPin, User } from "lucide-react";
import { harvestsAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Harvest {
  id: string;
  farmerName: string;
  farmLocation: string;
  cropType: string;
  quantity: number;
  unit: string;
  harvestDate: string;
  quality: "A" | "B" | "C";
  status: "pending" | "approved" | "processed" | "shipped";
  pricePerUnit: number;
  totalValue: number;
}

const Harvests = () => {
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchHarvests();
  }, []);

  const fetchHarvests = async () => {
    try {
      setLoading(true);
      const response = await harvestsAPI.getAll();
      setHarvests(response.data);
    } catch (error) {
      // Mock data for demo purposes
      const mockHarvests: Harvest[] = [
        {
          id: "H001",
          farmerName: "John Smith",
          farmLocation: "Springfield Valley",
          cropType: "Corn",
          quantity: 2500,
          unit: "kg",
          harvestDate: "2024-01-15",
          quality: "A",
          status: "approved",
          pricePerUnit: 2.50,
          totalValue: 6250,
        },
        {
          id: "H002",
          farmerName: "Maria Garcia",
          farmLocation: "Green Hills Farm",
          cropType: "Tomatoes",
          quantity: 1200,
          unit: "kg",
          harvestDate: "2024-01-14",
          quality: "A",
          status: "processed",
          pricePerUnit: 4.00,
          totalValue: 4800,
        },
        {
          id: "H003",
          farmerName: "David Wilson",
          farmLocation: "Sunset Ranch",
          cropType: "Wheat",
          quantity: 3000,
          unit: "kg",
          harvestDate: "2024-01-13",
          quality: "B",
          status: "shipped",
          pricePerUnit: 1.80,
          totalValue: 5400,
        },
        {
          id: "H004",
          farmerName: "Sarah Johnson",
          farmLocation: "Riverside Farms",
          cropType: "Apples",
          quantity: 800,
          unit: "kg",
          harvestDate: "2024-01-12",
          quality: "A",
          status: "pending",
          pricePerUnit: 5.00,
          totalValue: 4000,
        },
        {
          id: "H005",
          farmerName: "Michael Brown",
          farmLocation: "Golden Fields",
          cropType: "Potatoes",
          quantity: 1800,
          unit: "kg",
          harvestDate: "2024-01-11",
          quality: "B",
          status: "approved",
          pricePerUnit: 1.50,
          totalValue: 2700,
        },
        {
          id: "H006",
          farmerName: "Lisa Anderson",
          farmLocation: "Mountain View Farm",
          cropType: "Barley",
          quantity: 2200,
          unit: "kg",
          harvestDate: "2024-01-10",
          quality: "C",
          status: "processed",
          pricePerUnit: 1.20,
          totalValue: 2640,
        },
      ];
      setHarvests(mockHarvests);
      console.error("Using mock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground";
      case "approved":
        return "bg-success text-success-foreground";
      case "processed":
        return "bg-primary text-primary-foreground";
      case "shipped":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "A":
        return "bg-success text-success-foreground";
      case "B":
        return "bg-warning text-warning-foreground";
      case "C":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredHarvests = harvests.filter(harvest =>
    harvest.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    harvest.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    harvest.farmLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    harvest.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = filteredHarvests.reduce((sum, harvest) => sum + harvest.totalValue, 0);
  const totalQuantity = filteredHarvests.reduce((sum, harvest) => sum + harvest.quantity, 0);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Harvests</h1>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Record Harvest
          </Button>
        </div>
        <div className="h-96 bg-muted rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-admin-dashboard-bg min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Harvests</h1>
          <p className="text-muted-foreground mt-1">Track and manage all harvest records</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Record Harvest
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Harvests</p>
                <p className="text-2xl font-bold">{filteredHarvests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <MapPin className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Quantity</p>
                <p className="text-2xl font-bold">{totalQuantity.toLocaleString()} kg</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <User className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search harvests by farmer, crop, location, or ID..."
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

      <Card>
        <CardHeader>
          <CardTitle>Harvest Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Farm Location</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHarvests.map((harvest) => (
                  <TableRow key={harvest.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{harvest.id}</TableCell>
                    <TableCell>{harvest.farmerName}</TableCell>
                    <TableCell>{harvest.farmLocation}</TableCell>
                    <TableCell>{harvest.cropType}</TableCell>
                    <TableCell>{harvest.quantity.toLocaleString()} {harvest.unit}</TableCell>
                    <TableCell>{new Date(harvest.harvestDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getQualityColor(harvest.quality)}>
                        Grade {harvest.quality}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(harvest.status)}>
                        {harvest.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">${harvest.totalValue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredHarvests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No harvests found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Harvests;