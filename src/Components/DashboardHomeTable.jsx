



// import { useState } from "react";
// import { Table, Modal, Button } from "antd";
// import exlamIcon from "../assets/images/exclamation-circle.png";
// import { useAllTransactionGetQuery } from "../redux/features/transactionSlice";

// const DashboardHomeTable = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);

//   const { data, isLoading, isError } = useAllTransactionGetQuery();

//   // Extract transactions safely from API response
//   const transactions = data?.data?.transactions || [];

//   const showModal = (transaction) => {
//     setSelectedTransaction(transaction);
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setSelectedTransaction(null);
//   };

//   const columns = [
//     {
//       title: "#SI",
//       dataIndex: "index",
//       key: "index",
//       render: (_, __, index) => index + 1,
//     },

//     {
//       title: "Name",
//       dataIndex: ["customer", "name"],
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: ["customer", "email"],
//       key: "email",
//     },
//     {
//       title: "Address",
//       dataIndex: ["customer", "address", "address"],
//       key: "address",
//     },

//     {
//       title: "Action",
//       key: "action",
//       align: "center",
//       render: (_, record) => (
//         <Button type="link" onClick={() => showModal(record)}>
//           <img src={exlamIcon} alt="Review" className="w-5 h-5 cursor-pointer" />
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
//       <h3 className="text-2xl text-black mb-4 pl-2">Transactions History</h3>

//       {isLoading ? (
//         <p>Loading transactions...</p>
//       ) : isError ? (
//         <p>Error loading transactions.</p>
//       ) : (
//         <Table
//           columns={columns}
//           dataSource={transactions}
//           pagination={{ position: ["bottomCenter"] }}
//           className="rounded-lg"
//           rowKey="_id"
//         />
//       )}

//       {/* Modal */}
//       <Modal
//         title={
//           <div className="flex justify-between items-center">
//             <span className="text-lg font-semibold text-center">Transaction Details</span>
//           </div>
//         }
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//         className="custom-modal"
//       >
//         {selectedTransaction && (
//           <div className="flex flex-col gap-4">
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">Transaction ID:</span>
//               <span className="text-gray-800">{selectedTransaction.transaction_id}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">Date:</span>
//               <span className="text-gray-800">{new Date(selectedTransaction.createdAt).toLocaleDateString()}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">User Name:</span>
//               <span className="text-gray-800">{selectedTransaction.customer?.name}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">Email:</span>
//               <span className="text-gray-800">{selectedTransaction.customer?.email}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">Transaction Amount:</span>
//               <span className="text-gray-800">${selectedTransaction.amount.toFixed(2)}</span>
//             </div>

//             {/* Download Button */}
//             <Button className="bg-[#101010] py-6 text-white w-full hover:bg-gray-800">
//               Download
//             </Button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default DashboardHomeTable;

import { useState } from "react";
import { Table, Modal, Button } from "antd";
import exlamIcon from "../assets/images/exclamation-circle.png";
import { useAllTransactionGetQuery } from "../redux/features/transactionSlice";

const DashboardHomeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { data, isLoading, isError } = useAllTransactionGetQuery();

  // Extract transactions safely from API response
  const transactions = data?.data?.transactions || [];

  const showModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleDownload = () => {
    if (!selectedTransaction) return;

    // Format the transaction details into a string
    const transactionDetails = `
Transaction ID: ${selectedTransaction.transaction_id}
Date: ${new Date(selectedTransaction.createdAt).toLocaleDateString()}
User Name: ${selectedTransaction.customer?.name}
Email: ${selectedTransaction.customer?.email}
Transaction Amount: $${selectedTransaction.amount.toFixed(2)}
    `;

    // Create a Blob with the transaction details
    const blob = new Blob([transactionDetails], { type: 'text/plain' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transaction_${selectedTransaction.transaction_id}.txt`;

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },

    {
      title: "Name",
      dataIndex: ["customer", "name"],
      key: "name",
    },
    {
      title: "Email",
      dataIndex: ["customer", "email"],
      key: "email",
    },
    {
      title: "Address",
      dataIndex: ["customer", "address", "address"],
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          <img src={exlamIcon} alt="Review" className="w-5 h-5 cursor-pointer" />
        </Button>
      ),
    },
  ];

  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Transactions History</h3>

      {isLoading ? (
        <p>Loading transactions...</p>
      ) : isError ? (
        <p>Error loading transactions.</p>
      ) : (
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={{ position: ["bottomCenter"] }}
          className="rounded-lg"
          rowKey="_id"
        />
      )}

      {/* Modal */}
      <Modal
        title={
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-center">Transaction Details</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
      >
        {selectedTransaction && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Transaction ID:</span>
              <span className="text-gray-800">{selectedTransaction.transaction_id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Date:</span>
              <span className="text-gray-800">{new Date(selectedTransaction.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">User Name:</span>
              <span className="text-gray-800">{selectedTransaction.customer?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{selectedTransaction.customer?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Transaction Amount:</span>
              <span className="text-gray-800">€{selectedTransaction.amount.toFixed(2)}</span>
            </div>

            {/* Download Button */}
            <Button
              className="bg-[#101010] py-6 text-white w-full hover:bg-gray-800"
              onClick={handleDownload}
            >
              Download
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardHomeTable;