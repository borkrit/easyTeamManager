
import { Button } from '../button';

interface FilterOption {
    value: string | number;
    label: string;
}

interface FilterField {
    name: string;
    label: string;
    type: 'select' | 'text';
    options?: FilterOption[];
    placeholder?: string;
}

interface TableFiltersUIProps {
    fields: FilterField[];
    values: Record<string, any>;
    onChange: (name: string, value: any) => void;
    onReset: () => void;
}

export function TableFilters({ fields, values, onChange, onReset }: TableFiltersUIProps) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 shadow-sm flex flex-wrap items-center gap-4">
            {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
                    <label className="text-xs font-medium text-slate-400">{field.label}</label>
                    {field.type === 'select' ? (
                        <select
                            value={values[field.name] || ''}
                            onChange={(e) => onChange(field.name, e.target.value)}
                            className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <option value="">Wszystkie</option>
                            {field.options?.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={values[field.name] || ''}
                            onChange={(e) => onChange(field.name, e.target.value)}
                            placeholder={field.placeholder || 'Szukaj...'}
                            className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    )}
                </div>
            ))}

            <div className="flex items-end gap-2 ml-auto pt-5">
                <Button variant="secondary" size="md" onClick={onReset}>
                    Resetuj
                </Button>
            </div>
        </div>
    );
}