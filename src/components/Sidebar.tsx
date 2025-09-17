import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Wheat, 
  FileText,
  ChevronRight 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Farmers",
    url: "/farmers",
    icon: Users,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: UserCheck,
  },
  {
    title: "Harvests",
    url: "/harvests",
    icon: Wheat,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClasses = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-sidebar-accent text-sidebar-primary font-medium border-r-2 border-sidebar-primary" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";
  };

  return (
    <Sidebar className="transition-all duration-300">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup className="py-6">
          <SidebarGroupLabel className="text-sidebar-foreground/70 px-4 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all duration-200 ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{item.title}</span>
                      {isActive(item.url) && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;