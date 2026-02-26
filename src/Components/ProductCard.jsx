/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Info, Save } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import {
	useAllProductGetQuery,
	useDeleteProductByNameMutation,
	useUpdateProductLabelMutation,
} from "../redux/features/productsSlice";
import Swal from "sweetalert2";
import { useState } from "react";
import { RelatedProduct } from "./RelatedProduct";

const IMAGE = import.meta.env.VITE_IMAGE_API;

const getImageSrc = (imagePath) => {
	if (!imagePath) return "/placeholder.png";
	if (imagePath.startsWith("http")) {
		return imagePath;
	}
	return `${IMAGE}${imagePath}`;
};

export default function ProductCard({ product }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const { refetch } = useAllProductGetQuery({
		limit: 1,
		page: 1,
		product_type: "",
	});
	const [updateLabel] = useUpdateProductLabelMutation();
	const [deleteProduct] = useDeleteProductByNameMutation();
	const [openPopup, setOpenPopup] = useState(false);

	const handleDeleteProduct = async (productName) => {
		try {
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			});

			if (result.isConfirmed) {
				// Call the deleteProduct mutation
				await deleteProduct(productName).unwrap();

				// Show success message
				Swal.fire({
					title: "Deleted!",
					text: "Your product has been deleted.",
					icon: "success",
				});
				await refetch();

				// Optionally, you can refetch the products list here if needed
				// refetch();
			}
		} catch (error) {
			// Handle error
			Swal.fire({
				title: "Error!",
				text: "An error occurred while deleting the product.",
				icon: "error",
			});
			console.error("Error deleting product:", error);
		}
	};

	return (
		<div key={product._id} className="shadow rounded-lg pb-2 relative">
			<div className="relative">
				<img
					src={getImageSrc(product.images[0])}
					alt={product.name}
					className="w-full aspect-square object-center rounded-t-lg"
				/>
				{product?.order > 0 && product?.order < Number.MAX_SAFE_INTEGER - 1 && (
					<span className="absolute top-0 right-0 bg-black/20 backdrop-blur-sm px-4 py-1 font-bold rounded-bl-2xl text-[14px] text-white drop-shadow-md">
						{product?.order}
					</span>
				)}
			</div>
			<div className="px-3">
				<h3 className="text-lg font-semibold mb-2 mt-5">{product.name}</h3>
				<div className="text-gray-600 mb-2 flex items-center justify-between">
					<div>
						Condition:{" "}
						<span className="font-semibold">{product.condition}</span>
					</div>
					<div className="relative">
						<Info
							className="cursor-pointer"
							onClick={() => setOpenPopup(!openPopup)}
						/>
						{openPopup && (
							<div className="absolute right-0 top-6 bg-white shadow-lg rounded-md py-2 w-32 z-[99]">
								<form
									onClick={(e) => e.stopPropagation()}
									onSubmit={async (e) => {
										e.preventDefault();
										const order = parseInt(e.target.order.value);
										try {
											await updateLabel({
												name: product.name,
												data: { order },
											}).unwrap();
										} catch (error) {
											toast.error(error.message);
										}
									}}
									className="flex gap-2 px-4 py-2 w-full relative"
								>
									<input
										type="number"
										name="order"
										placeholder="Order"
										defaultValue={
											product?.order > 0 &&
											product?.order < Number.MAX_SAFE_INTEGER - 1 &&
											product?.order
										}
										className="border border-gray-800 rounded-md w-full pl-2"
									/>
									<button
										type="submit"
										className="click hover:text-blue-500 transition"
									>
										<Save />
									</button>
								</form>
								<Link to={`/addEditProducts/${product?.name}`}>
									<button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
										Variant
									</button>
								</Link>
								{!searchParams?.get("ref") && (
									<button
										onClick={() => {
											const params = new URLSearchParams(searchParams);
											params.set("ref", product?.name);
											setSearchParams(params);
										}}
										className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
									>
										Accessories
									</button>
								)}
								<RelatedProduct product={product} />
								<Link to={`/review/${product?.name}`}>
									<button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
										Review
									</button>
								</Link>
								<button
									onClick={() => handleDeleteProduct(product?.name)}
									className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-500"
								>
									Delete
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="flex items-center gap-3 text-[#2B2B2B] mb-4">
					<div className="flex items-center gap-2">
						<p>Price:</p>
						<span className="text-green-500 font-semibold">
							€{product.offer_price || product.price}
						</span>
					</div>
					{product.offer_price && (
						<span className="line-through">€{product.price}</span>
					)}
				</div>
			</div>
		</div>
	);
}
