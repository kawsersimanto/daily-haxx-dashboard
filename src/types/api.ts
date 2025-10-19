export interface ApiMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ApiResponse<T, WithMeta extends boolean = false> = {
  success: boolean;
  message: string;
  data: WithMeta extends true ? { meta: ApiMeta; data: T } : T;
};

export interface ApiParams extends ApiMeta {
  searchTerm?: string;
  categoryId?: string | null;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorSources?: {
    type: string;
    details: string;
  }[];
  err?: {
    statusCode: number;
  };
  stack?: string | null;
}
