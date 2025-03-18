import { CiText } from "react-icons/ci";
import { FormFieldType } from "../types/FormFieldType";
import { LuAlignLeft, LuCircle, LuFile, LuListOrdered, LuMail, LuSquareCheck } from "react-icons/lu";

interface FieldButtonProps {
  type: FormFieldType;
  label: string;
  icon: React.ReactNode;
  onAddField: (type: FormFieldType) => void;
}

function FieldButton({ type, label, icon, onAddField }: FieldButtonProps) {
  return (
    <button
      className="w-full flex items-center justify-start p-3 mb-2 border rounded hover:bg-gray-50 transition-colors"
      onClick={() => onAddField(type)}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
}

interface FieldPalleteProps {
  onAddField: (type: FormFieldType) => void;
}

export default function FieldPallete({ onAddField }: FieldPalleteProps) {
  return (
    <div className="space-y-1">
      <FieldButton
        type="text"
        label="Text"
        icon={<CiText />}
        onAddField={onAddField}
      />
      <FieldButton
        type="email"
        label="Email"
        icon={<LuMail />}
        onAddField={onAddField}
      />
      <FieldButton
        type="checkbox"
        label="Checkbox"
        icon={<LuSquareCheck />}
        onAddField={onAddField}
      />
      <FieldButton
        type="radio"
        label="Radio Group"
        icon={<LuCircle />}
        onAddField={onAddField}
      />
      <FieldButton
        type="select"
        label="Dropdown"
        icon={<LuListOrdered />}
        onAddField={onAddField}
      />
      <FieldButton
        type="textarea"
        label="Textarea"
        icon={<LuAlignLeft />}
        onAddField={onAddField}
      />
      <FieldButton
        type="file"
        label="File"
        icon={<LuFile />}
        onAddField={onAddField}
      />
    </div>
  );
}
