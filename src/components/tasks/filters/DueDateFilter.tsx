'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/common/date-utils';
import { Label } from '@/components/common/Label';

interface DueDateFilterProps {
  className?: string;
}

export default function DueDateFilter({ className }: DueDateFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get('dueDate') ? new Date(searchParams.get('dueDate')!) : undefined
  );

  useEffect(() => {
    const dueDateParam = searchParams.get('dueDate');
    if (dueDateParam) {
      setSelectedDate(new Date(dueDateParam));
    } else {
      setSelectedDate(undefined);
    }
  }, [searchParams]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsOpen(false);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (date) {
      // Set to start of day (00:00:00)
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);
      params.set('dueDate', selectedDate.toISOString());
    } else {
      params.delete('dueDate');
    }
    
    // Reset to first page when filtering
    params.delete('page');
    
    router.push(`?${params.toString()}`);
  };

  const clearFilter = () => {
    setSelectedDate(undefined);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('dueDate');
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild className={cn(
          'justify-start text-left font-normal',
          !selectedDate && 'text-muted-foreground'
        )}>
           <div className="flex items-center space-x-2">
            {/* <CalendarIcon className="mr-2 h-2 w-2" /> */}
            {selectedDate ? (
              <Label variant={"semibold"} size={"xs"} className='cursor-pointer text-muted-foreground  border rounded-md px-2 py-1'> {formatDate(selectedDate, 'MMM DD, YYYY')}</Label>
            ) : (
             <Label variant={"semibold"} size={"xs"} className='flex items-center gap-2 cursor-pointer text-muted-foreground  border rounded-md px-2 py-1'> <CalendarIcon className="h-4 w-4 " /> Due date</Label>
            )}
           </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      {selectedDate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilter}
          className="h-6 w-6 p-0"
        >
          <X className="h-3 w-3" /> 
        </Button>
      )}
    </div>
  );
} 