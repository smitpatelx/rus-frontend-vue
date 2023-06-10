import { useQuery } from '@tanstack/vue-query';
import UserApi from '@/api/users';

const useGetAllUsers = (filters: unknown) => {
  const getAllUsersQ = useQuery({
    queryKey: ['get-all-user', filters],
    queryFn: async () => {
      const res = UserApi.getAllUsers(filters);
      return res;
    },
    enabled: true,
    onSuccess: (res) => {
      // console.log(res);
    },
    onError: (error) => {
      // console.log(error);
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    refetchOnMount: false,
  });

  return getAllUsersQ;
};

export default useGetAllUsers;
