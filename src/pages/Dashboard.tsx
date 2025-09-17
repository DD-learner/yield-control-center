import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Wheat, FileText, TrendingUp, Activity } from "lucide-react";
import { dashboardAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalFarmers: number;
  totalCustomers: number;
  totalHarvests: number;
  totalReports: number;
  recentActivity: number;
  monthlyGrowth: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalFarmers: 0,
    totalCustomers: 0,
    totalHarvests: 0,
    totalReports: 0,
    recentActivity: 0,
    monthlyGrowth: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getStats();
      setStats(response.data);
    } catch (error) {
      // Mock data for demo purposes
      setStats({
        totalFarmers: 156,
        totalCustomers: 89,
        totalHarvests: 234,
        totalReports: 45,
        recentActivity: 28,
        monthlyGrowth: 12.5,
      });
      console.error("Using mock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Farmers",
      value: stats.totalFarmers,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: "+12%",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: UserCheck,
      color: "text-success",
      bgColor: "bg-success/10",
      change: "+8%",
    },
    {
      title: "Total Harvests",
      value: stats.totalHarvests,
      icon: Wheat,
      color: "text-warning",
      bgColor: "bg-warning/10",
      change: "+15%",
    },
    {
      title: "Lab Reports",
      value: stats.totalReports,
      icon: FileText,
      color: "text-admin-stat-info",
      bgColor: "bg-admin-stat-info/10",
      change: "+5%",
    },
  ];

  const activityCards = [
    {
      title: "Recent Activity",
      value: stats.recentActivity,
      icon: Activity,
      description: "Actions this week",
    },
    {
      title: "Monthly Growth",
      value: `${stats.monthlyGrowth}%`,
      icon: TrendingUp,
      description: "Compared to last month",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-admin-dashboard-bg min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your farm network.</p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="hover:shadow-card-hover transition-all duration-300 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{card.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {card.value.toLocaleString()}
                  </p>
                  <p className="text-success text-sm font-medium mt-1">{card.change}</p>
                </div>
                <div className={`${card.bgColor} ${card.color} p-3 rounded-lg`}>
                  <card.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activityCards.map((card, index) => (
          <Card key={index} className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <card.icon className="h-5 w-5 text-primary" />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{card.value}</div>
              <p className="text-muted-foreground text-sm mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-primary rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity">
              <h3 className="font-semibold">Add New Farmer</h3>
              <p className="text-sm opacity-90">Register a new farmer in the system</p>
            </div>
            <div className="p-4 bg-gradient-success rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity">
              <h3 className="font-semibold">Record Harvest</h3>
              <p className="text-sm opacity-90">Log new harvest information</p>
            </div>
            <div className="p-4 bg-gradient-card border rounded-lg cursor-pointer hover:shadow-card-hover transition-all">
              <h3 className="font-semibold text-foreground">Generate Report</h3>
              <p className="text-sm text-muted-foreground">Create lab test reports</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;