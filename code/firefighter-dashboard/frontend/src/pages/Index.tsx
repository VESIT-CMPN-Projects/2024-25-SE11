
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoginPage from "@/components/auth/LoginPage";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn ? (
        <SidebarProvider>
          <DashboardLayout />
        </SidebarProvider>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Index;
