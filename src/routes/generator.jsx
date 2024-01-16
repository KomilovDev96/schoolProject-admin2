import { Navigate } from "react-router-dom"
import React, { lazy } from "react"

// generate that lazy imported page
const generatePage = (folderPath, title, Layout) => {
	const Page = lazy(() => import(`../pages/${folderPath}/${folderPath}.jsx`))
	return Layout ? <Layout title={title}><Page /></Layout> : <Page />
}

// generate redirect component
const redirectTo = (path, replace) => {
	return <Navigate to={path} replace={replace} />
}

export { redirectTo }
export default generatePage