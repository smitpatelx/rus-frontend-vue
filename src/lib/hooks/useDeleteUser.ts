import { useMutation } from '@tanstack/vue-query';
import UserApi from '@/api/users';

const useDeleteUser = () => {
  const deleteUserM = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (id: number) => {
      const res = UserApi.deleteUser(id);
      return res;
    },
  });

  return {
    deleteUserM,
  };
};

export default useDeleteUser;
