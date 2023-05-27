import { useQuery } from '@tanstack/vue-query'
import UserApi from '@/api/users';

const useGetAllUsers = (data: unknown) => {
  const getAllUsersQ = useQuery({
    queryKey: ['get-all-user', data],
    queryFn: async (data: any) => {
      const res = UserApi.getAllUsers(data);
      return res;
    },
    enabled: true,
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return {
    getAllUsersQ,
  };
};

export default useGetAllUsers;