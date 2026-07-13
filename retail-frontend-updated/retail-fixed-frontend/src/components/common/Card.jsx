// src/components/common/Card.jsx
export default function Card({ title, subtitle, actions, children, className = '' }) {
  return (
    <div className={`rounded-xl bg-white shadow-card border border-slate-100 ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-800">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
