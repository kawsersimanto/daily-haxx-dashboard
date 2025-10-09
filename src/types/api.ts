export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPage?: number;
}

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
