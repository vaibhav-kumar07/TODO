'use client';

import { Label } from "@/components/common/Label";
import { ITableMetadata } from "@/components/common/table/Table";
import TableHeader from "@/components/common/table/TableHeader";
import TableRow from "@/components/common/table/TableRow";
import { Task } from "@/types/task";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/common/date-utils";
import { TaskPriority } from "@/types/task";

interface TaskTableProps {
    tasks: Task[];
    metadata: ITableMetadata[];
    className?: string;
}


export default function TaskTable(props: TaskTableProps) {
    // Use provided metadata or fall back to default
    const metadata = props.metadata as ITableMetadata[] 

    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4 md:gap-0 md:overflow-auto rounded-b-xl",
                props.className,
            )}
        >
            <TableHeader
                metadata={metadata}
                className="border-none rounded-none md:px-0 md:py-1.5 md:gap-0 text-foreground rounded-t-xl"
            />
            {props.tasks?.length ? (
                props.tasks.map((task: Task) => {
                    const taskData = {
                        ...task, // Pass the full task object for the widget
                        priority: task.priority === TaskPriority.LOW ? "Low" : 
                                task.priority === TaskPriority.MEDIUM ? "Medium" : 
                                task.priority === TaskPriority.HIGH ? "High" : "Urgent",
                        dueDate: formatDate(task.dueDate, "MMM DD, YYYY"),
                        assignedBy: task.assignedBy?.firstName + " " + task.assignedBy?.lastName,
                    }
                    return (
                        <TableRow
                            key={task._id}
                            data={taskData}
                            metadata={metadata}
                            className="w-full border-x-0 border-b-0 px-4 py-2 md:py-1 md:px-0"
                        />
                    );
                })
            ) : (
                <div className="py-2 text-center">
                    <Label className="text-muted-foreground" variant="semibold">
                        No tasks found with matching criteria
                    </Label>
                </div>
            )}
        </div>
    );
} 