import { useMutation } from '@tanstack/vue-query';
import UserApi from '@/api/users';
import type { EditUserReq } from '@/interfaces/user';

const useEditUser = () => {
  const editUserM = useMutation({
    mutationKey: ['edit-user'],
    mutationFn: async (data: EditUserReq) => {
      const res = UserApi.editUser(data);
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
    editUserM,
  };
};

export default useEditUser;
