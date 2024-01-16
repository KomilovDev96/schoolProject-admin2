import { useQuery } from "react-query";
import api from "../api";

const useApi = (url = "", options, params) =>
	//@ts-ignore
	useQuery({
		queryKey: [url, { ...params }],
		queryFn: () => api.get(url, { params }),
		...options,
	});
export default useApi;