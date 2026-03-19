interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  date?: string;
}

export default function DashboardHeader({ title, subtitle, date }: DashboardHeaderProps) {
  return (
    <header className="pb-5 border-b border-gray-800">
      <div className="flex items-center justify-between">
        {/* Left side: title + subtitle */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

          {subtitle && (
            <p className="text-gray-400 text-sm mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right side: date */}
        {date && (
          <div className="text-gray-400 text-sm font-mono">
            {date}
          </div>
        )}
      </div>
    </header>
  );
}
