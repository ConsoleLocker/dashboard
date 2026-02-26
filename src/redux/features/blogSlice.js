import baseApi from "../api/baseApi";

export const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postBlog: builder.mutation({
      query: (blog) => ({
        url: "/admin/blog/create",
        method: "POST",
        body: blog,
        formData: true,
      }),
      invalidatesTags: ["Blogs"],
    }),

    getAllBlogs: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),

    singleBlogs: builder.query({
      query: (slug) => ({
        url: `/blogs/${slug}`,
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),
    updateBlogs: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/blog/${id}/edit`,
        // /admin/blog/67b81d1355f1b1f63915b7a6/edit
        method: "PATCH",
        body: body,
        formData: true,
      }),
      invalidatesTags: ["Blogs"],
    }),

    deleteBlogs: builder.mutation({
      query: (id) => ({
        url: `/admin/blog/${id}/delete`,
        // /admin/blog/67a05575654000d72eb9e401/delete
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  usePostBlogMutation,
  useGetAllBlogsQuery,
  useSingleBlogsQuery,
  useUpdateBlogsMutation,
  useDeleteBlogsMutation
} = blogsApi;
