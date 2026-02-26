import { baseApi } from "../api/baseApi";

export const couponApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCoupons: builder.query({
            query: () => "/admin/coupons",
            providesTags: ["Coupons"],
        }),
        createCoupon: builder.mutation({
            query: (data) => ({
                url: "/admin/coupons/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Coupons"],
        }),
        toggleCouponStatus: builder.mutation({
            query: (id) => ({
                url: `/admin/coupons/toggle/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Coupons"],
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/admin/coupons/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Coupons"],
        }),
        applyCoupon: builder.mutation({
            query: (data) => ({
                url: "/coupons/apply",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetAllCouponsQuery,
    useCreateCouponMutation,
    useToggleCouponStatusMutation,
    useDeleteCouponMutation,
    useApplyCouponMutation,
} = couponApi;