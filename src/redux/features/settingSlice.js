import baseApi from "../api/baseApi";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    settingGet: builder.query({
      query: () => ({
        url: "/setting",
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),

    PostUpdateSetting:builder.mutation({
      query: (data) => ({
        url: "/admin/setting/set",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    })



  }),
});

export const { useSettingGetQuery, usePostUpdateSettingMutation } = settingApi;
