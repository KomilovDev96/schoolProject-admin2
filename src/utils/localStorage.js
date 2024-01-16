// get value from localStorage
export const getLocalStorage = (key) => {
	return localStorage.getItem(key)
}

// set value to localStorage
export const setLocalStorage = (key, value) => {
	return localStorage.setItem(key, JSON.stringify(value))
}

// remove item from localStorage
export const removeLocalStorage = (key) => {
	return localStorage.removeItem(key)
}

