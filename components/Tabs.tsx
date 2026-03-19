type TabsProps = {
  tab: string;
  setTab: (value: string) => void;
};

export default function Tabs({ tab, setTab }: TabsProps) {
  const tabs = ["matchups", "pitchers", "hitters", "trends"];

  return (
    <div className="flex gap-6 text-gray-400 border-b border-gray-800 pb-3">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`
            capitalize pb-1 transition-colors
            ${tab === t ? "text-white font-semibold border-b-2 border-white" : "hover:text-white"}
          `}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
