export interface AxiosError {
  response?: {
    status: number;
  };
  message: string;
}
