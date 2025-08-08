'use server';

import { createTask, updateTask, deleteTask, updateTaskStatus, reassignTask } from '@/lib/task-api';
import { CreateTaskData, UpdateTaskData } from '@/types/task';
import { revalidatePath } from 'next/cache';

// Create new task
export async function createTaskAction(taskData: CreateTaskData) {
  try {
  
    const result = await createTask(taskData);
    revalidatePath('/manager/tasks');
    return result;
  } catch (error) {
    console.error('Create task failed:', error);
    return {
      success: false,
      message: 'Failed to create task',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
}

// Update existing task
export async function updateTaskAction(taskId: string, taskData: UpdateTaskData) {
  try {
    const result = await updateTask(taskId, taskData);
    revalidatePath('/manager/tasks');
    return result;
  } catch (error) {
    console.error('Update task failed:', error);
    return {
      success: false,
      message: 'Failed to update task',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
}

// Delete task
export async function deleteTaskAction(taskId: string) {
  try {
    const result = await deleteTask(taskId);
    revalidatePath('/manager/tasks');
    return result;
  } catch (error) {
    console.error('Delete task failed:', error);
    return {
      success: false,
      message: 'Failed to delete task',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
}

// Update task status
export async function updateTaskStatusAction(taskId: string, status: string) {
  try {
    console.log('Update task status:', taskId, status);
    const result = await updateTaskStatus(taskId, status);
    revalidatePath('/manager/tasks');
    return result;
  } catch (error) {
    console.error('Update task status failed:', error);
    return {
      success: false,
      message: 'Failed to update task status',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
}

// Reassign task
export async function reassignTaskAction(taskId: string, assignedTo: string) {
  try {
    const result = await reassignTask(taskId, assignedTo);
    revalidatePath('/manager/tasks');
    return result;
  } catch (error) {
    console.error('Reassign task failed:', error);
    return {
      success: false,
      message: 'Failed to reassign task',
      error: { code: 'NETWORK_ERROR', description: 'Network error occurred' }
    };
  }
} 