import { ConfigProvider } from 'antd'
import React from 'react'

export const theme = {
    token: {
        colorPrimary: "#201C57",
        
    }
}


const ThemeProvider = ({ children }) => {

    return (
        <ConfigProvider theme={theme}>
            {children}
        </ConfigProvider>
    )
}

export default ThemeProvider