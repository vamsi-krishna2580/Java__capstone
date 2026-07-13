// src/components/common/FormField.jsx
export function TextField({ label, error, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>}
      <input
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-200 ${
          error ? 'border-danger' : 'border-slate-200 focus:border-brand-500'
        }`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}

export function SelectField({ label, options, error, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>}
      <select
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-200 ${
          error ? 'border-danger' : 'border-slate-200 focus:border-brand-500'
        }`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}

export function TextAreaField({ label, error, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>}
      <textarea
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-200 ${
          error ? 'border-danger' : 'border-slate-200 focus:border-brand-500'
        }`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}
