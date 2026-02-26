import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import { useAllTransactionGetQuery } from "../../../redux/features/transactionSlice";
import BarChartComponent from "./BarChart";

const DashboardHome = () => {
  const { data, isLoading, isError } = useAllTransactionGetQuery();

  // Extract meta data safely
  const totalSell = data?.data?.meta?.totalSell || "0.00";
  const totalBuy = data?.data?.meta?.totalBuy || "0.00";
  const totalEarnings = data?.data?.meta?.totalEarnings || "0.00";

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching transaction data.</p>;
  }

  return (
    <div className="space-y-[24px]">
      <h1 className="text-2xl md:text-2xl">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-32 gap-y-10">
        <div className="flex items-center justify-center gap-6 border border-black px-[24px] py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          <div className="text-center">
            <h3 className="text-[20px]">Total Sell</h3>
            <h3 className="text-[30px] font-extralight">{`€${totalSell}`}</h3>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 px-[24px] border border-black py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          <div className="text-center">
            <h3 className="text-[20px]">Total Buy</h3>
            <h3 className="text-[30px] font-extralight">{`€${totalBuy}`}</h3>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 border border-black px-[24px] py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          <div className="text-center">
            <h3 className="text-[20px]">Total Earnings</h3>
            <h3 className="text-[30px] font-extralight">{`€${totalEarnings}`}</h3>
          </div>
        </div>
      </div>

      <BarChartComponent />
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
