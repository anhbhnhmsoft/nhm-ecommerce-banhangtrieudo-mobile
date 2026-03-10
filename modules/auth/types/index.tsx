export type LoginRequest = {
  phone: string;
  password: string;
};

export type RegisterRequest = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  otpMethod: "phone" | "email";
  agreeTerms: boolean;
};

export type ForgotPasswordRequest = {
  contact: string;
};

export type ResetPasswordRequest = {
  password: string;
  confirmPassword: string;
};
