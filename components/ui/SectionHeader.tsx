export default function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xl font-bold text-white mb-4 tracking-tight">
      {title}
    </h2>
  );
}
