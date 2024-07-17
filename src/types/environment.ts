export interface IEnvirnoment {
  id: string;
  key: string;
  value?: string;
  placeholder: string;
  description: string;
  type: "string" | "boolean" | "number";
}
