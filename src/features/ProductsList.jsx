import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllProducts, productsSet } from './productsSlice'
import axios from '../../api/axios'

const ProductsList = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState(useSelector(selectAllProducts))

  useEffect(() => {
    if (!products.length) {
      axios.get('/products')
        .then(res => {
          setProducts(res.data.products)
          dispatch(productsSet(res.data.products))
        }
      )
    }
  }, [])
  
  const renderedProducts = products.map(product => (
    <article key={product.id}>
        <h3 className="text-3xl underline">{product.title}</h3>
    </article>
  ))

  return (
    <section>
        <h2 className="text-3xl font-bold underline">Products</h2>
        {renderedProducts}
    </section>
  )
}

export default ProductsList