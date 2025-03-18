/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FormField } from "../../types/FormFieldType";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormPreviewProps {
  title: string;
  fields: FormField[];
}

export default function FormPreview({ title, fields }: FormPreviewProps) {
  const [submitted, setSubmitted] = useState(false);

  const buildSchema = () => {
    const shape: Record<string, any> = {};

    fields.forEach((field) => {
      let validator: any;

      switch (field.type) {
        case "email":
          validator = z.string().email("Invalid email address");
          break;
        default:
          validator = z.string();
      }

      if (field.required) {
        validator = validator.min(1, `${field.name} is required`);
      } else {
        validator = validator.optional();
      }

      shape[field.name] = validator;
    });

    return z.object(shape);
  };

  const schema = buildSchema();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, any>),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
  };

  if (fields.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-gray-500">
          No fields to preview. Add fields in the editor.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-green-600 mr-2">✓</span>
          <h3 className="text-lg font-medium text-green-800">Success!</h3>
        </div>
        <p className="mt-2 text-green-700">
          Your form has been submitted successfully.
        </p>
        <button
          className="mt-4 px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50"
          onClick={() => {
            setSubmitted(false);
            form.reset();
          }}
        >
          Reset Form
        </button>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b p-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "text" && (
                <input
                  id={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full p-2 border rounded"
                  {...form.register(field.name)}
                />
              )}

              {field.type === "email" && (
                <input
                  id={field.name}
                  type="email"
                  placeholder={field.placeholder || "email@example.com"}
                  className="w-full p-2 border rounded"
                  {...form.register(field.name)}
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  className="w-full p-2 border rounded"
                  rows={4}
                  {...form.register(field.name)}
                />
              )}

              {field.type === "select" && field.options && (
                <select
                  id={field.name}
                  className="w-full p-2 border rounded"
                  {...form.register(field.name)}
                >
                  <option value="">Select an option</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "checkbox" && (
                <div className="flex items-center space-x-2">
                  <input
                    id={field.name}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    onChange={(e) => {
                      form.setValue(field.name, e.target.checked ? "true" : "");
                    }}
                  />
                  <label htmlFor={field.name} className="text-sm text-gray-700">
                    {field.placeholder || "I agree"}
                  </label>
                </div>
              )}

              {field.type === "radio" && field.options && (
                <div className="space-y-2">
                  {field.options.map((option, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`${field.name}-${i}`}
                        value={option}
                        className="h-4 w-4 text-blue-600 border-gray-300"
                        {...form.register(field.name)}
                      />
                      <label
                        htmlFor={`${field.name}-${i}`}
                        className="text-sm text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {field.type === "file" && (
                <input
                  id={field.name}
                  type="file"
                  className="w-full p-2 border rounded"
                  {...form.register(field.name)}
                />
              )}

              {form.formState.errors[field.name] && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
