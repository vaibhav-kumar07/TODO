import { cn } from "@/lib/utils";
import { Label } from "./Label";

interface PageHeaderProps {
  title: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  titleLabelClassName?: string;
  descriptionLabelClassName?: string;
}

export default function PageHeaderWithButton({
  title,
  description,
  action,
  className,
  titleClassName,
  titleLabelClassName,
  descriptionLabelClassName,
}: PageHeaderProps) {
  return (
    <div className={cn("flex justify-between items-center ", className)}>
      <div className={cn("flex flex-col gap-1", titleClassName)}>
        <Label
          className={cn(
            "text-2xl font-bold text-foreground",
            titleLabelClassName
          )}
        >
          {title}
        </Label>
        <Label
          size={"sm"}
          className={cn("text-muted-foreground", descriptionLabelClassName)}
        >
          {description}
        </Label>
      </div>
      {action}
    </div>
  );
}
