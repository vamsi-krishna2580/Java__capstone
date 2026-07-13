// src/components/common/StatCard.jsx
export default function StatCard({ icon: Icon, label, value, accent = 'brand', hint }) {
  const accents = {
    brand: 'bg-brand-50 text-brand-600',
    success: 'bg-green-50 text-success',
    warning: 'bg-amber-50 text-warning',
    danger: 'bg-red-50 text-danger',
  };
  return (
    <div className="rounded-xl bg-white p-5 shadow-card border border-slate-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>
        {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      </div>
      <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${accents[accent]}`}>
        <Icon size={22} />
      </div>
    </div>
  );
}
