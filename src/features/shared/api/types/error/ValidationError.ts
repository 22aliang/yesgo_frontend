export interface ValidationError {
  property: string;
  constraints: Record<string, string>;
}
