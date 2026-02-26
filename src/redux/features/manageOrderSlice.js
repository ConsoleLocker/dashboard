import baseApi from "../api/baseApi";

export const manageOrderApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		allManageOrders: builder.query({
			query: ({ page, limit }) => {
				const queryParams = new URLSearchParams();
				if (page) queryParams.append("page", page);
				if (limit) queryParams.append("limit", limit);
				return {
					url: `/admin/order?${queryParams.toString()}`,
					method: "GET",
				};
			},
			providesTags: ["Orders"],
		}),

		orderDetails: builder.query({
			query: (arg) => {
				// Estraiamo l'ID sia che tu passi una stringa, sia un oggetto
				const id = typeof arg === 'string' ? arg : arg?.orderId;

				return {
					url: `/admin/order/${id}`,
					method: "GET",
				};
			},
			providesTags: ["Orders"],
		}),

		shipOrder: builder.mutation({
			query: (orderId) => ({
				url: `/admin/order/${orderId}/shipped`,
				method: "POST",
			}),
			invalidatesTags: ["Orders"],
		}),

		sendReceipt0: builder.mutation({
			query: ({ receipt, orderId }) => ({
				url: "/admin/order/send-receipt",
				method: "POST",
				body: { receipt, orderId },
			}),
			invalidatesTags: ["Orders"],
		}),
	}),
});

export const {
	useAllManageOrdersQuery,
	useShipOrderMutation,
	useSendReceipt0Mutation,
	useOrderDetailsQuery,
} = manageOrderApi;
