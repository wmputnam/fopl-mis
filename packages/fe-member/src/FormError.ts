export interface FormError {
  target: string,
  message: string,
  level: "error" | "warn" | "info"
}