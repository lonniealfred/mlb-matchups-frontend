export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-gray-900/70 border border-gray-800 shadow-lg p-4 backdrop-blur-sm">
      {children}
    </div>
  );
}
