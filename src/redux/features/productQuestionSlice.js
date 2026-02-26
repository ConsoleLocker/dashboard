
// import baseApi from "../api/baseApi";

// export const productQuestionApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     productQuestionPost: builder.mutation({
//       query: (formData) => ({
//         url: "/admin/question/buy/create",
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["Question"],
//     }),

//     productQuestionDelete: builder.mutation({
//       query: (_id) => ({
//         url: `/admin/question/buy/${_id}/delete`,
//         // /admin/question/buy/679da9839879d96e943f4937/delete
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Question"],
//     }),

//     // sellProductGet: builder.query({
//     //   query: () => ({
//     //     url: "/sell/products",
//     //     method: "GET",
//     //   }),
//     //   providesTags: ["Question"],
//     // }),

//     sellProductGet: builder.query({
//       query: ({ limit }) => {
//         let queryParams = new URLSearchParams();

//         if (limit) queryParams.append("limit", limit.toString());

//         return `/sell/products?${queryParams.toString()}`;
//       },
//     }),

//     productQuestionEdit: builder.mutation({
//       query: ({ id, formData }) => ({
//         url: `/admin/question/buy/${id}/edit`,
//         method: "PATCH",
//         body: formData,
//       }),
//       invalidatesTags: ["Question"],
//     }),

//     sellProductSingle: builder.query({
//       query: (id) => ({
//         url: `/sell/products/${id}`,
//         // /sell/products/67bdf1bac5d443f48472fa1f
//         method: "GET",
//       }),
//       providesTags: ["Question"],
//     }),

//     deleteInnerQuestion: builder.mutation({
//       query: (questionId, _id) => ({
//         url: `/admin/question/buy/${questionId}/questions/${_id}/delete`,
//         // /admin/question/buy/679db6915e7aeee716eaa0f3/questions/679db6915e7aeee716eaa0f4/delete
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Question"],
//     }),
//     updateInnerQuestion: builder.mutation({
//       query: ({ questionId, _id, data }) => ({
//         url: `/admin/question/buy/${questionId}/questions/${_id}/edit`,
//         // /admin/question/buy/679db6915e7aeee716eaa0f3/questions/679db6915e7aeee716eaa0f4/edit
//         method: "PATCH",
//         body: data,
//       }),
//       invalidatesTags: ["Question"],
//     }),

//     postInnerQuestion: builder.mutation({
//       query: ({ questionId, data }) => ({
//         url: `/admin/question/buy/${questionId}/questions/create`,
//         // /admin/question/buy/679db6915e7aeee716eaa0f3/questions/create
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Question"],
//     }),

//     postAddOption: builder.mutation({
//       query: ({ productId, data,_id }) => ({
//         url: `/admin/question/buy/${productId}/questions/${_id}/options/create`,
//         // /admin/question/buy/679db275ef2d2ff1afeb8df7/questions/679db275ef2d2ff1afeb8df8/options/create
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Product"],
//     }),
//   }),
// });

// export const {
//   useProductQuestionPostMutation,
//   useProductQuestionDeleteMutation,
//   useSellProductGetQuery,
//   useSellProductSingleQuery,
//   useProductQuestionEditMutation,
//   useDeleteInnerQuestionMutation,
//   useUpdateInnerQuestionMutation,
//   usePostInnerQuestionMutation,
//   usePostAddOptionMutation
// } = productQuestionApi;


import baseApi from "../api/baseApi";

export const productQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    productQuestionPost: builder.mutation({
      query: (formData) => ({
        url: "/admin/question/buy/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Question"],
    }),

    productQuestionDelete: builder.mutation({
      query: (_id) => ({
        url: `/admin/question/buy/${_id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),

    sellProductGet: builder.query({
      query: ({ limit }) => {
        let queryParams = new URLSearchParams();
        if (limit) queryParams.append("limit", limit.toString());
        return `/sell/products?${queryParams.toString()}`;
      },
      providesTags: ["Question"],
    }),

    productQuestionEdit: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/question/buy/${id}/edit`,
        // /admin/question/buy/67c83204f4f044b0a9321de5/edit
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Question"],
    }),

    sellProductSingle: builder.query({
      query: (id) => ({
        url: `/sell/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Question"],
    }),

    deleteInnerQuestion: builder.mutation({
      query: ({ questionId, _id }) => ({
        url: `/admin/question/buy/${questionId}/questions/${_id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),

    updateInnerQuestion: builder.mutation({
      query: ({ questionId, _id, data }) => ({
        url: `/admin/question/buy/${questionId}/questions/${_id}/edit`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Question"],
    }),

    postInnerQuestion: builder.mutation({
      query: ({ questionId, data }) => ({
        url: `/admin/question/buy/${questionId}/questions/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Question"],
    }),

    postAddOption: builder.mutation({
      query: ({ productId, data, _id }) => ({
        url: `/admin/question/buy/${productId}/questions/${_id}/options/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useProductQuestionPostMutation,
  useProductQuestionDeleteMutation,
  useSellProductGetQuery,
  useSellProductSingleQuery,
  useProductQuestionEditMutation,
  useDeleteInnerQuestionMutation,
  useUpdateInnerQuestionMutation,
  usePostInnerQuestionMutation,
  usePostAddOptionMutation
} = productQuestionApi;
