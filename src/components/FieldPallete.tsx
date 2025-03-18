import { FormFieldType } from "../types/FormFieldType"

interface FieldButtonProps {
  type: FormFieldType
  label: string
  icon: string
  onAddField: (type: FormFieldType) => void
}

function FieldButton({
  type,
  label,
  icon,
  onAddField
}: FieldButtonProps) {
  return (
    <button className="w-full flex items-center justify-start p-3 mb-2 border rounded hover:bg-gray-50 transition-colors" onClick={() => onAddField(type)}>
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  )
}

interface FieldPalleteProps {
  onAddField: (type: FormFieldType) => void
}

export default function FieldPallete({
  onAddField
}: FieldPalleteProps) {
  return (
    <div className="space-y-1">
      <FieldButton type="text" label="Text" icon="T" onAddField={onAddField} />
      <FieldButton type="email" label="Email" icon="E" onAddField={onAddField} />
      <FieldButton type="checkbox" label="Checkbox" icon="C" onAddField={onAddField} />
      <FieldButton type="radio" label="Radio" icon="R" onAddField={onAddField} />
      <FieldButton type="select" label="Select" icon="S" onAddField={onAddField} />
      <FieldButton type="textarea" label="Textarea" icon="TA" onAddField={onAddField} />
      <FieldButton type="file" label="File" icon="F" onAddField={onAddField} />
    </div>
  )
}
