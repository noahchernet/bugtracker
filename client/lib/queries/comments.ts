import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { commentApi, type Comment } from "@/lib/api";
import { ticketKeys } from "./tickets";

// Query keys
export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (ticketId: string) => [...commentKeys.lists(), ticketId] as const,
};

// Fetch comments for a ticket
export function useComments(
  ticketId: string,
  options?: Omit<UseQueryOptions<Comment[]>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: commentKeys.list(ticketId),
    queryFn: () => commentApi.getByTicketId(ticketId),
    enabled: !!ticketId,
    ...options,
  });
}

// Create comment mutation
export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketId, data }: { ticketId: string; data: FormData }) =>
      commentApi.create(ticketId, data),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(ticketId) });
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(ticketId) });
    },
  });
}

// Update comment mutation
export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      ticketId,
      data,
    }: {
      commentId: string;
      ticketId: string;
      data: FormData;
    }) => commentApi.update(commentId, data),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(ticketId) });
    },
  });
}

// Delete comment mutation
export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      ticketId,
    }: {
      commentId: string;
      ticketId: string;
    }) => commentApi.delete(commentId),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(ticketId) });
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(ticketId) });
    },
  });
}
