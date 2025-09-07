import { ChartAreaInteractive } from "@/components/dashboard/dashboard-chart-area";
import { SectionCards } from "@/components/dashboard/dashboard-section-cards";
import { DataTable } from "@/components/dashboard/dashboard-data-table";
import data from "@/store/data.json";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div>
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
