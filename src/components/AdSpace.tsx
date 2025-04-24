
import { CurrencyDollar } from "lucide-react";

interface AdSpaceProps {
  position: "sidebar" | "bottom";
}

const AdSpace = ({ position }: AdSpaceProps) => {
  const baseStyles = "bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center";
  const styles = {
    sidebar: `${baseStyles} w-full h-[300px] mb-4`,
    bottom: `${baseStyles} w-full h-[120px] mt-8`
  };

  return (
    <div className={styles[position]}>
      <div className="text-gray-400 flex flex-col items-center">
        <CurrencyDollar className="w-8 h-8 mb-2" />
        <span className="text-sm">Espace publicitaire</span>
      </div>
    </div>
  );
};

export default AdSpace;
