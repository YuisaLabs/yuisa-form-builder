import { useState } from "react";
import FieldPallete from "../FieldPallete";
import { FormField, FormFieldType } from "../../types/FormFieldType";

export default function FormBuilder() {
  const [formTitle, setFormTitle] = useState("Untitled Form")
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [activeTab, setActiveTab] = useState("editor")

  const addField = (type: FormFieldType) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      name: `field${formFields.length + 1}`,
      required: false,
      options: type === "select" || type === "radio" ? ["Option 1", "Option 2"] : undefined,
      placeholder: "",
    }
    setFormFields([...formFields, newField])
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map((field) => (field.id === id ? { ...field, ...updates } : field)))
  }

  const removeField = (id: string) => {
    setFormFields(formFields.filter((field) => field.id !== id))
  }

  const moveField = (dragIndex: number, hoverIndex: number) => {
    const dragField = formFields[dragIndex]
    const newFields = [...formFields]
    newFields.splice(dragIndex, 1)
    newFields.splice(hoverIndex, 0, dragField)
    setFormFields(newFields)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Field Types</h2>
        <FieldPallete onAddField={addField}/>
      </div>
    </div>
  )
}
