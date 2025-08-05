export type RequestOptions = {
  isWithToken: boolean;
};

// HTTP Methods for client-side
export const get = async (url: string, requestOptions: RequestOptions) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (requestOptions.isWithToken) {
    // For client-side, we'll need to get token from cookies or localStorage
    // This is a simplified version - you might want to implement proper token handling
    const token = localStorage.getItem('token') || '';
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const post = async (
  url: string,
  body: any,
  requestOption: RequestOptions
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (requestOption.isWithToken) {
    const token = localStorage.getItem('token') || '';
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const patch = async (
  url: string,
  body: any,
  requestOption: RequestOptions
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (requestOption.isWithToken) {
    const token = localStorage.getItem('token') || '';
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const put = async (
  url: string,
  body: any,
  requestOption: RequestOptions
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (requestOption.isWithToken) {
    const token = localStorage.getItem('token') || '';
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const deleteData = async (
  url: string,
  requestOption: RequestOptions,
  body?: any
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (requestOption.isWithToken) {
    const token = localStorage.getItem('token') || '';
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const fetchOptions: RequestInit = {
    method: 'DELETE',
    headers,
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}; 