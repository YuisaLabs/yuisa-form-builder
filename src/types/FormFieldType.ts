export type FormFieldType =
  | "text"
  | "textarea"
  | "email"
  | "checkbox"
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