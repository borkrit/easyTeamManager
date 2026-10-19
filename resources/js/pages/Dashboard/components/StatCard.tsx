interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  colorTheme?: 'indigo' | 'blue' | 'emerald' | 'purple';
  isHighlighted?: boolean;
}

const themeStyles = {
  indigo: { bg: 'bg-indigo-600/10', border: 'border-indigo-500/20', text: 'text-indigo-400' },
  blue: { bg: 'bg-blue-600/10', border: 'border-blue-500/20', text: 'text-blue-400' },
  emerald: { bg: 'bg-emerald-600/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
  purple: { bg: 'bg-purple-600/10', border: 'border-purple-500/20', text: 'text-purple-400' },
};


export function StatCard({ title, value, icon, colorTheme = 'indigo', isHighlighted = false }: StatCardProps) {
  const theme = themeStyles[colorTheme];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className={`text-3xl font-extrabold mt-2 ${isHighlighted ? 'text-emerald-400' : 'text-slate-100'}`}>
          {value}
        </p>
      </div>
      <div className={`h-12 w-12 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center ${theme.text} text-xl`}>
        {icon}
      </div>
    </div>
  );
}