import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./RootReduser";

const store = configureStore({
	devTools: true,
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
	}),
});
export default store;