import { memo, ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface InformationalBoxProps {
  title: string;
  description: string;
  items: string[];
  icon?: LucideIcon;
}

const InformationalBox = memo(({ title, description, items, icon: Icon }: InformationalBoxProps) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center gap-2">
        {Icon && <Icon size={18} />}
        {title}
      </h3>
      <p className="text-sm text-blue-700 mb-2">
        {description}
      </p>
      <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
});

InformationalBox.displayName = "InformationalBox";

export default InformationalBox;
