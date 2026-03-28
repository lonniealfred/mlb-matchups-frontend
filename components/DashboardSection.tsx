"use client";

export default function DashboardSection({ title, children }) {
  return (
    <section className="space-y-4">
      {/* Header Row */}
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-white tracking-wide">
          {title}
        </h2>

        {/* Divider line for ESPN-style polish */}
        <div className="flex-1 ml-4 border-t border-gray-800" />
      </div>

      {/* Section Content */}
      <div>{children}</div>
    </section>
  );
}
