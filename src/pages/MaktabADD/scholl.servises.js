import api from "@/api";
import { SCHOLL_CREATE_ADMIN } from "@/utils/variables";

export const addSChoolADmin = {
    async create(data) {
        const response = await api.post(SCHOLL_CREATE_ADMIN, data);
        return response;
    },
};
