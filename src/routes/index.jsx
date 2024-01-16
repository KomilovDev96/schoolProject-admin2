import AppLayout from "@/layout"
import page, { redirectTo } from './generator'

export const publicRoutes = [
    { path: "/login", element: page("LoginPage") },
    { path: "*", element: redirectTo("/login", true) },
]

export const privateRoute = [
    { path: "/", element: page("AsosiySahifaPage", "Асосий сахифа", AppLayout) },
    { path: "/users", element: page("UserPage", "Фойдаланувчилар", AppLayout) },
    { path: "/users/add", element: page("UserAdd", "Фойдаланувчи кущищ", AppLayout) },
    { path: "/maktab", element: page("MaktabPage", "Мактаб", AppLayout) },
    { path: "/maktab/add", element: page("MaktabADD", "Мактаб кушиш", AppLayout) },
    { path: "/maktab/:id", element: page("MaktabRead", "Мактаб куриш", AppLayout) },
    { path: "/users/update/:id", element: page("UserUpdatePage", "Узгартириш Userni", AppLayout) },
    { path: "/login", element: redirectTo("/", true) },
    { path: "*", element: page("NotFoundPage") }
]
export const UserPrivateRoute = [
    { path: "/", element: page("AsosiySahifaPage", "Асосий сахифа", AppLayout) },
    { path: "/maktab", element: page("MaktabPage", "Мактаб", AppLayout) },
    { path: "/maktab/add", element: page("MaktabADD", "Мактаб кушиш", AppLayout) },
    { path: "/maktab/:id", element: page("MaktabRead", "Мактаб куриш", AppLayout) },
    { path: "/login", element: redirectTo("/", true) },
    { path: "*", element: page("NotFoundPage") }
]