// useUser.ts
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AUTH_USER_API } from '../constant/customer-url';
import apiMethodes from '../model/apimethods';
import { Customer } from '../interfaces/user-interface';

export const useUser = () => {
  return useQuery<Customer, AxiosError>({
    queryKey: ['user'],
    queryFn: () => apiMethodes.get<Customer>(AUTH_USER_API.AuthUser),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
