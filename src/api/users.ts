import type { GetAllRoleRes } from '@/interfaces/roles';
import type { GetAllUserRes, GetUserRes } from '@/interfaces/user';
import axios, { rusN } from '@/lib/axios';
import type { AxiosResponse } from 'axios';

const getHeaders = () => ({
  headers: {
    'X-Wp-Nonce': rusN?.nonce || '',
  },
});

const editUser = async (data: any) =>
  axios.put(`rus/v1/user/${data.id}`, data, {
    ...getHeaders(),
  });

const getAllUsers = async (data: any): Promise<AxiosResponse<GetAllUserRes, unknown>> =>
  axios.get('rus/v1/all', {
    ...getHeaders(),
  });

const getUser = async (id: number): Promise<AxiosResponse<GetUserRes, unknown>> =>
  axios.get(`rus/v1/user/${id}`, {
    ...getHeaders(),
  });

const deleteUser = async (id: number) =>
  axios.delete(`rus/v1/user/${id}`, {
    ...getHeaders(),
  });

const getAllRoles = async (): Promise<AxiosResponse<GetAllRoleRes, unknown>> =>
  axios.get(`rus/v1/roles`, {
    ...getHeaders(),
  });

export default {
  editUser,
  getAllUsers,
  getUser,
  deleteUser,
  getAllRoles,
};
