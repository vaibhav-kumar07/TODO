import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TooltipWrapperProps {
  children: React.ReactNode;
  content?: string | React.ReactNode; // Can be text or a React element
  contentClassName?: string; // Optional className for the tooltip content
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  content,
  contentClassName, // Optional className for the content
}) => {
  if (!content) return <>{children}</>; // If no content, just render children

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          {children}
        </TooltipTrigger>
        <TooltipContent className={cn("p-0", contentClassName)}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
