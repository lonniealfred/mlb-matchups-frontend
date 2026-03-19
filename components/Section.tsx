import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  description?: string; // optional subtext under the title
}

export default function Section({ title, children, description }: SectionProps) {
  return (
    <section className="space-y-4">
      {/* Title block */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>

        {description && (
          <p className="text-gray-500 text-xs">{description}</p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Content */}
      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}
