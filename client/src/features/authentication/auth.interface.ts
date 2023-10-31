export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthState {
  // Login Modal state
  showLoginModal: boolean;

  // User state
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

export interface LoginRequest {
  email: string;
  password: string;
}