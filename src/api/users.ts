import axios, { rusN } from '@/lib/axios';

const getHeaders = () => ({
  headers: {
    'X-Wp-Nonce': rusN?.nonce || '',
  },
});

const editUser = async (data: any) => axios
  .put(
    `/wp-json/rsu/v1/user/${data.id}`,
    data,
    {
      ...getHeaders(),
    }
  );

const getAllUsers = async (data: any) => axios
  .get(
    '/wp-json/rsu/v1/all',
    {
      ...getHeaders(),
    }
  );

const getUser = async (id: number) => axios
  .get(
    `/wp-json/rsu/v1/user/${id}`,
    {
      ...getHeaders(),
    }
  );

const deleteUser = async (id: number) => axios
  .delete(
    `/wp/v2/users/${id}`,
    {
      ...getHeaders(),
    }
  );

export default {
  editUser,
  getAllUsers,
  getUser,
  deleteUser,
}