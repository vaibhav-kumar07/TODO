import { Label } from "./Label";

interface PageHeaderProps {
  title: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
}

export default function PageHeaderWithButton({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center ">
      <div className="flex flex-col gap-1">
        <Label className="text-2xl font-bold text-gray-900">{title}</Label>
        <Label size={"sm"} className="text-gray-500">
          {description}
        </Label>
      </div>
      {action}
    </div>
  );
}
