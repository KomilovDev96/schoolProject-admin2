import { SCHOOL_GET_ALL, USER_DATA } from '@/utils/variables';
import api from "@/api";

export const MaktabService = {
    async getAll(id, admin) {
        if (admin === "admin") {
            return await api.get(`${SCHOOL_GET_ALL}`);
        } else {
            return await api.get(`${SCHOOL_GET_ALL}/${id}`);
        }
    },
};
