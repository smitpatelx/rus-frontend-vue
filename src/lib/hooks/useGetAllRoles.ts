import { useQuery } from '@tanstack/vue-query';
import UserApi from '@/api/users';
import { notify } from '@kyvg/vue3-notification';

const useGetAllRoles = () => {
  const getAllRolesQ = useQuery({
    queryKey: ['get-all-roles'],
    queryFn: async () => {
      const res = await UserApi.getAllRoles();
      return res;
    },
    enabled: true,
    onError: (e) => {
      const error = e as {
        response: {
          data: {
            message: string;
          };
        };
      };

      notify({
        title: 'Error',
        text: error?.response?.data?.message || 'Something went wrong.',
        type: 'rus-error',
      });
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
