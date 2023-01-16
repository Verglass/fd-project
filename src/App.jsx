import { Routes, Route } from 'react-router-dom'
import Layout from './features/layout/Layout'
import ProductsList from './features/products/ProductsList'
import AddProductForm from './features/products/AddProductForm'
import ProductDetails from './features/productDetails/ProductDetails'
import CommentsList from './features/comments/CommentsList'
import ScoresList from './features/scores/ScoresList'
import DeliveryOptionsList from './features/deliveryOptions/DeliveryOptionsList'

function App() {
  return (
    <div className="text-zinc-800 mt-14 flex justify-center">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ProductsList />} />
          <Route path=':page' element={<ProductsList />} />
          <Route path=':productId/details' element={<ProductDetails />} />
          <Route path=':productId/scores' element={<ScoresList />} />
          <Route path=':productId/comments/:page' element={<CommentsList />} />
          <Route path='/deliveryOptions' element={<DeliveryOptionsList />} />
          <Route path='add' element={<AddProductForm />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
