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
import { Plus, Search, Filter, Download, FileText, Calendar, CheckCircle, XCircle } from "lucide-react";
import { reportsAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  reportType: "Lab Test" | "Quality Control" | "Processing" | "Transport";
  sampleId: string;
  farmerName: string;
  cropType: string;
  testDate: string;
  completedDate?: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  results: {
    pesticides: "pass" | "fail" | "pending";
    moisture: string;
    contamination: "pass" | "fail" | "pending";
    overall: "pass" | "fail" | "pending";
  };
  certifiedBy?: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getAll();
      setReports(response.data);
    } catch (error) {
      // Mock data for demo purposes
      const mockReports: Report[] = [
        {
          id: "R001",
          reportType: "Lab Test",
          sampleId: "S2024-001",
          farmerName: "John Smith",
          cropType: "Corn",
          testDate: "2024-01-15",
          completedDate: "2024-01-17",
          status: "completed",
          results: {
            pesticides: "pass",
            moisture: "12.5%",
            contamination: "pass",
            overall: "pass",
          },
          certifiedBy: "Dr. Sarah Wilson",
        },
        {
          id: "R002",
          reportType: "Quality Control",
          sampleId: "S2024-002",
          farmerName: "Maria Garcia",
          cropType: "Tomatoes",
          testDate: "2024-01-14",
          completedDate: "2024-01-16",
          status: "completed",
          results: {
            pesticides: "pass",
            moisture: "8.2%",
            contamination: "pass",
            overall: "pass",
          },
          certifiedBy: "Dr. Michael Chen",
        },
        {
          id: "R003",
          reportType: "Lab Test",
          sampleId: "S2024-003",
          farmerName: "David Wilson",
          cropType: "Wheat",
          testDate: "2024-01-13",
          status: "in-progress",
          results: {
            pesticides: "pending",
            moisture: "14.1%",
            contamination: "pending",
            overall: "pending",
          },
        },
        {
          id: "R004",
          reportType: "Processing",
          sampleId: "S2024-004",
          farmerName: "Sarah Johnson",
          cropType: "Apples",
          testDate: "2024-01-12",
          status: "pending",
          results: {
            pesticides: "pending",
            moisture: "10.3%",
            contamination: "pending",
            overall: "pending",
          },
        },
        {
          id: "R005",
          reportType: "Lab Test",
          sampleId: "S2024-005",
          farmerName: "Michael Brown",
          cropType: "Potatoes",
          testDate: "2024-01-11",
          completedDate: "2024-01-13",
          status: "completed",
          results: {
            pesticides: "fail",
            moisture: "16.8%",
            contamination: "pass",
            overall: "fail",
          },
          certifiedBy: "Dr. Emily Davis",
        },
        {
          id: "R006",
          reportType: "Transport",
          sampleId: "S2024-006",
          farmerName: "Lisa Anderson",
          cropType: "Barley",
          testDate: "2024-01-10",
          status: "failed",
          results: {
            pesticides: "fail",
            moisture: "18.2%",
            contamination: "fail",
            overall: "fail",
          },
        },
      ];
      setReports(mockReports);
      console.error("Using mock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground";
      case "in-progress":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-success text-success-foreground";
      case "failed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "pass":
        return "text-success";
      case "fail":
        return "text-destructive";
      case "pending":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case "pass":
        return <CheckCircle className="h-4 w-4" />;
      case "fail":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const filteredReports = reports.filter(report =>
    report.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.sampleId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedReports = reports.filter(r => r.status === "completed").length;
  const pendingReports = reports.filter(r => r.status === "pending" || r.status === "in-progress").length;
  const passedReports = reports.filter(r => r.results.overall === "pass").length;

  const handleDownload = (reportId: string) => {
    toast({
      title: "Download Report",
      description: `Report ${reportId} download would be initiated here.`,
    });
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Reports</h1>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            Generate Report
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
          <h1 className="text-3xl font-bold text-foreground">Lab Reports</h1>
          <p className="text-muted-foreground mt-1">Track and manage all laboratory test reports</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <XCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pass Rate</p>
                <p className="text-2xl font-bold">{Math.round((passedReports / reports.length) * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search reports by farmer, crop, type, or ID..."
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
          <CardTitle>Lab Test Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sample ID</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Test Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Overall Result</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.reportType}</Badge>
                    </TableCell>
                    <TableCell>{report.sampleId}</TableCell>
                    <TableCell>{report.farmerName}</TableCell>
                    <TableCell>{report.cropType}</TableCell>
                    <TableCell>{new Date(report.testDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${getResultColor(report.results.overall)}`}>
                        {getResultIcon(report.results.overall)}
                        <span className="capitalize">{report.results.overall}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(report.id)}
                        disabled={report.status !== "completed"}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No reports found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;