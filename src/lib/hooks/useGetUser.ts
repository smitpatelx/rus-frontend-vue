import { useQuery } from '@tanstack/vue-query';
import UserApi from '@/api/users';

const useGetUser = (data: unknown) => {
  const getUserQ = useQuery({
    queryKey: ['get-user', data],
    queryFn: async (data: any) => {
      const res = UserApi.getUser(data);
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
    getUserQ,
  };
};

export default useGetUser;
