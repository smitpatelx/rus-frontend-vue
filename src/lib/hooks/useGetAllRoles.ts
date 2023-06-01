import { useQuery } from '@tanstack/vue-query'
import UserApi from '@/api/users';

const useGetAllRoles = () => {
  const getAllRolesQ = useQuery({
    queryKey: ['get-all-roles'],
    queryFn: async () => {
      const res = UserApi.getAllRoles();
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
    getAllRolesQ,
  };
};

export default useGetAllRoles;