import { memo } from "react";
import InformationalBox from "./InformationalBox";
import AdSpace from "@/components/AdSpace";
import { LucideIcon } from "lucide-react";

interface InformationalSectionProps {
  title: string;
  description: string;
  items: string[];
  icon?: LucideIcon;
  showAd?: boolean;
}

const InformationalSection = memo(({ title, description, items, icon, showAd = true }: InformationalSectionProps) => {
  return (
    <>
      <InformationalBox 
        title={title}
        description={description}
        items={items}
        icon={icon}
      />
      
      {showAd && (
        <div className="my-4">
          <AdSpace position="bottom" refreshKey={Date.now()} />
        </div>
      )}
    </>
  );
});

InformationalSection.displayName = "InformationalSection";

export default InformationalSection;
