/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import { useAllProductGetQuery } from "../../../redux/features/productsSlice";
import { getBackgroundColor } from "../../../lib/productTypeColor";
import ProductCard from "../../../Components/ProductCard";

const productTypes = ["xbox", "playstation", "nintendo"];

export default function ProductPage() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const [activeTab, setActiveTab] = useState(
		productTypes.find((type) => type === searchParams.get("product_type")) ||
			productTypes[0]
	);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		params.set("product_type", activeTab);
		setSearchParams(params, {
			replace: true,
		});
	}, [activeTab, setSearchParams, searchParams]);

	const [page, setPage] = useState(1);

	const { data, isFetching, isError } = useAllProductGetQuery({
		limit: 12,
		page,
		product_type: activeTab,
		refProduct: searchParams.get("ref"),
	});

	const [view] = useState("grid");
	// Extract products from API response safely
	const products = data?.data?.products || [];
	const pagination = data?.data?.meta?.pagination || {};

	const IMAGE = import.meta.env.VITE_IMAGE_API;
	console.log(IMAGE, "image api");

	return (
		<div className="pb-[250px]">
			<div className="sticky top-0 z-10 p-4 bg-white mb-4">
				<div className="flex items-center gap-2">
					<Button
						onClick={() => navigate(-1)}
						type="link"
						icon={<ArrowLeft />}
						className="text-black text-lg"
					/>

					<div className="flex items-center flex-col py-3">
						<h3 className="text-2xl font-bold">
							{searchParams?.get("ref")
								? "Accessories of " + searchParams?.get("ref")
								: "Products"}
						</h3>
					</div>
				</div>
				{products.length > 0 && (
					<Link
						to={`/addProducts${
							searchParams.get("ref") ? "?ref=" + searchParams.get("ref") : ""
						}`}
						className="absolute top-1/2 -translate-y-1/2 right-4"
					>
						<button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md font-medium click">
							Add {searchParams.get("ref") ? "Accessories" : "Product"}
						</button>
					</Link>
				)}
			</div>
			<div className="flex flex-wrap gap-3 mt-[30px] mb-[10px] mx-10">
				{productTypes.map((tab, idx) => (
					<button
						key={idx}
						disabled={activeTab === tab}
						className={`${
							activeTab === tab
								? "font-bold  border-0 cursor-not-allowed text-white"
								: "text-gray-500 border-[#99caff] cursor-pointer border"
						} py-3 px-5 rounded-md box-border capitalize`}
						style={{
							backgroundColor: activeTab === tab && getBackgroundColor(tab),
							borderColor: activeTab !== tab && getBackgroundColor(tab),
						}}
						onClick={() => {
							setActiveTab(tab);
						}}
					>
						{tab}
					</button>
				))}
			</div>

			{isFetching ? (
				<p className="text-center text-lg">Loading products...</p>
			) : isError ? (
				<p className="text-center text-lg text-red-500">
					Error loading products.
				</p>
			) : products.length < 1 ? (
				<div className="text-center text-2xl items-center my-10 flex flex-col gap-4">
					<span>
						No {searchParams.get("ref") ? "Accessories" : "Products"} found.
					</span>
					<Link
						to={`/addProducts${
							searchParams.get("ref") ? "?ref=" + searchParams.get("ref") : ""
						}`}
						className="text-base"
					>
						<button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md font-medium click">
							Add {searchParams.get("ref") ? "Accessories" : "Product"}
						</button>
					</Link>
				</div>
			) : (
				<div className="flex flex-col lg:flex-row container mx-auto px-4 py-8">
					<div className="w-full lg:ml-6">
						<div
							className={`grid ${
								view === "grid"
									? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
									: ""
							} gap-6`}
						>
							{products.map((product) => (
								<ProductCard product={product} key={product._id} />
							))}
						</div>

						{/* Pagination */}
						{pagination?.total_pages > 1 && (
							<div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
								<button
									onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
									className={`px-4 py-2 rounded-md hover:bg-gray-300 transition ${
										page === 1 ? "cursor-not-allowed opacity-50" : "bg-gray-200"
									}`}
									disabled={page === 1}
								>
									<ChevronLeft />
								</button>
								{Array.from({ length: pagination?.total_pages }, (_, index) => (
									<button
										key={index + 1}
										onClick={() => setPage(index + 1)}
										className={`px-4 py-2 m-1 rounded-md transition ${
											page === index + 1
												? "bg-black text-white"
												: "bg-gray-200 hover:bg-gray-300"
										}`}
										style={{ minWidth: "40px" }}
									>
										{index + 1}
									</button>
								))}
								<button
									onClick={() =>
										setPage((prev) =>
											Math.min(prev + 1, pagination?.total_pages)
										)
									}
									className={`px-4 py-2 rounded-md hover:bg-gray-300 transition ${
										page === pagination?.total_pages
											? "cursor-not-allowed opacity-50"
											: "bg-gray-200"
									}`}
									disabled={page === pagination?.total_pages}
								>
									<ChevronRight />
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
