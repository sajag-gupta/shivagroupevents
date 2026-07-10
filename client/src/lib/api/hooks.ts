/**
 * React Query hooks for the Shiva Group Events API.
 * Inlined from lib/api-client-react/src/generated/api.ts
 * Imports updated to point to local client and types files.
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type {
  AdminCredentials,
  AdminDashboard,
  AdminListLeadsParams,
  AuthResponse,
  HealthStatus,
  Lead,
  LeadInput,
  LeadListResponse,
  LeadUpdate,
  ListPortfolioParams,
  ListTestimonialsParams,
  PortfolioInput,
  PortfolioItem,
  PortfolioListResponse,
  PortfolioUpdate,
  Service,
  ServiceInput,
  ServiceUpdate,
  SiteStats,
  Testimonial,
  TestimonialInput,
  TestimonialUpdate,
  Settings,
} from "./types";

import { customFetch } from "./client";
import type { ErrorType, BodyType } from "./client";

type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

// ─── Health ───────────────────────────────────────────────────────────────────
export const getHealthCheckUrl = () => `/api/healthz`;
export const healthCheck = async (options?: RequestInit): Promise<HealthStatus> =>
  customFetch<HealthStatus>(getHealthCheckUrl(), { ...options, method: "GET" });
export const getHealthCheckQueryKey = () => [`/api/healthz`] as const;
export const getHealthCheckQueryOptions = <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getHealthCheckQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof healthCheck>>> = ({ signal }) => healthCheck({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & { queryKey: QueryKey };
};
export function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getHealthCheckQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export const getListPortfolioUrl = (params?: ListPortfolioParams) => {
  const p = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => { if (v !== undefined) p.append(k, v === null ? "null" : v.toString()); });
  const s = p.toString();
  return s.length > 0 ? `/api/portfolio?${s}` : `/api/portfolio`;
};
export const listPortfolio = async (params?: ListPortfolioParams, options?: RequestInit): Promise<PortfolioListResponse> =>
  customFetch<PortfolioListResponse>(getListPortfolioUrl(params), { ...options, method: "GET" });
export const getListPortfolioQueryKey = (params?: ListPortfolioParams) => [`/api/portfolio`, ...(params ? [params] : [])] as const;
export const getListPortfolioQueryOptions = <TData = Awaited<ReturnType<typeof listPortfolio>>, TError = ErrorType<unknown>>(params?: ListPortfolioParams, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listPortfolio>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListPortfolioQueryKey(params);
  const queryFn: QueryFunction<Awaited<ReturnType<typeof listPortfolio>>> = ({ signal }) => listPortfolio(params, { signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof listPortfolio>>, TError, TData> & { queryKey: QueryKey };
};
export function useListPortfolio<TData = Awaited<ReturnType<typeof listPortfolio>>, TError = ErrorType<unknown>>(params?: ListPortfolioParams, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listPortfolio>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getListPortfolioQueryOptions(params, options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getGetFeaturedPortfolioUrl = () => `/api/portfolio/featured`;
export const getFeaturedPortfolio = async (options?: RequestInit): Promise<PortfolioItem[]> =>
  customFetch<PortfolioItem[]>(getGetFeaturedPortfolioUrl(), { ...options, method: "GET" });
export const getGetFeaturedPortfolioQueryKey = () => [`/api/portfolio/featured`] as const;
export const getGetFeaturedPortfolioQueryOptions = <TData = Awaited<ReturnType<typeof getFeaturedPortfolio>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getFeaturedPortfolio>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetFeaturedPortfolioQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getFeaturedPortfolio>>> = ({ signal }) => getFeaturedPortfolio({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getFeaturedPortfolio>>, TError, TData> & { queryKey: QueryKey };
};
export function useGetFeaturedPortfolio<TData = Awaited<ReturnType<typeof getFeaturedPortfolio>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getFeaturedPortfolio>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetFeaturedPortfolioQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getGetPortfolioItemUrl = (slug: string) => `/api/portfolio/${slug}`;
export const getPortfolioItem = async (slug: string, options?: RequestInit): Promise<PortfolioItem> =>
  customFetch<PortfolioItem>(getGetPortfolioItemUrl(slug), { ...options, method: "GET" });
export const getGetPortfolioItemQueryKey = (slug: string) => [`/api/portfolio/${slug}`] as const;
export const getGetPortfolioItemQueryOptions = <TData = Awaited<ReturnType<typeof getPortfolioItem>>, TError = ErrorType<void>>(slug: string, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getPortfolioItem>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetPortfolioItemQueryKey(slug);
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPortfolioItem>>> = ({ signal }) => getPortfolioItem(slug, { signal, ...requestOptions });
  return { queryKey, queryFn, enabled: !!(slug), ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getPortfolioItem>>, TError, TData> & { queryKey: QueryKey };
};
export function useGetPortfolioItem<TData = Awaited<ReturnType<typeof getPortfolioItem>>, TError = ErrorType<void>>(slug: string, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getPortfolioItem>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetPortfolioItemQueryOptions(slug, options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

// ─── Services ─────────────────────────────────────────────────────────────────
export const getListServicesUrl = () => `/api/services`;
export const listServices = async (options?: RequestInit): Promise<Service[]> =>
  customFetch<Service[]>(getListServicesUrl(), { ...options, method: "GET" });
export const getListServicesQueryKey = () => [`/api/services`] as const;
export const getListServicesQueryOptions = <TData = Awaited<ReturnType<typeof listServices>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListServicesQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof listServices>>> = ({ signal }) => listServices({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData> & { queryKey: QueryKey };
};
export function useListServices<TData = Awaited<ReturnType<typeof listServices>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getListServicesQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getGetServiceUrl = (slug: string) => `/api/services/${slug}`;
export const getService = async (slug: string, options?: RequestInit): Promise<Service> =>
  customFetch<Service>(getGetServiceUrl(slug), { ...options, method: "GET" });
export const getGetServiceQueryKey = (slug: string) => [`/api/services/${slug}`] as const;
export const getGetServiceQueryOptions = <TData = Awaited<ReturnType<typeof getService>>, TError = ErrorType<void>>(slug: string, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getService>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetServiceQueryKey(slug);
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getService>>> = ({ signal }) => getService(slug, { signal, ...requestOptions });
  return { queryKey, queryFn, enabled: !!(slug), ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getService>>, TError, TData> & { queryKey: QueryKey };
};
export function useGetService<TData = Awaited<ReturnType<typeof getService>>, TError = ErrorType<void>>(slug: string, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getService>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetServiceQueryOptions(slug, options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const getListTestimonialsUrl = (params?: ListTestimonialsParams) => {
  const p = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => { if (v !== undefined) p.append(k, v === null ? "null" : v.toString()); });
  const s = p.toString();
  return s.length > 0 ? `/api/testimonials?${s}` : `/api/testimonials`;
};
export const listTestimonials = async (params?: ListTestimonialsParams, options?: RequestInit): Promise<Testimonial[]> =>
  customFetch<Testimonial[]>(getListTestimonialsUrl(params), { ...options, method: "GET" });
export const getListTestimonialsQueryKey = (params?: ListTestimonialsParams) => [`/api/testimonials`, ...(params ? [params] : [])] as const;
export const getListTestimonialsQueryOptions = <TData = Awaited<ReturnType<typeof listTestimonials>>, TError = ErrorType<unknown>>(params?: ListTestimonialsParams, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listTestimonials>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListTestimonialsQueryKey(params);
  const queryFn: QueryFunction<Awaited<ReturnType<typeof listTestimonials>>> = ({ signal }) => listTestimonials(params, { signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof listTestimonials>>, TError, TData> & { queryKey: QueryKey };
};
export function useListTestimonials<TData = Awaited<ReturnType<typeof listTestimonials>>, TError = ErrorType<unknown>>(params?: ListTestimonialsParams, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listTestimonials>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getListTestimonialsQueryOptions(params, options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

// ─── Stats ────────────────────────────────────────────────────────────────────
export const getGetSiteStatsUrl = () => `/api/stats`;
export const getSiteStats = async (options?: RequestInit): Promise<SiteStats> =>
  customFetch<SiteStats>(getGetSiteStatsUrl(), { ...options, method: "GET" });
export const getGetSiteStatsQueryKey = () => [`/api/stats`] as const;
export const getGetSiteStatsQueryOptions = <TData = Awaited<ReturnType<typeof getSiteStats>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getSiteStats>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetSiteStatsQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getSiteStats>>> = ({ signal }) => getSiteStats({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getSiteStats>>, TError, TData> & { queryKey: QueryKey };
};
export function useGetSiteStats<TData = Awaited<ReturnType<typeof getSiteStats>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getSiteStats>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetSiteStatsQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

// ─── Leads ────────────────────────────────────────────────────────────────────
export const getSubmitLeadUrl = () => `/api/leads`;
export const submitLead = async (leadInput: LeadInput, options?: RequestInit): Promise<Lead> =>
  customFetch<Lead>(getSubmitLeadUrl(), { ...options, method: "POST", headers: { "Content-Type": "application/json", ...options?.headers }, body: JSON.stringify(leadInput) });
export const getSubmitLeadMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitLead>>, TError, { data: BodyType<LeadInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof submitLead>>, TError, { data: BodyType<LeadInput> }, TContext> => {
  const mutationKey = ["submitLead"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof submitLead>>, { data: BodyType<LeadInput> }> = (props) => { const { data } = props ?? {}; return submitLead(data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useSubmitLead = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitLead>>, TError, { data: BodyType<LeadInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof submitLead>>, TError, { data: BodyType<LeadInput> }, TContext> => useMutation(getSubmitLeadMutationOptions(options));

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const getAdminLoginUrl = () => `/api/auth/login`;
export const adminLogin = async (adminCredentials: AdminCredentials, options?: RequestInit): Promise<AuthResponse> =>
  customFetch<AuthResponse>(getAdminLoginUrl(), { ...options, method: "POST", headers: { "Content-Type": "application/json", ...options?.headers }, body: JSON.stringify(adminCredentials) });
export const getAdminLoginMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, { data: BodyType<AdminCredentials> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, { data: BodyType<AdminCredentials> }, TContext> => {
  const mutationKey = ["adminLogin"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminLogin>>, { data: BodyType<AdminCredentials> }> = (props) => { const { data } = props ?? {}; return adminLogin(data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminLogin = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, { data: BodyType<AdminCredentials> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminLogin>>, TError, { data: BodyType<AdminCredentials> }, TContext> => useMutation(getAdminLoginMutationOptions(options));

export const getAdminLogoutUrl = () => `/api/auth/logout`;
export const adminLogout = async (options?: RequestInit): Promise<void> =>
  customFetch<void>(getAdminLogoutUrl(), { ...options, method: "POST" });
export const getAdminLogoutMutationOptions = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext> => {
  const mutationKey = ["adminLogout"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminLogout>>, void> = () => adminLogout(requestOptions);
  return { mutationFn, ...mutationOptions };
};
export const useAdminLogout = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext> => useMutation(getAdminLogoutMutationOptions(options));

export const getGetAdminMeUrl = () => `/api/auth/me`;
export const getAdminMe = async (options?: RequestInit): Promise<AuthResponse> =>
  customFetch<AuthResponse>(getGetAdminMeUrl(), { ...options, method: "GET" });
export const getGetAdminMeQueryKey = () => [`/api/auth/me`] as const;
export const getGetAdminMeQueryOptions = <TData = Awaited<ReturnType<typeof getAdminMe>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminMe>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetAdminMeQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAdminMe>>> = ({ signal }) => getAdminMe({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getAdminMe>>, TError, TData> & { queryKey: QueryKey };
};
export function useGetAdminMe<TData = Awaited<ReturnType<typeof getAdminMe>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminMe>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetAdminMeQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

// ─── Admin — Leads ────────────────────────────────────────────────────────────
export const getAdminListLeadsUrl = (params?: AdminListLeadsParams) => {
  const p = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => { if (v !== undefined) p.append(k, v === null ? "null" : v.toString()); });
  const s = p.toString();
  return s.length > 0 ? `/api/admin/leads?${s}` : `/api/admin/leads`;
};
export const adminListLeads = async (params?: AdminListLeadsParams, options?: RequestInit): Promise<LeadListResponse> =>
  customFetch<LeadListResponse>(getAdminListLeadsUrl(params), { ...options, method: "GET" });
export const getAdminListLeadsQueryKey = (params?: AdminListLeadsParams) => [`/api/admin/leads`, ...(params ? [params] : [])] as const;
export const getAdminListLeadsQueryOptions = <TData = Awaited<ReturnType<typeof adminListLeads>>, TError = ErrorType<void>>(params?: AdminListLeadsParams, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof adminListLeads>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getAdminListLeadsQueryKey(params);
  const queryFn: QueryFunction<Awaited<ReturnType<typeof adminListLeads>>> = ({ signal }) => adminListLeads(params, { signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof adminListLeads>>, TError, TData> & { queryKey: QueryKey };
};
export function useAdminListLeads<TData = Awaited<ReturnType<typeof adminListLeads>>, TError = ErrorType<void>>(params?: AdminListLeadsParams, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof adminListLeads>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminListLeadsQueryOptions(params, options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getAdminUpdateLeadUrl = (id: number) => `/api/admin/leads/${id}`;
export const adminUpdateLead = async (id: number, leadUpdate: LeadUpdate, options?: RequestInit): Promise<Lead> =>
  customFetch<Lead>(getAdminUpdateLeadUrl(id), { ...options, method: "PATCH", headers: { "Content-Type": "application/json", ...options?.headers }, body: JSON.stringify(leadUpdate) });
export const getAdminUpdateLeadMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminUpdateLead>>, TError, { id: number; data: BodyType<LeadUpdate> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminUpdateLead>>, TError, { id: number; data: BodyType<LeadUpdate> }, TContext> => {
  const mutationKey = ["adminUpdateLead"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminUpdateLead>>, { id: number; data: BodyType<LeadUpdate> }> = (props) => { const { id, data } = props ?? {}; return adminUpdateLead(id, data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminUpdateLead = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminUpdateLead>>, TError, { id: number; data: BodyType<LeadUpdate> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminUpdateLead>>, TError, { id: number; data: BodyType<LeadUpdate> }, TContext> => useMutation(getAdminUpdateLeadMutationOptions(options));

// ─── Admin — Portfolio ────────────────────────────────────────────────────────
export const getAdminListPortfolioUrl = () => `/api/admin/portfolio`;
export const adminListPortfolio = async (options?: RequestInit): Promise<PortfolioListResponse> =>
  customFetch<PortfolioListResponse>(getAdminListPortfolioUrl(), { ...options, method: "GET" });
export const getAdminListPortfolioQueryKey = () => [`/api/admin/portfolio`] as const;
export const getAdminListPortfolioQueryOptions = <TData = Awaited<ReturnType<typeof adminListPortfolio>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof adminListPortfolio>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getAdminListPortfolioQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof adminListPortfolio>>> = ({ signal }) => adminListPortfolio({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof adminListPortfolio>>, TError, TData> & { queryKey: QueryKey };
};
export function useAdminListPortfolio<TData = Awaited<ReturnType<typeof adminListPortfolio>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof adminListPortfolio>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminListPortfolioQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getAdminCreatePortfolioUrl = () => `/api/admin/portfolio`;
export const adminCreatePortfolio = async (portfolioInput: PortfolioInput, options?: RequestInit): Promise<PortfolioItem> =>
  customFetch<PortfolioItem>(getAdminCreatePortfolioUrl(), { ...options, method: "POST", headers: { "Content-Type": "application/json", ...options?.headers }, body: JSON.stringify(portfolioInput) });
export const getAdminCreatePortfolioMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminCreatePortfolio>>, TError, { data: BodyType<PortfolioInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminCreatePortfolio>>, TError, { data: BodyType<PortfolioInput> }, TContext> => {
  const mutationKey = ["adminCreatePortfolio"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminCreatePortfolio>>, { data: BodyType<PortfolioInput> }> = (props) => { const { data } = props ?? {}; return adminCreatePortfolio(data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminCreatePortfolio = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminCreatePortfolio>>, TError, { data: BodyType<PortfolioInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminCreatePortfolio>>, TError, { data: BodyType<PortfolioInput> }, TContext> => useMutation(getAdminCreatePortfolioMutationOptions(options));

export const getAdminUpdatePortfolioUrl = (id: number) => `/api/admin/portfolio/${id}`;
export const adminUpdatePortfolio = async (id: number, portfolioUpdate: PortfolioUpdate, options?: RequestInit): Promise<PortfolioItem> =>
  customFetch<PortfolioItem>(getAdminUpdatePortfolioUrl(id), { ...options, method: "PATCH", headers: { "Content-Type": "application/json", ...options?.headers }, body: JSON.stringify(portfolioUpdate) });
export const getAdminUpdatePortfolioMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminUpdatePortfolio>>, TError, { id: number; data: BodyType<PortfolioUpdate> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminUpdatePortfolio>>, TError, { id: number; data: BodyType<PortfolioUpdate> }, TContext> => {
  const mutationKey = ["adminUpdatePortfolio"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminUpdatePortfolio>>, { id: number; data: BodyType<PortfolioUpdate> }> = (props) => { const { id, data } = props ?? {}; return adminUpdatePortfolio(id, data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminUpdatePortfolio = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminUpdatePortfolio>>, TError, { id: number; data: BodyType<PortfolioUpdate> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminUpdatePortfolio>>, TError, { id: number; data: BodyType<PortfolioUpdate> }, TContext> => useMutation(getAdminUpdatePortfolioMutationOptions(options));

export const getAdminDeletePortfolioUrl = (id: number) => `/api/admin/portfolio/${id}`;
export const adminDeletePortfolio = async (id: number, options?: RequestInit): Promise<void> =>
  customFetch<void>(getAdminDeletePortfolioUrl(id), { ...options, method: "DELETE" });
export const getAdminDeletePortfolioMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminDeletePortfolio>>, TError, { id: number }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminDeletePortfolio>>, TError, { id: number }, TContext> => {
  const mutationKey = ["adminDeletePortfolio"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminDeletePortfolio>>, { id: number }> = (props) => { const { id } = props ?? {}; return adminDeletePortfolio(id, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminDeletePortfolio = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminDeletePortfolio>>, TError, { id: number }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminDeletePortfolio>>, TError, { id: number }, TContext> => useMutation(getAdminDeletePortfolioMutationOptions(options));

// ─── Admin — Services ─────────────────────────────────────────────────────────
export const getAdminListServicesUrl = () => `/api/admin/services`;
export const adminListServices = async (options?: RequestInit): Promise<{ items: Service[]; total: number }> =>
  customFetch<{ items: Service[]; total: number }>(getAdminListServicesUrl(), { ...options, method: "GET" });
export const getAdminListServicesQueryKey = () => [`/api/admin/services`] as const;
export const getAdminListServicesQueryOptions = <TData = Awaited<ReturnType<typeof adminListServices>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof adminListServices>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getAdminListServicesQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof adminListServices>>> = ({ signal }) => adminListServices({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof adminListServices>>, TError, TData> & { queryKey: QueryKey };
};
export function useAdminListServices<TData = Awaited<ReturnType<typeof adminListServices>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof adminListServices>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminListServicesQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getAdminCreateServiceUrl = () => `/api/admin/services`;
export const adminCreateService = async (serviceInput: ServiceInput, options?: RequestInit): Promise<Service> =>
  customFetch<Service>(getAdminCreateServiceUrl(), { ...options, method: "POST", headers: { "Content-Type": "application/json", ...options?.headers }, body: JSON.stringify(serviceInput) });
export const getAdminCreateServiceMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminCreateService>>, TError, { data: BodyType<ServiceInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminCreateService>>, TError, { data: BodyType<ServiceInput> }, TContext> => {
  const mutationKey = ["adminCreateService"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminCreateService>>, { data: BodyType<ServiceInput> }> = (props) => { const { data } = props ?? {}; return adminCreateService(data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminCreateService = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminCreateService>>, TError, { data: BodyType<ServiceInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminCreateService>>, TError, { data: BodyType<ServiceInput> }, TContext> => useMutation(getAdminCreateServiceMutationOptions(options));

export const getAdminUpdateServiceUrl = (id: number) => `/api/admin/services/${id}`;
export const adminUpdateService = async (id: number, serviceUpdate: ServiceUpdate, options?: RequestInit): Promise<Service> =>
  customFetch<Service>(getAdminUpdateServiceUrl(id), { ...options, method: "PATCH", headers: { "Content-Type": "application/json", ...options?.headers }, body: JSON.stringify(serviceUpdate) });
export const getAdminUpdateServiceMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminUpdateService>>, TError, { id: number; data: BodyType<ServiceUpdate> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminUpdateService>>, TError, { id: number; data: BodyType<ServiceUpdate> }, TContext> => {
  const mutationKey = ["adminUpdateService"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminUpdateService>>, { id: number; data: BodyType<ServiceUpdate> }> = (props) => { const { id, data } = props ?? {}; return adminUpdateService(id, data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminUpdateService = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminUpdateService>>, TError, { id: number; data: BodyType<ServiceUpdate> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminUpdateService>>, TError, { id: number; data: BodyType<ServiceUpdate> }, TContext> => useMutation(getAdminUpdateServiceMutationOptions(options));

export const getAdminDeleteServiceUrl = (id: number) => `/api/admin/services/${id}`;
export const adminDeleteService = async (id: number, options?: RequestInit): Promise<void> =>
  customFetch<void>(getAdminDeleteServiceUrl(id), { ...options, method: "DELETE" });
export const getAdminDeleteServiceMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminDeleteService>>, TError, { id: number }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminDeleteService>>, TError, { id: number }, TContext> => {
  const mutationKey = ["adminDeleteService"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminDeleteService>>, { id: number }> = (props) => { const { id } = props ?? {}; return adminDeleteService(id, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminDeleteService = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminDeleteService>>, TError, { id: number }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminDeleteService>>, TError, { id: number }, TContext> => useMutation(getAdminDeleteServiceMutationOptions(options));

// ─── Admin — Testimonials ─────────────────────────────────────────────────────
export const getAdminListTestimonialsUrl = () => `/api/admin/testimonials`;
export const adminListTestimonials = async (options?: RequestInit): Promise<Testimonial[]> =>
  customFetch<Testimonial[]>(getAdminListTestimonialsUrl(), { ...options, method: "GET" });
export const getAdminListTestimonialsQueryKey = () => [`/api/admin/testimonials`] as const;
export const getAdminListTestimonialsQueryOptions = <TData = Awaited<ReturnType<typeof adminListTestimonials>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof adminListTestimonials>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getAdminListTestimonialsQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof adminListTestimonials>>> = ({ signal }) => adminListTestimonials({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof adminListTestimonials>>, TError, TData> & { queryKey: QueryKey };
};
export function useAdminListTestimonials<TData = Awaited<ReturnType<typeof adminListTestimonials>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof adminListTestimonials>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminListTestimonialsQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getAdminCreateTestimonialUrl = () => `/api/admin/testimonials`;
export const adminCreateTestimonial = async (testimonialInput: TestimonialInput, options?: RequestInit): Promise<Testimonial> =>
  customFetch<Testimonial>(getAdminCreateTestimonialUrl(), { ...options, method: "POST", headers: { "Content-Type": "application/json", ...options?.headers }, body: JSON.stringify(testimonialInput) });
export const getAdminCreateTestimonialMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminCreateTestimonial>>, TError, { data: BodyType<TestimonialInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminCreateTestimonial>>, TError, { data: BodyType<TestimonialInput> }, TContext> => {
  const mutationKey = ["adminCreateTestimonial"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminCreateTestimonial>>, { data: BodyType<TestimonialInput> }> = (props) => { const { data } = props ?? {}; return adminCreateTestimonial(data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminCreateTestimonial = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminCreateTestimonial>>, TError, { data: BodyType<TestimonialInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminCreateTestimonial>>, TError, { data: BodyType<TestimonialInput> }, TContext> => useMutation(getAdminCreateTestimonialMutationOptions(options));

export const getAdminUpdateTestimonialUrl = (id: number) => `/api/admin/testimonials/${id}`;
export const adminUpdateTestimonial = async (id: number, testimonialUpdate: TestimonialUpdate, options?: RequestInit): Promise<Testimonial> =>
  customFetch<Testimonial>(getAdminUpdateTestimonialUrl(id), { ...options, method: "PATCH", headers: { "Content-Type": "application/json", ...options?.headers }, body: JSON.stringify(testimonialUpdate) });
export const getAdminUpdateTestimonialMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminUpdateTestimonial>>, TError, { id: number; data: BodyType<TestimonialUpdate> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminUpdateTestimonial>>, TError, { id: number; data: BodyType<TestimonialUpdate> }, TContext> => {
  const mutationKey = ["adminUpdateTestimonial"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminUpdateTestimonial>>, { id: number; data: BodyType<TestimonialUpdate> }> = (props) => { const { id, data } = props ?? {}; return adminUpdateTestimonial(id, data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminUpdateTestimonial = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminUpdateTestimonial>>, TError, { id: number; data: BodyType<TestimonialUpdate> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminUpdateTestimonial>>, TError, { id: number; data: BodyType<TestimonialUpdate> }, TContext> => useMutation(getAdminUpdateTestimonialMutationOptions(options));

export const getAdminDeleteTestimonialUrl = (id: number) => `/api/admin/testimonials/${id}`;
export const adminDeleteTestimonial = async (id: number, options?: RequestInit): Promise<void> =>
  customFetch<void>(getAdminDeleteTestimonialUrl(id), { ...options, method: "DELETE" });
export const getAdminDeleteTestimonialMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminDeleteTestimonial>>, TError, { id: number }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminDeleteTestimonial>>, TError, { id: number }, TContext> => {
  const mutationKey = ["adminDeleteTestimonial"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminDeleteTestimonial>>, { id: number }> = (props) => { const { id } = props ?? {}; return adminDeleteTestimonial(id, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminDeleteTestimonial = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminDeleteTestimonial>>, TError, { id: number }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminDeleteTestimonial>>, TError, { id: number }, TContext> => useMutation(getAdminDeleteTestimonialMutationOptions(options));

// ─── Admin — Dashboard ────────────────────────────────────────────────────────
export const getAdminGetDashboardUrl = () => `/api/admin/dashboard`;
export const adminGetDashboard = async (options?: RequestInit): Promise<AdminDashboard> =>
  customFetch<AdminDashboard>(getAdminGetDashboardUrl(), { ...options, method: "GET" });
export const getAdminGetDashboardQueryKey = () => [`/api/admin/dashboard`] as const;
export const getAdminGetDashboardQueryOptions = <TData = Awaited<ReturnType<typeof adminGetDashboard>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof adminGetDashboard>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getAdminGetDashboardQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof adminGetDashboard>>> = ({ signal }) => adminGetDashboard({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof adminGetDashboard>>, TError, TData> & { queryKey: QueryKey };
};
export function useAdminGetDashboard<TData = Awaited<ReturnType<typeof adminGetDashboard>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof adminGetDashboard>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAdminGetDashboardQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

// ─── Settings ────────────────────────────────────────────────────────────────
export const getSettingsUrl = () => `/api/settings`;
export const getSettings = async (options?: RequestInit): Promise<Settings> =>
  customFetch<Settings>(getSettingsUrl(), { ...options, method: "GET" });
export const getSettingsQueryKey = () => [`/api/settings`] as const;
export const getSettingsQueryOptions = <TData = Awaited<ReturnType<typeof getSettings>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getSettingsQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getSettings>>> = ({ signal }) => getSettings({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData> & { queryKey: QueryKey };
};
export function useGetSettings<TData = Awaited<ReturnType<typeof getSettings>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getSettingsQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getAdminUpdateSettingsUrl = () => `/api/admin/settings`;
export const adminUpdateSettings = async (settingsInput: Settings, options?: RequestInit): Promise<{ success: boolean; settings: Settings }> =>
  customFetch<{ success: boolean; settings: Settings }>(getAdminUpdateSettingsUrl(), { ...options, method: "POST", headers: { "Content-Type": "application/json", ...options?.headers }, body: JSON.stringify(settingsInput) });
export const getAdminUpdateSettingsMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminUpdateSettings>>, TError, { data: BodyType<Settings> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminUpdateSettings>>, TError, { data: BodyType<Settings> }, TContext> => {
  const mutationKey = ["adminUpdateSettings"];
  const { mutation: mutationOptions, request: requestOptions } = options ? (options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } }) : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminUpdateSettings>>, { data: BodyType<Settings> }> = (props) => { const { data } = props ?? {}; return adminUpdateSettings(data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};
export const useAdminUpdateSettings = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminUpdateSettings>>, TError, { data: BodyType<Settings> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminUpdateSettings>>, TError, { data: BodyType<Settings> }, TContext> => useMutation(getAdminUpdateSettingsMutationOptions(options));

