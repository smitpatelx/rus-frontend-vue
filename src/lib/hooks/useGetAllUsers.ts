import { useQuery } from '@tanstack/vue-query';
import UserApi from '@/api/users';
import { useUserFilter } from '@/stores/user-filters';
import { storeToRefs } from 'pinia';

const useGetAllUsers = () => {
  const filterStore = useUserFilter();
  const { filters } = storeToRefs(filterStore);

  const getAllUsersQ = useQuery({
    queryKey: ['get-all-user', filters],
    queryFn: async () => {
      const res = await UserApi.getAllUsers(filters.value);
      return res;
    },
    select: (res) => res.data,
    enabled: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
    refetchOnMount: true,
  });

  return getAllUsersQ;
};

export default useGetAllUsers;
