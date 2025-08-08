"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "@/types/task";
import { formatDate } from "@/lib/common/date-utils";
import { TaskStatus, TaskPriority } from "@/types/task";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ClipboardList,
  Calendar,
  AlertCircle,
  Clock,
  UserCheck,
} from "lucide-react";

interface TaskDetailsDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.TODO:
      return "bg-gray-100 text-gray-800";
    case TaskStatus.IN_PROGRESS:
      return "bg-blue-100 text-blue-800";
    case TaskStatus.REVIEW:
      return "bg-yellow-100 text-yellow-800";
    case TaskStatus.COMPLETED:
      return "bg-green-100 text-green-800";
    case TaskStatus.CANCELLED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.LOW:
      return "bg-green-100 text-green-800";
    case TaskPriority.MEDIUM:
      return "bg-yellow-100 text-yellow-800";
    case TaskPriority.HIGH:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityIcon = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.LOW:
      return <AlertCircle className="h-4 w-4 text-green-600" />;
    case TaskPriority.MEDIUM:
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    case TaskPriority.HIGH:
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

export default function TaskDetailsDialog({
  task,
  open,
  onOpenChange,
}: TaskDetailsDialogProps) {
  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== TaskStatus.COMPLETED;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ClipboardList className="h-5 w-5" />
            <span>Task Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {task.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status.replace("_", " ")}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {getPriorityIcon(task.priority)}
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
              {isOverdue && (
                <Badge className="bg-red-100 text-red-800">Overdue</Badge>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {task.description}
            </p>
          </div>

          <Separator />

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Due Date */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Due Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {formatDate(task.dueDate, "MMM DD, YYYY")}
                </p>
              </CardContent>
            </Card>

            {/* Assigned By */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Assigned By
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {task.assignedBy
                    ? `${task.assignedBy.firstName} ${task.assignedBy.lastName}`
                    : "N/A"}
                </p>
              </CardContent>
            </Card>

            {/* Created Date */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Created
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {formatDate(task.createdAt, "MMM DD, YYYY")}
                </p>
              </CardContent>
            </Card>

            {/* Last Updated */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Last Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {formatDate(task.updatedAt, "MMM DD, YYYY")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          {task.teamId && (
            <>
              <Separator />
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Team ID: {task.teamId}
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
