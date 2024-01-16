import api from "@/api";
import { ADD_USER } from "@/utils/variables";
export const userAddservises = {
    async create(data) {
        const response = await api.post(ADD_USER, data);
        return response;
    },
};
