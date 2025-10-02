import { memo } from "react";
import AdSpace from "@/components/AdSpace";

interface BottomAdsProps {
  refreshKey: number;
  count?: number;
}

const BottomAds = memo(({ refreshKey, count = 2 }: BottomAdsProps) => {
  return (
    <div className="mt-6 space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <AdSpace key={index} position="bottom" refreshKey={refreshKey} />
      ))}
    </div>
  );
});

BottomAds.displayName = "BottomAds";

export default BottomAds;
