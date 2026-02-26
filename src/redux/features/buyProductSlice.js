import baseApi from "../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBuyProductGet: builder.query({
      query: ({ limit, state, page }) => {
        let queryParams = new URLSearchParams();
        if (limit) queryParams.append("limit", limit.toString());
        if (state) queryParams.append("state", state.toString());
        if (page) queryParams.append("page", page.toString());
        return `/admin/buy?${queryParams.toString()}`;
      },
      providesTags: ["Buy"],
    }),

    productCancle: builder.mutation({
      query: (id) => ({
        url: `/admin/buy/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["Buy"],
    }),

    confirmProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/buy/${id}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["Buy"],
    }),
    sendReceipt: builder.mutation({
      query: (body) => ({
        url: "/admin/buy/send-mail",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Buy"],
    }),
  }),
});

export const {
  useAllBuyProductGetQuery,
  useProductCancleMutation,
  useConfirmProductMutation,
  useSendReceiptMutation,
} = transactionApi;
