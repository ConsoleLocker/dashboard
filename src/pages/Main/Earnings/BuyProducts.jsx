/* eslint-disable no-mixed-spaces-and-tabs */
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardModal from "../../../Components/DashboardModal";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Spin } from "antd";
import {
  useAllBuyProductGetQuery,
  useConfirmProductMutation,
  useProductCancleMutation,
  useSendReceiptMutation,
} from "../../../redux/features/buyProductSlice";
import toast from "react-hot-toast";

const BuyProducts = () => {
  const [query, setQuery] = useSearchParams();
  const [state, setState] = useState("pending");
  const [page, setPage] = useState(Math.max(query.get("page"), 1));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const [productCancle] = useProductCancleMutation();
  const [confirmProduct] = useConfirmProductMutation();
  const [sendReceipt] = useSendReceiptMutation();
  const { data, refetch, isFetching } = useAllBuyProductGetQuery({
    limit: 16,
    state,
    page,
  });
  const [note, setNote] = useState("");
  const products = data?.data?.products || [];

  const totalPages = data?.data?.meta?.totalPages;

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  useEffect(() => {
    setQuery({ page });
  }, [page, setQuery]);

  const showModal = (product) => {
    setModalData(product);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const productId = modalData._id;
      if (!productId) {
        toast.error("ID prodotto mancante");
        return;
      }

      await confirmProduct(productId).unwrap();

      toast.success("Prodotto Confermato!");
      setIsModalOpen(false);
      setState("confirm");
      refetch();
    } catch (error) {
      console.error("Errore Backend:", error);
      const errorMessage = error?.data?.message || "Errore durante la conferma";
      toast.error(errorMessage);
    }
  };

  const handleCancel = async () => {
    try {
      const productId = modalData._id;
      await productCancle(productId).unwrap();
      alert("Product Canceled!");
      setIsModalOpen(false);
      setState("cancel");
      refetch();
    } catch (error) {
      console.error("Failed to cancel the product:", error);
      alert("Failed to cancel the product. Please try again.");
    }
  };

  const handleFilterChange = (newFilter) => {
    setState(newFilter === "All" ? "" : newFilter.toLowerCase());
    setPage(1);
  };

  const handleMessage = async () => {
    const toastId = toast.loading("Sending thanks...");
    try {
      const productId = modalData._id;
      console.log("Sending receipt for product ID:", productId);
      const res = await sendReceipt({ id: productId, note }).unwrap();
      console.log("Receipt sent successfully:", res);
      setIsModalOpen(false);
      refetch();
      toast.success("Thanks sent successfully!", { id: toastId });
    } catch (error) {
      console.error("Failed to send receipt:", error);
      toast.error("Failed to send thanks. Please try again.", { id: toastId });
    }
  };

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  const getImageSrc = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${IMAGE}${imagePath}`;
  };

  return (
    <div>
      <div className="px-8">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <Button
              type="link"
              icon={<ArrowLeft />}
              className="text-black text-lg"
            />
          </Link>
          <h2 className="text-3xl font-semibold">Buy Product</h2>
        </div>

        <div className="flex gap-2 px-4 pt-8 items-center mb-4 w-full mx-auto">
          {["", "pending", "confirm", "cancel"].map((f) => (
            <button
              key={f}
              className={`${state === f ? "bg-[#101010] text-white" : "bg-gray-50"
                } hover:bg-black hover:text-white px-4 py-2 rounded-full capitalize`}
              onClick={() => handleFilterChange(f)}
            >
              {f || "all"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full mx-auto px-4 py-8">
        <div className="w-full lg:ml-6">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="shadow-md rounded-lg pb-2 relative"
              >
                <img
                  src={getImageSrc(product?.product?.image)}
                  alt={product?.product?.name || "Default"}
                  className="w-full h-48 object-cover"
                />
                <div className="px-3">
                  <div className="flex justify-between items-center mt-4 mb-2">
                    <h3 className="text-lg font-semibold">
                      {product?.product?.name}
                    </h3>
                    <span className="text-green-500 font-semibold">
                      ${product?.price}
                    </span>
                  </div>
                  <hr className="mb-3 pt-2" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        className="size-10"
                        src={product?.customer?.avatar || "/users.png"}
                        alt={product?.customer?.name}
                      />
                      <div>
                        <h1>{product?.customer?.name}</h1>
                        <p className="text-sm">
                          {new Date(product?.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="text-[#222C9B] px-5 py-2 bg-blue-100 text-sm rounded-3xl">
                      {product?.state}
                    </button>
                  </div>
                  <button
                    onClick={() => showModal(product)}
                    className="bg-[#101010] w-full py-4 rounded-lg text-white font-normal mt-6"
                  >
                    Product Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 my-12">
            <button
              title="Previous"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={`w-10 h-10 flex items-center justify-center bg-transparent ${page === 1 && "cursor-not-allowed"
                }`}
            >
              <ChevronLeft />
            </button>
            {isFetching ? (
              <Spin size="small" />
            ) : (
              Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md ${page === pageNumber
                      ? "bg-black text-white"
                      : "bg-transparent border-2 border-[#101010]"
                      } ${page === pageNumber && "cursor-not-allowed"}`}
                  >
                    {pageNumber}
                  </button>
                )
              )
            )}

            <button
              title="Next"
              onClick={() => setPage(Math.min(page + 1, totalPages))}
              className={`w-10 h-10 flex items-center justify-center bg-transparent ${page === totalPages && "cursor-not-allowed"
                }`}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && modalData && (
        <DashboardModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          maxWidth="500px"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Product Details
            </h2>
            <div className="flex justify-between items-center bg-blue-50 rounded-md p-4 mb-8 shadow-sm">
              <div>
                <h3 className="text-xl font-medium">
                  {modalData?.product?.name}
                </h3>
                <p className="text-gray-600 flex items-center mt-2">
                  <img
                    src={modalData?.customer?.avatar}
                    alt="Seller"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-medium">
                    {modalData?.customer?.name}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold text-gray-800">
                  ${modalData?.price}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(modalData?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mb-6 flex flex-col gap-4">
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                type="text"
                className="border-2 rounded-lg w-full px-2 py-2 "
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMessage();
                }}
                className="bg-[#101010] text-white px-4 py-2 rounded-full"
              >
                send message
              </button>
            </div>
            <h3 className="text-lg font-semibold mb-4">Product Information</h3>
            <div className="grid grid-cols-2 gap-y-4 text-gray-700 mb-8">
              {modalData.information.map((info, index) => (
                <div key={index}>
                  <p className="font-medium">{info?.ques}</p>
                  <p>{info?.value}</p>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
            <div className="grid grid-cols-2 gap-y-4 text-gray-700 mb-8">
              {modalData?.payment?.paypal && (
                <>
                  <p className="font-medium">Paypal</p>
                  <p className="text-sm">{modalData?.payment?.paypal}</p>
                </>
              )}
              {modalData?.payment?.iban && (
                <>
                  <p className="font-medium">iban</p>
                  <p className="text-sm">{modalData?.payment?.iban}</p>
                </>
              )}
              <p className="font-medium">Phone</p>
              <p className="text-sm">{modalData?.customer?.phone}</p>
              <p className="font-medium">Email</p>
              <p className="text-sm">{modalData?.customer?.email}</p>
            </div>
            <div className="grid grid-cols-1 gap-y-2 text-gray-700 mb-8 bg-gray-50 p-3 rounded-lg border">
              {modalData?.payment?.paypal ? (
                <div className="flex justify-between items-center">
                  <p className="font-medium text-blue-600">Email PayPal:</p>
                  <p className="text-sm font-bold">{modalData.payment.paypal}</p>
                </div>
              ) : null}

              {modalData?.payment?.iban ? (
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-green-700">IBAN / Dati Bancari:</p>
                  <p className="text-sm bg-white p-2 border rounded font-mono">
                    {modalData.payment.iban}
                  </p>
                </div>
              ) : null}

              {!modalData?.payment?.paypal && !modalData?.payment?.iban && (
                <p className="text-red-500 italic text-sm">
                  ⚠️ Nessun dato di pagamento fornito dall'utente.
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="w-full border-red text-red py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="w-full py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </DashboardModal>
      )}
    </div>
  );
};

export default BuyProducts;
