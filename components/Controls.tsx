interface ControlsProps {
  sortBy: string;
  setSortBy: (v: string) => void;
  teamFilter: string;
  setTeamFilter: (v: string) => void;
}

export default function Controls({
  sortBy,
  setSortBy,
  teamFilter,
  setTeamFilter,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 border rounded-lg">
      
      {/* Sort */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value="time">Game Time</option>
          <option value="home">Home Team</option>
          <option value="away">Away Team</option>
        </select>
      </div>

      {/* Team Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Filter team:</label>
        <input
          type="text"
          placeholder="e.g. NYY"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value.toUpperCase())}
          className="border rounded-md px-2 py-1 text-sm w-24"
        />
      </div>
    </div>
  );
}
