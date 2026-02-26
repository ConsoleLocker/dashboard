/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./ui/Modal";
import { useSetRelatedProductsMutation } from "../redux/features/productsSlice";
import toast from "react-hot-toast";

export const RelatedProduct = ({ product }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [setRelatedProducts] = useSetRelatedProductsMutation();

	async function handleSubmit(e) {
		e.preventDefault();
		const toastId = toast.loading("Updating related products...");

		try {
			const relatedProducts = [...new Set([...new FormData(e.target).values()])]
				.map((value) => value.trim())
				.splice(0, 4);

			await setRelatedProducts({ name: product.name, relatedProducts });

			toast.success("Related products updated successfully", { id: toastId });
		} catch (error) {
			console.log(error);
			toast.error("Failed to update related products", { id: toastId });
		}
	}

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				type="button"
				className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
			>
				Related Products
			</button>
			<Modal open={isOpen} setOpen={setIsOpen}>
				<form
					onSubmit={handleSubmit}
					className="border border-black bg-white/50 rounded-md p-4 backdrop-blur-3xl flex gap-4 flex-col"
				>
					<h2 className="text-2xl text-center">
						Related Products of {product?.name}
					</h2>

					{["1st", "2nd", "3rd", "4th"].map((label, index) => (
						<input
							key={index}
							type="text"
							defaultValue={product?.relatedProducts?.[index]}
							className="w-full rounded-md py-2 px-4 focus:outline-none"
							placeholder={`${label} related product`}
							name={`r${index + 1}`}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									const form = e.target.form;
									const index = Array.prototype.indexOf.call(form, e.target);
									form.elements[index + 1]?.focus();
								}
							}}
						/>
					))}

					<button
						type="submit"
						className="bg-[#101010] px-6 py-3 rounded-lg font-normal text-white"
						title="Save"
					>
						Save
					</button>
				</form>
			</Modal>
		</>
	);
};
