'use client';

import { Label } from "@/components/common/Label";
import { ITableMetadata } from "@/components/common/table/Table";
import TableHeader from "@/components/common/table/TableHeader";
import TableRow from "@/components/common/table/TableRow";
import { Task } from "@/types/task";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/common/date-utils";
import { TaskStatus, TaskPriority } from "@/types/task";

interface TaskTableProps {
    tasks: Task[];
    className?: string;
}

const taskTableMetadata: ITableMetadata[] = [
    {
        columnName: "title",
        headerLabel: "Title",
        sortable: true,
        columnClass: "w-full md:w-[25%] lg:w-[20%] text-left text-muted-foreground md:pl-4",
        cellClass: "w-full md:w-[25%] lg:w-[20%] text-left md:pl-2",
    },
    {
        columnName: "description",
        headerLabel: "Description",
        sortable: true,
        columnClass: "w-full md:w-[20%] lg:w-[20%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[20%] lg:w-[20%]",
    },
    {
        columnName: "status",
        headerLabel: "Status",
        sortable: true,
        columnClass: "w-full md:w-[15%] lg:w-[15%] text-muted-foreground",
        cellClass: "w-full md:w-[15%] lg:w-[15%] md:px-0 md:text-center",
        type: "widget",
        widgetName: "updateTaskStatusWidget",
    },
    {
        columnName: "priority",
        headerLabel: "Priority",
        sortable: true,
        columnClass: "w-full md:w-[10%] lg:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] lg:w-[10%]",
    },
    {
        columnName: "dueDate",
        headerLabel: "Due Date",
        sortable: true,
        columnClass: "w-full md:w-[15%] lg:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] lg:w-[15%]",
    },
    {
        columnName: "assignedTo",
        headerLabel: "Assigned To",
        sortable: true,
        columnClass: "w-full md:w-[15%] lg:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] lg:w-[15%]",
        type: "widget",
        widgetName: "reassignTaskWidget",
    },
    {
        columnName: "actions",
        headerLabel: "Actions",
        sortable: false,
        columnClass: "w-full md:w-[10%] lg:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] lg:w-[10%]",
        type: "widget",
        widgetName: "taskUpdateWidget",
    },
];

export default function TaskTable(props: TaskTableProps) {
    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4 md:gap-0 md:overflow-auto",
                props.className,
            )}
        >
            <TableHeader
                metadata={taskTableMetadata}
                className="border-none rounded-none md:px-0 md:py-1.5 md:gap-0 text-foreground"
            />
            {props.tasks?.length ? (
                props.tasks.map((task: Task) => {
                    const taskData = {
                        ...task,
                        status: task, // Pass the full task object for the widget
                        priority: task.priority === TaskPriority.LOW ? "Low" : 
                                task.priority === TaskPriority.MEDIUM ? "Medium" : 
                                task.priority === TaskPriority.HIGH ? "High" : "Urgent",
                        dueDate: formatDate(task.dueDate, "MMM DD, YYYY"),
                    }
                    return (
                        <TableRow
                            key={task.id}
                            data={taskData}
                            metadata={taskTableMetadata}
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