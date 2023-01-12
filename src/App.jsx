import { Routes, Route } from 'react-router-dom'
import ProductsList from './features/ProductsList'
import AddProductForm from './features/AddProductForm'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ProductsList />} />
        <Route path='/add' element={<AddProductForm />} />
      </Routes>
    </div>
  )
}

export default App
