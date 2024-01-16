import { useMutation, UseMutationOptions } from "react-query";
import { AxiosResponse } from "axios";
import api, { abortController } from "@/utils/api";

const useApiMutationID = (
    type,
    url = "",
    options = {},
    params = {}
) => {
    const mutation = useMutation(
        async ({ id, data }) =>
            await api[type](`${url}/${id}`, data, {
                params,
                signal: abortController.signal,
            }),
        {
            ...options,
        }
    );
    return { ...mutation };
};

export default useApiMutationID;
