import { useRef } from "react";
import { FormField } from "../../types/FormFieldType";
import { useDrag, useDrop } from "react-dnd";

interface DraggableFieldProps {
  field: FormField;
  index: number;
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  moveField: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableField({
  index,
  field,
  updateField,
  removeField,
  moveField,
}: DraggableFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "FIELD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "FIELD",
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`mb-4 border rounded-lg ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="p-4 pb-0 flex flex-row items-center justify-between border-b">
        <div className="flex items-center">
          <div className="cursor-move mr-2">⋮⋮</div>
          <h3 className="text-md font-medium">
            {field.type.charAt(0).toUpperCase() + field.type.slice(1)} Field
          </h3>
        </div>
        <button
          onClick={() => removeField(field.id)}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
      <div className="p-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`${field.id}-label`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Label
              </label>
              <input
                id={`${field.id}-label`}
                type="text"
                className="w-full p-2 border rounded"
                value={field.label}
                onChange={(e) =>
                  updateField(field.id, { label: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor={`${field.id}-name`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Field Name
              </label>
              <input
                id={`${field.id}-name`}
                type="text"
                className="w-full p-2 border rounded"
                value={field.name}
                onChange={(e) =>
                  updateField(field.id, { name: e.target.value })
                }
              />
            </div>
          </div>

          {(field.type === "text" ||
            field.type === "email" ||
            field.type === "textarea") && (
            <div>
              <label
                htmlFor={`${field.id}-placeholder`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Placeholder
              </label>
              <input
                id={`${field.id}-placeholder`}
                type="text"
                className="w-full p-2 border rounded"
                value={field.placeholder || ""}
                onChange={(e) =>
                  updateField(field.id, { placeholder: e.target.value })
                }
              />
            </div>
          )}

          {(field.type === "select" || field.type === "radio") &&
            field.options && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options
                </label>
                {field.options.map((option, i) => (
                  <div key={i} className="flex items-center mt-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...field.options!];
                        newOptions[i] = e.target.value;
                        updateField(field.id, { options: newOptions });
                      }}
                      className="w-full p-2 border rounded mr-2"
                    />
                    <button
                      onClick={() => {
                        const newOptions = [...field.options!];
                        newOptions.splice(i, 1);
                        updateField(field.id, { options: newOptions });
                      }}
                      className="text-red-500 hover:text-red-700"
                      disabled={field.options!.length <= 1}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newOptions = [
                      ...field.options!,
                      `Option ${field.options!.length + 1}`,
                    ];
                    updateField(field.id, { options: newOptions });
                  }}
                  className="mt-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  + Add Option
                </button>
              </div>
            )}

          <div className="flex items-center space-x-2">
            <input
              id={`${field.id}-required`}
              type="checkbox"
              checked={field.required}
              onChange={(e) =>
                updateField(field.id, { required: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label
              htmlFor={`${field.id}-required`}
              className="text-sm text-gray-700"
            >
              Required field
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormEditorProps {
  formTitle: string;
  setFormTitle: (title: string) => void;
  fields: FormField[];
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  moveField: (dragIndex: number, hoverIndex: number) => void;
}

export default function FormEditor({
  formTitle,
  setFormTitle,
  fields,
  updateField,
  removeField,
  moveField,
}: FormEditorProps) {
  return (
    <div>
      <div className="mb-6 p-4 border rounded-lg">
        <label
          htmlFor="form-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Form Title
        </label>
        <input
          id="form-title"
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="w-full p-2 border rounded text-xl font-semibold"
        />
      </div>

      {fields.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">
            No fields added yet. Add fields from the palette on the left.
          </p>
        </div>
      ) : (
        fields.map((field, index) => (
          <DraggableField
            key={field.id}
            field={field}
            index={index}
            updateField={updateField}
            removeField={removeField}
            moveField={moveField}
          />
        ))
      )}
    </div>
  );
}
