
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import FirefighterSidebar from "./FirefighterSidebar";

// Lazy-loaded dashboard pages
const HomePage = lazy(() => import("@/components/pages/HomePage"));
const LogIncident = lazy(() => import("@/components/pages/LogIncident"));
const ViewIncidents = lazy(() => import("@/components/pages/ViewIncidents"));
const DrillReport = lazy(() => import("@/components/pages/DrillReport"));
const EquipmentCheck = lazy(() => import("@/components/pages/EquipmentCheck"));
const ProfilePage = lazy(() => import("@/components/pages/ProfilePage"));
const LoadingFallback = () => <div className="flex items-center justify-center h-full">Loading...</div>;

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar>
        <SidebarContent>
          <FirefighterSidebar />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex-1 bg-gray-50 p-6">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/log-incident" element={<LogIncident />} />
            <Route path="/incidents" element={<ViewIncidents />} />
            <Route path="/drill-report" element={<DrillReport />} />
            <Route path="/equipment-check" element={<EquipmentCheck />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Suspense>
      </SidebarInset>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default DashboardLayout;
