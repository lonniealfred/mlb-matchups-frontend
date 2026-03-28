"use client";

export default function Tabs(props) {
  const tab = props.tab ?? props.activeTab;
  const setTab = props.setTab ?? props.onChange;

  const tabs = [
    { id: "matchups", label: "Matchups" },
    { id: "pitchers", label: "Pitching" },
    { id: "hitters", label: "Top Hitters" },
    { id: "trends", label: "Trends" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {tabs.map((t) => {
        const isActive = tab === t.id;

        return (
          <button
            key={t.id}
            onClick={() => setTab?.(t.id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
              transition-colors
              ${
                isActive
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }
            `}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
