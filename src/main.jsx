import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store/index.jsx'
import ThemeProvider from './provider/AntdProvider.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import "./style/globla.scss"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 3, // 3 minute
      retry: false,
      suspense: false,
      useErrorBoundary: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>

)
