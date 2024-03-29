import { useMutation } from '@tanstack/vue-query';
import UserApi from '@/api/users';
import type { EditUserReq } from '@/interfaces/user';

const useEditUser = () => {
  const editUserM = useMutation({
    mutationKey: ['edit-user'],
    mutationFn: async (data: EditUserReq) => {
      const res = await UserApi.editUser(data);
      return res;
    },
  });

  return {
    editUserM,
  };
};

export default useEditUser;
