import { ArrowLeft, Camera } from "lucide-react";
import { useRef, useState } from "react";
import { useCreateReviewMutation } from "../../../redux/features/ReviewSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Rating } from "@smastrom/react-rating";

export default function AddReview() {
	const { name } = useParams();
	const [createReview] = useCreateReviewMutation();
	const [rating, setRating] = useState(0);

	const [formData, setFormData] = useState({
		name: "",
		customerName: "",
		rating: "",
		review: "",
	});

	const navigate = useNavigate();
	const [imagePreview, setImagePreview] = useState(null);
	const fileInputRef = useRef(null);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!rating) return toast.error("Rating is required");
		if (!fileInputRef.current?.files?.[0])
			return toast.error("Image is required");

		const toastId = toast.loading("Creating review...");

		const formDataX = new FormData();

		formDataX.append("customerName", formData.customerName);
		formDataX.append("rating", rating);
		formDataX.append("comment", formData.review);
		formDataX.append("product", name);

		if (fileInputRef.current?.files?.[0]) {
			formDataX.append("images", fileInputRef.current.files[0]);
		}

		try {
			await createReview(formDataX).unwrap();
		} catch (error) {
			console.error("Failed to create review:", error);
			toast.error("Failed to create review.", {
				id: toastId,
			});
		} finally {
			navigate(-1);
			toast.success("Review created successfully", { id: toastId });
		}
	};

	return (
		<div className="w-full mx-auto px-4 py-8 pr-12">
			{/* Header */}
			<button
				onClick={() => navigate(-1)}
				className="flex items-center mb-8 click"
			>
				<ArrowLeft className="h-5 w-5 mr-2" />
				<h1 className="text-xl font-medium">Reviews</h1>
			</button>

			<form onSubmit={handleSubmit}>
				<div className="flex items-start mb-8">
					{/* Image Upload */}
					<div className="mr-6 border-2 border-black rounded-full click">
						<div
							onClick={triggerFileInput}
							className="w-24 h-24 rounded-full bg-gray-100 flex flex-col items-center justify-center cursor-pointer"
						>
							{imagePreview ? (
								<img
									src={imagePreview || "/placeholder.svg"}
									alt="Profile preview"
									width={96}
									height={96}
									className="w-24 h-24 rounded-full object-cover"
								/>
							) : (
								<div className="flex items-center justify-center">
									<Camera />
								</div>
							)}
						</div>
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleImageUpload}
							accept="image/*"
							className="hidden"
						/>
					</div>
					<div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Customer Name
							</label>
							<input
								type="text"
								name="customerName"
								value={formData.customerName}
								onChange={handleInputChange}
								required
								placeholder="enter a name"
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
							/>
						</div>
						<Rating value={rating} onChange={setRating} className="w-32 mt-2" />
					</div>
				</div>

				{/* Form Fields */}
				<div className="space-y-2">
					<div>
						<label className="block text-sm font-medium mb-2">Reviews</label>
						<textarea
							name="review"
							value={formData.review}
							onChange={handleInputChange}
							placeholder="enter a description"
							rows={6}
							required
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
						/>
					</div>

					<button
						type="submit"
						className="px-4 py-2 bg-indigo-600 text-white rounded-md click"
					>
						Save Review
					</button>
				</div>
			</form>
		</div>
	);
}
