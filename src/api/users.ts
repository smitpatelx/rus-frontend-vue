import axios from '@/lib/axios';

const editUser = async (data: any) => axios
  .put(
    `/wp-json/rsu/v1/user/${data.id}`,
    data,
  );

const getAllUsers = async (data: any) => axios
  .get(
    '/wp-json/rsu/v1/all',
    {
      params: {
        ...data,
      },
    }
  );

const getUser = async (id: number) => axios
  .get(
    `/wp-json/rsu/v1/user/${id}`,
  );

const deleteUser = async (id: number) => axios
  .delete(
    `/wp/v2/users/${id}`,
  );

export default {
  editUser,
  getAllUsers,
  getUser,
  deleteUser,
}