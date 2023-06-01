import type { GetAllRoleRes } from '@/interfaces/roles';
import type { GetAllUserRes } from '@/interfaces/user';
import axios, { rusN } from '@/lib/axios';
import type { AxiosResponse } from 'axios';

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

const getAllUsers = async (data: any): Promise<AxiosResponse<GetAllUserRes, unknown>> => axios
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
    `/wp-json/v2/users/${id}`,
    {
      ...getHeaders(),
    }
  );

const getAllRoles = async (): Promise<AxiosResponse<GetAllRoleRes, unknown>> => axios
  .get(
    `/wp-json/rus/v2/roles`,
    {
      ...getHeaders(),
    }
  );

export default {
  editUser,
  getAllUsers,
  getUser,
  deleteUser,
  getAllRoles,
}