import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api/api.service';
import { Client } from '../types';

export const useClients = () => {
  return useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data } = await api.get('/clients');
      return data;
    },
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newClient: Partial<Client>) => {
      const { data } = await api.post('/clients', newClient);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};