import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Edit, Trash2, User } from "lucide-react";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    location?: string;
    status?: "active" | "inactive" | "pending";
    type?: "farmer" | "customer";
    farmSize?: string;
    crops?: string[];
    purchaseHistory?: number;
    totalPurchases?: number;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "inactive":
        return "bg-muted text-muted-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 border-border/50 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{user.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {user.status && (
                  <Badge variant="secondary" className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                )}
                {user.type && (
                  <Badge variant="outline" className="text-xs">
                    {user.type}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {user.email && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{user.email}</span>
            </div>
          )}
          
          {user.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span className="text-sm">{user.phone}</span>
            </div>
          )}
          
          {user.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{user.location}</span>
            </div>
          )}
        </div>

        {/* Farmer specific info */}
        {user.type === "farmer" && (
          <div className="bg-accent/30 rounded-lg p-3 mb-4">
            {user.farmSize && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Farm Size:</span> {user.farmSize}
              </p>
            )}
            {user.crops && user.crops.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-foreground mb-1">Crops:</p>
                <div className="flex flex-wrap gap-1">
                  {user.crops.map((crop, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Customer specific info */}
        {user.type === "customer" && user.totalPurchases && (
          <div className="bg-accent/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Total Purchases:</span> ${user.totalPurchases.toLocaleString()}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user.id)}
              className="h-8"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(user.id)}
              className="h-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;