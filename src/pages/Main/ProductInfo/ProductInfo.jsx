import { Button, Input, message } from "antd";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
	useProductInfoQuery,
	useUpdateProductInfoMutation,
} from "../../../redux/features/productsSlice";
import { useEffect, useState } from "react";

const ProductInfo = () => {
	const { data } = useProductInfoQuery({});
	const [editInfo] = useUpdateProductInfoMutation();

	const [info, setInfo] = useState({});

	useEffect(() => {
		if (!data) return;

		setInfo(data?.data);
	}, [data]);

	const handleEditInfo = async () => {
		try {
			const data = await editInfo(info).unwrap();

			message.success(data?.message);
		} catch (err) {
			message.error(err?.data?.message ?? "Fail to edit product info");
		}
	};

	return (
		<div className="bg-white p-8">
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-2">
					<Link to={"/"}>
						<Button
							type="link"
							icon={<ArrowLeft />}
							className="text-black text-lg"
						/>
					</Link>
					<h2 className="text-3xl font-semibold">Edit Product Info</h2>
				</div>
			</div>
			<div className="flex flex-col gap-6">
				{["Model", "Controller", "Condition", "Memory"].map((item, idx) => (
					<div key={idx}>
						<label className="block text-sm font-medium mb-1">{item}</label>
						<Input
							name={item.toLowerCase()}
							placeholder={`Enter a ${item.toLowerCase()}`}
							type="text"
							className="w-full h-10"
							value={info[item.toLowerCase()]}
							onChange={({ target }) =>
								setInfo({ ...info, [target.name]: target.value })
							}
						/>
					</div>
				))}
			</div>
			<div className="flex justify-end gap-4 mt-6">
				<Button
					type="primary"
					onClick={handleEditInfo}
					className="bg-black text-white py-3"
				>
					Save Info
				</Button>
			</div>
		</div>
	);
};

export default ProductInfo;
