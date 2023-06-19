import { useQuery } from '@tanstack/vue-query';
import UserApi from '@/api/users';
import { useUserFilter } from '@/stores/user-filters';

const useGetAllUsers = () => {
  const filterStore = useUserFilter();

  const getAllUsersQ = useQuery({
    queryKey: ['get-all-user', filterStore.filters],
    queryFn: async () => {
      const res = await UserApi.getAllUsers(filterStore.filters);
      return res;
    },
    enabled: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    refetchOnMount: true,
  });

  return getAllUsersQ;
};

export default useGetAllUsers;
