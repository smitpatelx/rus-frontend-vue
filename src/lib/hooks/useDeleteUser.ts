import { useMutation } from '@tanstack/vue-query';
import UserApi from '@/api/users';

const useDeleteUser = () => {
  const deleteUserM = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (id: number) => {
      const res = UserApi.deleteUser(id);
      return res;
    },
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return {
    deleteUserM,
  };
};

export default useDeleteUser;
