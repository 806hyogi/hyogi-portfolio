export type RequestStatus = "idle" | "loading" | "success" | "error";

export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type ApiError = {
  code: string;
  message: string;
  status?: number;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}>;
