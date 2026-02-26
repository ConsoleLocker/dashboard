import baseApi from "../api/baseApi";

export const productsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		allProductGet: builder.query({
			query: ({ limit, product_type, page, refProduct }) => {
				let queryParams = new URLSearchParams();

				if (limit) queryParams.append("limit", limit.toString());

				if (product_type) queryParams.append("product_type", product_type);

				if (page) queryParams.append("page", page);

				if (refProduct) queryParams.append("product_ref", refProduct);

				return `products?${queryParams.toString()}`;
			},
			providesTags: ["Products"],
		}),

		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `/admin/product/${id}/delete`,
				method: "DELETE",
			}),
			invalidatesTags: ["Products"],
		}),

		deleteProductByName: builder.mutation({
			query: (name) => ({
				url: `/admin/product/delete/${name}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Products"],
		}),

		addProduct: builder.mutation({
			query: ({ product, refProduct = null }) => ({
				url: `/admin/product${
					refProduct ? `/${refProduct}/variant` : ""
				}/create`,
				method: "POST",
				body: product,
			}),
			invalidatesTags: ["Products"],
		}),

		editProduct: builder.mutation({
			query: ({ slug, formData }) => ({
				url: `/admin/product/${slug}/edit`,
				method: "PATCH",
				body: formData,
			}),
			invalidatesTags: ["Products"],
		}),

		singleProductGet: builder.query({
			query: ({ slug }) => ({
				url: `/products/${slug}`,
				method: "GET",
			}),
			providesTags: ["Products"],
		}),

		productByName: builder.query({
			query: ({ name }) => ({
				url: `/products/name/${name}`,
				method: "GET",
			}),
			providesTags: ["Products", name],
		}),

		updateProduct: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/appointment/update-appointment/${id}/edit`,
				method: "PATCH",
				body: formData,
			}),
			invalidatesTags: ["Products"],
		}),

		productInfo: builder.query({
			query: () => ({
				url: "/config-attr",
				method: "GET",
			}),
			providesTags: ["Product-info"],
		}),

		updateProductInfo: builder.mutation({
			query: (info) => ({
				url: "/admin/config-attr/set",
				method: "POST",
				body: info,
			}),
			invalidatesTags: ["Product-info"],
		}),

		updateProductLabel: builder.mutation({
			query: ({ name, data }) => ({
				url: `/admin/product/label/edit/${name}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Products"],
		}),

		setRelatedProducts: builder.mutation({
			query: ({ name, relatedProducts }) => ({
				url: `/admin/product/related-products/${name}`,
				method: "PATCH",
				body: { relatedProducts },
			}),
			invalidatesTags: ["Products"],
		}),
	}),
});

export const {
	useAllProductGetQuery,
	useAddProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useSingleProductGetQuery,
	useEditProductMutation,
	useProductByNameQuery,
	useProductInfoQuery,
	useUpdateProductInfoMutation,
	useDeleteProductByNameMutation,
	useUpdateProductLabelMutation,
	useSetRelatedProductsMutation,
} = productsApi;
