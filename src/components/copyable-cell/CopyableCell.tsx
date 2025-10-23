import { Check, Copy } from "lucide-react";
import { ReactNode, useState } from "react";

interface CopyableCellProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const CopyableCell = ({
  value,
  children,
  className = "",
}: CopyableCellProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`group flex items-center gap-2 ${className}`}>
      <span>{children}</span>
      <button
        onClick={handleCopy}
        className="opacity-0 transition-opacity group-hover:opacity-100 p-1 hover:bg-gray-100 rounded cursor-pointer"
        title="Copy to clipboard"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4 text-gray-600" />
        )}
      </button>
    </div>
  );
};
