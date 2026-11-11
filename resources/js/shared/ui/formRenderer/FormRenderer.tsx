import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { InputError } from '@/shared/ui/inputError';

export interface FieldOption {
    value: string | number;
    label: string;
}

export interface FormFieldConfig {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select';
    required?: boolean;
    placeholder?: string;
    rows?: number;
    options?: FieldOption[];
    disabled?: boolean;
    hint?: string;
    gridSpan?: 'full' | 'half'; 
}

interface FormRendererProps {
    fields: FormFieldConfig[];
    data: Record<string, any>;
    errors: Record<string, string>;
    onChange: (name: string, value: any) => void;
}

export function FormRenderer({ fields, data, errors, onChange }: FormRendererProps) {
    return (
        <div className="space-y-4">
            {fields.map((field) => (
                <div key={field.name}>
                    <Label required={field.required}>{field.label}</Label>

                    {field.type === 'text' && (
                        <Input
                            type="text"
                            value={data[field.name] ?? ''}
                            onChange={(e) => onChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            hasError={Boolean(errors[field.name])}
                        />
                    )}

                    {field.type === 'textarea' && (
                        <Textarea
                            value={data[field.name] ?? ''}
                            onChange={(e) => onChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            rows={field.rows ?? 3}
                            hasError={Boolean(errors[field.name])}
                        />
                    )}

                    {field.type === 'select' && (
                        <select
                            value={data[field.name] ?? ''}
                            onChange={(e) => onChange(field.name, e.target.value)}
                            disabled={field.disabled}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {field.options?.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    )}

                    {field.hint && <span className="text-xs text-amber-400 mt-1 block">{field.hint}</span>}
                    <InputError message={errors[field.name]} />
                </div>
            ))}
        </div>
    );
}