import * as FetchUtils from "./common/fetch-utils";
import qs from "query-string";
import { Task, CreateTaskData, UpdateTaskData, TaskFilters, TasksResponse } from '@/types/task';
import { QueryParameters } from '@/types/common';


const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const buildTaskQueryString = (params: TaskFilters) => {
  const queryParams: QueryParameters = {};

  if (params.status) queryParams["status"] = params.status;
  if (params.priority) queryParams["priority"] = params.priority;
  if (params.search) queryParams["search"] = params.search;
  if (params.dueDate) queryParams["dueDateTo"] = params.dueDate;
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
  const response = await FetchUtils.get(`${API_BASE_URL}/tasks?${queryString}`, {
    isWithToken: true,
  });
  console.log(response);
  return response;
}


export async function getTaskById(taskId: string) {
  return await FetchUtils.get(`${API_BASE_URL}/tasks/${taskId}`, {
    isWithToken: true,
  });
}

export async function createTask(taskData: CreateTaskData) {
  return await FetchUtils.post(`${API_BASE_URL}/tasks`, taskData, {
    isWithToken: true,
  });
}

export async function updateTask(taskId: string, taskData: UpdateTaskData) {
  return await FetchUtils.patch(`${API_BASE_URL}/tasks/${taskId}`, taskData, {
    isWithToken: true,
  });
}

export async function deleteTask(taskId: string) {
  return await FetchUtils.deleteData(`${API_BASE_URL}/tasks/${taskId}`, {
    isWithToken: true,
  });
}

export async function updateTaskStatus(taskId: string, status: string) {
  return await FetchUtils.patch(`${API_BASE_URL}/tasks/${taskId}`, {
    status
  }, {
    isWithToken: true,
  });
}

export async function reassignTask(taskId: string, assignedTo: string) {
  return await FetchUtils.patch(`${API_BASE_URL}/tasks/${taskId}`, {
    assignedTo
  }, {
    isWithToken: true,
  });
} 