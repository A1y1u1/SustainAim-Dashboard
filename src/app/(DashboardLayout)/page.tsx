import Gchart from "@/app/(DashboardLayout)/components/dashboard/Gchart";
import Scope1 from "@/app/(DashboardLayout)/components/dashboard/Scope1";
import Waste from "@/app/(DashboardLayout)/components/dashboard/Waste";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js Sustainability Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Sustainability Dashboard Template",
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        {/* <EcommerceMetrics />
        <MonthlySalesChart /> */}
      </div>

      <div className="col-span-12 xl:col-span-5">
        <Gchart />
      </div>

      <div className="col-span-12">
        {/* <StatisticsChart /> */}
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* <DemographicCard /> */}
      </div>

      <div className="col-span-12 xl:col-span-7">
        {/* <RecentOrders /> */}
      </div>
      
      <div className="col-span-12 xl:col-span-6">
        {/* <Energy /> */}
      </div>

       <div className="col-span-12 xl:col-span-6">
        {/* <Electricity /> */}
      </div>

      <div className="col-span-12 xl:col-span-12">
        <Scope1 />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <Waste />
      </div>
     
    </div>
  );
}
