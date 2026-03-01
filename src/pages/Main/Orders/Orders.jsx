import { useEffect, useState } from "react";
import { Table, Button, Pagination, Input, Modal, Form } from "antd";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useAllManageOrdersQuery,
  useOrderDetailsQuery,
  useSendReceipt0Mutation,
  useShipOrderMutation,
  useSyncOrderPaymentMutation,
} from "../../../redux/features/manageOrderSlice";
import toast from "react-hot-toast";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data } = useAllManageOrdersQuery({
    page: currentPage,
    limit: pageSize,
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [shipOrder] = useShipOrderMutation();
  const [sendReceipt] = useSendReceipt0Mutation();
  const [syncOrderPayment] = useSyncOrderPaymentMutation();

  const { data: orderDetails, isFetching } = useOrderDetailsQuery(
    selectedOrder,
    { skip: !selectedOrder },
  );

  useEffect(() => {
    setReceiptNumber(orderDetails?.data?.receipt);
  }, [orderDetails]);

  const handleFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleShipOrder = async (orderId) => {
    const toastId = toast.loading("Shipping order...");
    try {
      await shipOrder(orderId).unwrap();
      setIsModalVisible(false);
      toast.success("Order shipped successfully", { id: toastId });
    } catch (err) {
      toast.error("Failed to ship the order.", { id: toastId });
    }
  };

  const handleSendReceipt = async () => {
    if (!receiptNumber) {
      toast.error("Please enter a receipt number.");
      return;
    }

    const toastId = toast.loading("Sending receipt...");

    try {
      await sendReceipt({
        orderId: selectedOrder,
        receipt: receiptNumber,
      }).unwrap();
      setIsModalVisible(false);
      toast.success("Order receipt sent successfully", { id: toastId });
    } catch (err) {
      toast.error("Failed to send order receipt.", { id: toastId });
    }
  };

  const handleSyncPayment = async (orderId) => {
    const toastId = toast.loading("Syncing payment status...");
    try {
      await syncOrderPayment(orderId).unwrap();
      toast.success("Order status synced successfully", { id: toastId });
    } catch (err) {
      toast.error("Failed to sync status. Order might not have a transaction yet.", { id: toastId });
    }
  };

  const showOrderDetails = (record) => {
    const id = record._id || record.id;
    if (!id) {
      console.error("L'ordine non ha un ID valido!", record);
      return;
    }
    setSelectedOrder(id);
    setIsModalVisible(true);
  };

  const filteredOrders =
    statusFilter === "All"
      ? data?.data?.orders || []
      : data?.data?.orders.filter((order) => order.state === statusFilter);

  const totalOrders = data?.data?.meta?.total || 0;

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  const getImageSrc = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${IMAGE}${imagePath}`;
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "productDetails",
      key: "productDetails",
      render: (productDetails, record) => (
        <div className="flex items-center gap-4">
          <img
            src={getImageSrc(productDetails[0]?.product?.images[0])}
            alt="Product"
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <p className="font-medium">
              {productDetails[0]?.product?.name || "Unknown Product"}
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(record.createdAt).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => <span>{customer?.name || "Unknown Customer"}</span>,
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction",
      key: "transaction",
      render: (transaction) => (
        <span>{transaction?.transaction_id || "N/A"}</span>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `€${amount}`,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state) => (
        <span
          className={`px-3 py-1 rounded-full text-sm ${state === "success"
            ? "bg-green-100 text-green-600"
            : state === "pending"
              ? "bg-blue-100 text-blue-600"
              : state === "cancel"
                ? "bg-pink-100 text-pink-600"
                : "bg-yellow-100 text-yellow-600"
            }`}>
          {state}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => showOrderDetails(record)}
        >
          Info
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <Button
              type="link"
              icon={
                <span className="material-icons">
                  <ArrowLeft />
                </span>
              }
              className="text-black text-lg"
            />
          </Link>
          <h2 className="text-3xl font-semibold">Order Product List</h2>
        </div>
        <span className="text-lg font-medium">
          Total: <span className="text-black">{data?.data?.meta?.total}</span>
        </span>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["All", "pending", "shipped", "success", "cancel"].map((status) => (
          <Button
            key={status}
            onClick={() => handleFilter(status)}
            className={`px-4 py-1 rounded-full ${statusFilter === status
              ? "bg-black text-white"
              : "bg-gray-100 text-black"
              }`}>
            {status}
          </Button>
        ))}
      </div>

      {/* Table */}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredOrders}
        pagination={false}
        className="rounded-lg"
      />

      <div className="flex justify-between items-center mt-6">
        <Pagination
          current={currentPage}
          total={totalOrders}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          className="flex-1"
        />
        <div className="flex items-center gap-2">
          <span>Page</span>
          <Input
            value={currentPage}
            onChange={(e) =>
              setCurrentPage(
                Math.min(
                  Math.max(Number(e.target.value), 1),
                  Math.ceil(totalOrders / pageSize),
                ),
              )
            }
            className="w-12 text-center border rounded-md"
          />
          <span>of {Math.ceil(totalOrders / pageSize)}</span>
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal
        title="Order Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="ship"
            type="primary"
            onClick={() => handleShipOrder(selectedOrder)}
            disabled={orderDetails?.data?.state === "shipped"}>
            {orderDetails?.data?.state}
          </Button>,
          orderDetails?.data?.state === "pending" && (
            <Button
              key="sync"
              onClick={() => handleSyncPayment(selectedOrder)}
              style={{ backgroundColor: "#1890ff", color: "white" }}>
              Sync Status
            </Button>
          ),
        ]}>
        {orderDetails?.data ? (
          <div className="grid grid-cols-1 gap-2">
            <p>
              <strong>Cliente:</strong>{" "}
              {orderDetails.data.customer?.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {orderDetails.data.customer?.email || "N/A"}
            </p>

            <div className="mt-2 pt-2 border-t">
              <p>
                <strong>Indirizzo:</strong> {orderDetails.data.address?.address}
              </p>
              <p>
                <strong>Città:</strong> {orderDetails.data.address?.city} (
                {orderDetails.data.address?.zip_code})
              </p>
              <p>
                <strong>Paese:</strong> {orderDetails.data.address?.country}
              </p>
            </div>

            {orderDetails.data.secondary_phone && (
              <p>
                <strong>Tel.:</strong> {orderDetails.data.secondary_phone}
              </p>
            )}

            {Object.values(
              (orderDetails?.data?.productDetails || []).reduce((acc, item) => {
                const id = item.product?._id;
                if (acc[id]) {
                  acc[id] = {
                    ...acc[id],
                    quantity: acc[id].quantity + item.quantity,
                  };
                } else {
                  acc[id] = { ...item };
                }
                return acc;
              }, {}),
            ).map((item, index) => (
              <div
                key={item.product?._id || index}
                className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.product?.name} {item.product?.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantità:{" "}
                      <span className="text-gray-900 font-medium">
                        {item.quantity}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium">
                    €{item.price?.toFixed(2)} cad.
                  </p>
                  <p className="font-bold text-indigo-600">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {orderDetails?.data?.tradeInPaymentMethod &&
              orderDetails?.data?.tradeInPaymentDetails && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-semibold text-yellow-800 mb-1">
                    Trade-In Payment
                  </p>
                  <p>
                    <strong>Metodo:</strong>{" "}
                    <span className="uppercase">
                      {orderDetails.data.tradeInPaymentMethod}
                    </span>
                  </p>
                  <p className=" text-sm mt-1  break-all">
                    {orderDetails.data.tradeInPaymentDetails}
                  </p>
                </div>
              )}
            <div className="mt-6 pt-4 border-t border-dashed flex justify-between items-center">
              <span className="text-xl font-bold text-gray-700">
                Totale Ordine:
              </span>
              <span className="text-2xl font-extrabold text-indigo-700">
                €{orderDetails?.data?.amount?.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <p>Caricamento dati...</p>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
