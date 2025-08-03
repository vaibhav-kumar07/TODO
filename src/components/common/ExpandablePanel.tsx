import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface ExpandablePanelProps {
  id: string;
  header: React.ReactNode;
  content: React.ReactNode;
}

const ExpandablePanel: React.FC<ExpandablePanelProps> = ({
  header,
  content,
  id,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem key={id} value={id}>
        <AccordionTrigger className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg">
          {header}
        </AccordionTrigger>
        <AccordionContent className="p-4 border-t">{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ExpandablePanel;
