// import { Select } from 'antd';
// import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { useAllTransactionGetQuery } from '../../../redux/features/transactionSlice';

// const data = [
//   { name: 'Jan', uv: 4000, amt: 2400 },
//   { name: 'Feb', uv: 3000, amt: 2210 },
//   { name: 'Mar', uv: 2000, amt: 2290 },
//   { name: 'Apr', uv: 2780, amt: 2000 },
//   { name: 'May', uv: 1890, amt: 2181 },
//   { name: 'June', uv: 2390, amt: 2500 },
//   { name: 'July', uv: 3490, amt: 2100 },
//   { name: 'Aug', uv: 1490, amt: 2100 },
//   { name: 'Sep', uv: 3090, amt: 2100 },
//   { name: 'Oct', uv: 3111, amt: 2100 },
//   { name: 'Nov', uv: 1987, amt: 2100 },
//   { name: 'Dec', uv: 2490, amt: 2100 },
// ];

// const BarChartComponent = () => {

//     const { data, isLoading, isError } = useAllTransactionGetQuery();

//   const handleChange = (value) => {
//     console.log(`selected ${value}`);
//   };

//   return (
//     <div>
//       <div className='flex items-center justify-between py-7'>
//         <h1 className='text-sm md:text-2xl'>Earnings</h1>
//       <Select
//             defaultValue="2024 May"
//             style={{
//               width: 120,
//             }}
//             bordered={false}
//             suffixIcon={<MdOutlineKeyboardArrowDown color="gray" fontSize={30} />}
//             onChange={handleChange}
//             options={[
//               {
//                 value: '2024 May',
//                 label: '2024 May',
//               },
//               {
//                 value: '2024 Apr',
//                 label: '2024 Apr',
//               }
//             ]}
//           />
//       </div>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid  horizontal={true} vertical={false} />
//           <XAxis dataKey="name" />
//           <YAxis
//             tickFormatter={(value) => `${value / 1000}k`} // Converts numbers to "k" format
//           />
//           <Tooltip cursor={{fill: 'transparent'}} />
//           {/* <Legend /> */}
//           <Bar dataKey="uv" fill="#00000" barSize={40}  />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };
// export default BarChartComponent;

import { Select } from "antd";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAllTransactionGetQuery } from "../../../redux/features/transactionSlice";

const BarChartComponent = () => {
  const { data, isLoading, isError } = useAllTransactionGetQuery();

  // Extract yearly earnings from API response
  const chartData =
    data?.data?.yearlyEarnings?.map((entry) => ({
      name: entry.month,
      totalBuy: parseFloat(entry.totalBuy) || 0,
      totalSell: parseFloat(entry.totalSell) || 0,
      totalEarnings: parseFloat(entry.totalEarnings) || 0,
    })) || [];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  if (isLoading) {
    return <p>Loading chart data...</p>;
  }

  if (isError) {
    return <p>Error loading chart data.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between py-7">
        <h1 className="text-sm md:text-2xl">Earnings</h1>
        <Select
          defaultValue="2024 May"
          style={{
            width: 120,
          }}
          bordered={false}
          suffixIcon={<MdOutlineKeyboardArrowDown color="gray" fontSize={30} />}
          onChange={handleChange}
          options={[
            {
              value: "2024 May",
              label: "2024 May",
            },
            {
              value: "2024 Apr",
              label: "2024 Apr",
            },
          ]}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal={true} vertical={false} />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `€${value}`} />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="totalBuy" fill="#8884d8" barSize={40} name="Total Buy" />
          <Bar dataKey="totalSell" fill="#82ca9d" barSize={40} name="Total Sell" />
          <Bar dataKey="totalEarnings" fill="#ffc658" barSize={40} name="Total Earnings" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
