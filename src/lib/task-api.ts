import * as FetchUtils from "./common/fetch-utils";
import qs from "query-string";
import { Task, CreateTaskData, UpdateTaskData, TaskFilters, TasksResponse } from '@/types/task';
import { QueryParameters } from '@/types/common';


const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || 'http://localhost:3001';

const buildTaskQueryString = (params: TaskFilters) => {
  const queryParams: QueryParameters = {};

  if (params.status) queryParams["status"] = params.status;
  if (params.priority) queryParams["priority"] = params.priority;
  if (params.assignedTo) queryParams["assignedTo"] = params.assignedTo;
  if (params.search) queryParams["search"] = params.search;
  if (params.dueDate) queryParams["dueDateFrom"] = params.dueDate;
  if (params.page) queryParams["page"] = params.page.toString();
  if (params.limit) queryParams["limit"] = params.limit.toString();

  return qs.stringify(queryParams, {
    arrayFormat: "comma",
    skipNull: true,
    skipEmptyString: true,
    encode: false,
  });
};

export async function getAllTasks(params: TaskFilters = {}) {
  const queryString = buildTaskQueryString(params);
  console.log("queryString :",queryString)
  const url = `${API_BASE_URL}/tasks${queryString ? `?${queryString}` : ''}`;
  const response = await FetchUtils.get(url, {
    isWithToken: true,
  });
  return response;
}

export async function getTaskById(taskId: string) {
  const response = await FetchUtils.get(`${API_BASE_URL}/tasks/${taskId}`, {
    isWithToken: true,
  });
  
  return response;
}

export async function createTask(taskData: CreateTaskData) {
  const response = await FetchUtils.post(`${API_BASE_URL}/tasks`, taskData, {
    isWithToken: true,
  });
  return response;
}

export async function updateTask(taskId: string, taskData: UpdateTaskData) {
  const response = await FetchUtils.patch(`${API_BASE_URL}/tasks/${taskId}`, taskData, {
    isWithToken: true,
  });
  return response;
}

export async function deleteTask(taskId: string) {
  const response = await FetchUtils.deleteData(`${API_BASE_URL}/tasks/${taskId}`, {
    isWithToken: true,
  });
  
  return response;
}

export async function updateTaskStatus(taskId: string, status: string) {
  const response = await FetchUtils.patch(`${API_BASE_URL}/tasks/${taskId}`, {
    status
  }, {
    isWithToken: true,
  });
  return response;
}

export async function reassignTask(taskId: string, assignedTo: string) {
  console.log("taskId :",taskId)
  console.log("assignedTo :",assignedTo)
  const response = await FetchUtils.patch(`${API_BASE_URL}/tasks/${taskId}`, {
    assignedTo
  }, {
    isWithToken: true,
  });
  
  return response;
} 