import baseApi from "../api/baseApi";

export const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/admin/send-otp",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/admin/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/admin/change-password",
        method: "POST",
        body: data,
      }),
    }),

    // resetPassword: builder.mutation({
    //   query: (data) => ({
    //     // const token = localStorage.getItem("Authorization");

    //     // if (!token) {
    //     //   throw new Error("No token found. Please verify your email again.");
    //     // }

    //     url: "/admin/reset-password",
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   }),
    // }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/admin/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
} = authAPI;
