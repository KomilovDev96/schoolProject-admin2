import { useMutation } from "react-query";
import api from "@/api";

const useApiMutation = (
	url = "",
	options,
	params,
) => {
	const mutation = useMutation(
		async (data) => await api.post(url, data, { params }), {
		...options,
	});
	return { ...mutation }
}

export default useApiMutation;