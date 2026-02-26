/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from "../Components/ui/Modal";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useUpdateProductLabelMutation } from "../redux/features/productsSlice";
import toast from "react-hot-toast";

export default function Specification({ product }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [specifications, setSpecifications] = useState([]);

	useEffect(() => {
		try {
			if (product?.specifications)
				setSpecifications(
					Object.entries(JSON.parse(product?.specifications)).map(
						([key, value]) => ({ key, value })
					)
				);
		} catch (error) {
			console.log(error);
		}
	}, [product]);

	const [updateLabel] = useUpdateProductLabelMutation();

	function handleAddSpecification() {
		setSpecifications([...specifications, { key: "", value: "" }]);
	}

	function handleDeleteSpecification(index) {
		setSpecifications(specifications.filter((_, i) => i !== index));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const toastId = toast.loading("Updating specification...");
		const data = specifications.reduce((acc, spec) => {
			if (spec.key.trim() && spec.value.trim()) {
				acc[spec.key.trim()] = spec.value.trim();
			}
			return acc;
		}, {});

		try {
			await updateLabel({
				name: product.name,
				data: {
					specifications: JSON.stringify(data),
				},
			}).unwrap();
			toast.success("Specification updated successfully", { id: toastId });
		} catch (error) {
			toast.error("Failed to update specification", { id: toastId });
			console.log(error);
		}
	}

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				type="button"
				className="px-4 py-2 bg-pink-500 text-white rounded-md click w-fit"
			>
				Specification
			</button>
			<Modal open={isModalOpen} setOpen={setIsModalOpen}>
				<form
					onSubmit={handleSubmit}
					className="border border-black bg-white/50 rounded-md p-4 backdrop-blur-3xl flex gap-4 flex-col"
				>
					<h2 className="text-2xl text-center">
						Specification of {product?.name}
					</h2>
					{specifications.map((spec, index) => (
						<div key={index} className="flex min-w-full">
							<button
								type="button"
								className="click text-red mr-2"
								onClick={() => handleDeleteSpecification(index)}
							>
								<MdDelete />
							</button>
							<div className="resize-model">
								<input
									type="text"
									placeholder="key"
									className="rounded-l-md px-4 py-2 w-full"
									value={spec.key}
									onChange={(e) =>
										setSpecifications((prevSpecs) =>
											prevSpecs.map((s, i) =>
												i === index ? { ...s, key: e.target.value } : s
											)
										)
									}
								/>
							</div>
							<div className="resize-model grow">
								<input
									type="text"
									placeholder="value"
									className="rounded-r-md border-l px-4 py-2 w-full"
									value={spec.value}
									onChange={(e) =>
										setSpecifications((prevSpecs) =>
											prevSpecs.map((s, i) =>
												i === index ? { ...s, value: e.target.value } : s
											)
										)
									}
								/>
							</div>
						</div>
					))}
					<div className="flex gap-3 flex-wrap">
						<button
							type="button"
							className="px-4 py-2 bg-sky-400 text-white rounded-md"
							onClick={handleAddSpecification}
						>
							<IoMdAdd className="inline-block mr-1" /> Add New Specification
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-pink-400 text-white rounded-md"
						>
							Save
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
}
