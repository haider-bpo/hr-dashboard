import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import Header from "./header";

function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="w-full h-full">
        <SidebarInset>
          <Header />
          <div className="px-4">
            <Outlet />
          </div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
