import { useQuery } from '@tanstack/vue-query';
import UserApi from '@/api/users';

const useGetAllUsers = (data: unknown) => {
  const getAllUsersQ = useQuery({
    queryKey: ['get-all-user', data],
    queryFn: async () => {
      const res = UserApi.getAllUsers(data);
      return res;
    },
    enabled: true,
    onSuccess: (data: any) => {
      // console.log(data);
    },
    onError: (error: any) => {
      // console.log(error);
    },
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    refetchOnMount: false,
  });

  return {
    getAllUsersQ,
  };
};

export default useGetAllUsers;
