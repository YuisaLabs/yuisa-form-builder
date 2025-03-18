export type FormFieldType =
  | "text"
  | "textarea"
  | "email"
  | "select"
  | "checkbox"
  | "radio"
  | "file"

export interface FormField {
  id: string
  label: string
  type: FormFieldType
  name: string
  required: boolean
  placeholder: string
  options?: string[]
}