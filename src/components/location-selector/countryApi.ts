import { baseApi } from "@/redux/api/baseApi";

export interface Country {
  name: { common: string; official?: string };
  flags: { png: string; svg: string; alt?: string };
}

export const countryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => ({
        url: "https://restcountries.com/v3.1/all?fields=name,flags",
        method: "GET",
      }),
      transformResponse: (response: Country[]) =>
        [...response].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        ),
    }),
  }),
  overrideExisting: false,
});

export const { useGetCountriesQuery } = countryApi;
