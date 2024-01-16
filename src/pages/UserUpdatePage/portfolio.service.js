import api from "@/api";
import { USER_UPDATE } from '@/utils/variables';
export const UsersService = {
  async update(id, data) {
    return await api.put(`${USER_UPDATE}/${id}`, data)
  },
};
