import baseApi from "../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: "/admin/notification",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    getSingleNotification: builder.query({
      query: (id) => ({
        url: `/admin/notification/${id}`,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/admin/notification/${id}`,
        method: "PATCH",
        body: { isRead: true },
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetAllNotificationQuery,
  useGetSingleNotificationQuery,
  useMarkAsReadMutation
} = transactionApi;