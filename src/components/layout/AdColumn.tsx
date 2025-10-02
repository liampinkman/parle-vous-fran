import { memo } from "react";
import AdSpace from "@/components/AdSpace";

interface AdColumnProps {
  refreshKey: number;
  count?: number;
}

const AdColumn = memo(({ refreshKey, count = 3 }: AdColumnProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <AdSpace key={index} position="sidebar" refreshKey={refreshKey} />
      ))}
    </div>
  );
});

AdColumn.displayName = "AdColumn";

export default AdColumn;
