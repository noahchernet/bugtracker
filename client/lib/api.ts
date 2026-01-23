import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token interceptor
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Types
export interface User {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  sub: string;
}

export interface Ticket {
  _id: string;
  title: string;
  postedByUser: User;
  description: string;
  severity: number;
  comments: string[];
  solved: boolean;
  attachments?: string;
  solution?: string;
  due?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  ticketId: string;
  postedByUser: User;
  description: string;
  attachments?: string;
  solutionToTicket?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Ticket API
export const ticketApi = {
  getAll: async (params?: {
    title?: string;
    severity?: number;
    solved?: boolean;
  }) => {
    const response = await api.get<Ticket[]>("/tickets", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await api.post<Ticket>("/tickets", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  update: async (id: string, data: FormData) => {
    const response = await api.put<Ticket>(`/tickets/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
  },
};

// Comment API
export const commentApi = {
  getByTicketId: async (ticketId: string) => {
    const response = await api.get<Comment[]>(`/comments/${ticketId}`);
    return response.data;
  },

  create: async (ticketId: string, data: FormData) => {
    const response = await api.post(`/comments/${ticketId}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  update: async (commentId: string, data: FormData) => {
    const response = await api.put(`/comments/${commentId}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  delete: async (commentId: string) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  },
};
