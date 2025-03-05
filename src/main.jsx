import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './components/redux/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}> 
    {/* <App /> */}
  
      <App/>

    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
