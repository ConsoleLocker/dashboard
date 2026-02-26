import baseApi from "../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
        query: (data) => ({
          url: "/admin/edit",
          method: "PATCH",
          body: data,
          formData: true,
        }),
        invalidatesTags: ["User"],
      }),
    })
  })


export const {  useUpdateProfileMutation } = transactionApi;
