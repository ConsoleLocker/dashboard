import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
    useDeleteReviewMutation,
    useSingleReviewGetQuery,
    useUpdateReviewMutation,
} from "../../../redux/features/ReviewSlice";
import { useState } from "react";
import Swal from "sweetalert2";
import { Rating } from "@smastrom/react-rating";
import toast from "react-hot-toast";
import { Button } from "antd";

export default function ReviewSell() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { data, refetch } = useSingleReviewGetQuery({ name: "sell" });
    const [updateReview] = useUpdateReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [updatedData, setUpdatedData] = useState({ rating: 0, comment: "" });

    const reviews = data?.data?.reviews || [];
    const meta = data?.data?.meta;

    const IMAGE = import.meta.env.VITE_IMAGE_API;

    const getImageSrc = (imagePath) => {
        if (!imagePath) return "/placeholder.png";
        if (imagePath.startsWith("http")) return imagePath;
        return `${IMAGE}${imagePath}`;
    };

    const handleEditClick = (review) => {
        setSelectedReview(review);
        setUpdatedData({ rating: review.rating, comment: review.comment });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({
            ...prev,
            [name]: name === "rating" ? parseFloat(value) : value,
        }));
    };

    const handleUpdateReview = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Aggiornamento recensione...");
        if (selectedReview) {
            try {
                await updateReview({ id: selectedReview._id, review: updatedData }).unwrap();
                setIsModalOpen(false);
            } catch {
                toast.error("Aggiornamento fallito.", { id: toastId });
                return;
            }
            toast.success("Recensione aggiornata!", { id: toastId });
        }
    };

    const handleDeleteReview = async (id) => {
        const result = await Swal.fire({
            title: "Sei sicuro?",
            text: "Non potrai annullare questa operazione!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sì, elimina!",
        });
        if (result.isConfirmed) {
            try {
                await deleteReview(id).unwrap();
                Swal.fire("Eliminato!", "La recensione è stata eliminata.", "success");
                await refetch();
            } catch {
                Swal.fire("Errore!", "Impossibile eliminare la recensione.", "error");
            }
        }
    };

    return (
        <div className="w-full mx-auto pb-8">
            {/* Header */}
            <div className="sticky top-0 z-10 p-4 bg-white mb-4">
                <div className="flex items-center gap-2">
                    <Button
                        type="link"
                        icon={<ArrowLeft />}
                        onClick={() => navigate(-1)}
                        className="text-black text-lg"
                    />
                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold">Sell Reviews</h3>
                        <p>Recensioni sezione vendita</p>
                    </div>
                </div>
                {!reviews?.length || (
                    <Link
                        to="/addreview/sell"
                        className="absolute top-1/2 -translate-y-1/2 right-4"
                    >
                        <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md font-medium">
                            Aggiungi Recensione
                        </button>
                    </Link>
                )}
            </div>

            {!reviews?.length && (
                <div className="flex items-center justify-center h-[50vh]">
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-center text-4xl font-semibold">
                            Nessuna recensione ancora.
                        </h1>
                        <Link to="/addreview/sell" className="relative">
                            <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md font-medium">
                                Aggiungi Recensione
                            </button>
                            <div className="absolute -top-1 -right-1">
                                <span className="relative flex size-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-700 opacity-75"></span>
                                    <span className="relative inline-flex size-3 rounded-full bg-sky-600"></span>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                        <p className="text-sm text-gray-700 mb-4">{review.comment}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                    <img
                                        src={getImageSrc(review.customer.avatar)}
                                        alt={review.customer.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{review.customer.name}</p>
                                    <p className="text-xs text-gray-500">Sell</p>
                                </div>
                            </div>
                            <Rating value={review.rating} readOnly className="w-24" />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => handleEditClick(review)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
                            >
                                Modifica
                            </button>
                            <button
                                onClick={() => handleDeleteReview(review._id)}
                                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md font-medium"
                            >
                                Elimina
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {meta?.totalPage > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-md transition ${page === 1 ? "cursor-not-allowed opacity-50" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                        <ChevronLeft />
                    </button>
                    {Array.from({ length: meta?.totalPage }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={`px-4 py-2 rounded-md transition ${page === i + 1 ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, meta?.totalPage))}
                        disabled={page === meta?.totalPage}
                        className={`px-4 py-2 rounded-md transition ${page === meta?.totalPage ? "cursor-not-allowed opacity-50" : "bg-gray-200 hover:bg-gray-300"}`}
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Modifica Recensione</h2>
                        <form onSubmit={handleUpdateReview}>
                            <div className="mb-4">
                                <Rating
                                    value={updatedData.rating}
                                    onChange={(value) => setUpdatedData({ ...updatedData, rating: value })}
                                    className="w-32"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Commento
                                </label>
                                <textarea
                                    name="comment"
                                    value={updatedData.comment}
                                    onChange={handleInputChange}
                                    className="mt-1 h-[150px] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                                >
                                    Aggiorna
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}