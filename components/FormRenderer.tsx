import React, { useState, useEffect, useCallback } from 'react';
import { FormSchema, FormField, FieldType } from '../types';

interface FormRendererProps {
  schema: FormSchema;
  endpoint: string;
}

type FormData = {
  [key: string]: string | number | boolean | string[];
};

const FormRenderer: React.FC<FormRendererProps> = ({ schema, endpoint }) => {
  const [formData, setFormData] = useState<FormData>({});

  const initializeFormData = useCallback((schemaToInit: FormSchema) => {
    const initialData: FormData = {};
    schemaToInit.fields.forEach(field => {
      if (field.type === FieldType.CHECKBOX) {
        initialData[field.name] = field.defaultValue === true;
      } else {
        initialData[field.name] = field.defaultValue ?? '';
      }
    });
    setFormData(initialData);
  }, []);

  useEffect(() => {
    initializeFormData(schema);
  }, [schema, initializeFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      className: "mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition",
    };

    const label = (
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-300">
            {field.label} {field.required && <span className="text-red-400">*</span>}
        </label>
    );

    switch (field.type) {
      case FieldType.TEXT:
      case FieldType.EMAIL:
      case FieldType.PASSWORD:
      case FieldType.NUMBER:
        return (
          <div key={field.name}>
            {label}
            <input
              type={field.type}
              {...commonProps}
              placeholder={field.placeholder}
              value={formData[field.name] as string | number}
              onChange={handleInputChange}
            />
          </div>
        );
      
      case FieldType.TEXTAREA:
        return (
          <div key={field.name}>
            {label}
            <textarea
              {...commonProps}
              placeholder={field.placeholder}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
        );

      case FieldType.SELECT:
        return (
          <div key={field.name}>
            {label}
            <select
              {...commonProps}
              value={formData[field.name] as string}
              onChange={handleInputChange}
            >
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        );

      case FieldType.CHECKBOX:
        return (
          <div key={field.name} className="flex items-center">
            <input type="hidden" name={field.name} value="false" />
            <input
              type="checkbox"
              {...commonProps}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-500 rounded bg-gray-700"
              checked={formData[field.name] as boolean}
              onChange={handleInputChange}
              value="true"
            />
            <label htmlFor={field.name} className="ml-2 block text-sm text-gray-300">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
          </div>
        );
        
      case FieldType.RADIO:
        return (
          <div key={field.name}>
            <p className="block text-sm font-medium text-gray-300">
                {field.label} {field.required && <span className="text-red-400">*</span>}
            </p>
            <div className="mt-2 space-y-2">
              {field.options?.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`${field.name}-${option.value}`}
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={handleInputChange}
                    required={field.required}
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-500 bg-gray-700"
                  />
                  <label htmlFor={`${field.name}-${option.value}`} className="ml-2 block text-sm text-gray-300">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form action={endpoint} method="POST" className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white">{schema.title}</h3>
        <p className="mt-1 text-gray-400">{schema.description}</p>
      </div>
      
      {schema.fields.map(field => renderField(field))}
      
      <button 
        type="submit" 
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition duration-150 ease-in-out"
      >
        {schema.submitButtonText}
      </button>
    </form>
  );
};

export default FormRenderer;
