import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.scss'
import Homepage from './pages/Homepage/Homepage'
import Header from './layouts/Header/Header'
import ReceiveProduct from './pages/ReceiveProduct/ReceiveProduct'
import DeliveryProduct from './pages/DeliveryProduct/DeliveryProduct'
import { StockBalance } from './pages/Stock/StockBalance'
import ProductPage from './pages/Product/ProductPage'
import EditProduct from './pages/Product/EditItem'
import LoginPage from './pages/LoginPage/LoginPage'
import AuthRoute from './components/AuthRoute/AuthRoute'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={
              <AuthRoute>
                  <Homepage />
              </AuthRoute>
            } />
            <Route path='/authen' element={<LoginPage />} />
            <Route path='/receive-product' element={
              <AuthRoute>
                <ReceiveProduct />
              </AuthRoute>
            } />
            <Route path='/delivery-product' element={
              <AuthRoute>
                <DeliveryProduct />
              </AuthRoute>
            } />
            <Route path='/stock-balance' element={
              <AuthRoute>
                <StockBalance />
              </AuthRoute>
            } />
            <Route path='/products' element={
              <AuthRoute>
                <ProductPage />
              </AuthRoute>
            } />
            <Route path='/products/:id' element={
              <AuthRoute>
                <EditProduct />
              </AuthRoute>
            } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
