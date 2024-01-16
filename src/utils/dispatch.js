import store from "@/store";
const { dispatch } = store;

// this function are useful for dispach store (instead of useDispatch)
export const setIsAuth = (payload) => {
	dispatch({ type: "auth/setIsAuth", payload });
};

export const setUserData = (payload) => {
	dispatch({ type: "auth/setUserData", payload });
};
