import { Routes, Route } from 'react-router-dom'
import Layout from './features/layout/Layout'
import ProductsList from './features/products/ProductsList'
import ProductForm from './features/products/ProductForm'
import ProductDetails from './features/productDetails/ProductDetails'
import CommentsList from './features/comments/CommentsList'
import ScoresList from './features/scores/ScoresList'
import DeliveryOptionsList from './features/deliveryOptions/DeliveryOptionsList'
import Cart from './features/cart/Cart'
import CartForm from './features/cart/CartForm'
import CartConfirm from './features/cart/CartConfirm'
import Stats from './features/layout/Stats'

function App() {
  return (
    <div className="text-zinc-800 mt-14 flex justify-center">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ProductsList />} />
          <Route path=':page' element={<ProductsList />} />
          <Route path=':productId/details' element={<ProductDetails />} />
          <Route path=':productId/edit' element={<ProductForm edit={true} />} />
          <Route path=':productId/scores' element={<ScoresList />} />
          <Route path=':productId/comments/:page' element={<CommentsList />} />
          <Route path='/deliveryOptions' element={<DeliveryOptionsList />} />
          <Route path='add' element={<ProductForm edit={false} />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<CartForm />} />
          <Route path='confirm' element={<CartConfirm />} />
          <Route path='stats' element={<Stats />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
