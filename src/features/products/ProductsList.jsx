import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAllProducts, getProductsStatus, fetchProducts } from './productsSlice'
import { selectAdmin } from '../layout/adminSlice'
import { selectLanguage } from '../layout/languageSlice'
import ProductsExcerpt from './ProductsExcerpt'
import ProductsFilters from './ProductsFilters'

const ProductsList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const page = Number(useParams().page) || 0

  const products = useSelector(selectAllProducts)
  const status = useSelector(getProductsStatus)
  const admin = useSelector(selectAdmin)
  const polish = useSelector(selectLanguage)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [])

  return (
    <div className='text-xl mt-4 container grid grid-cols-3'>
      <ProductsFilters />
      <div className='col-span-2'>
        <div className='flex flex-col justify-start'>
          {admin && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 mb-4 p-2 rounded' onClick={() => navigate('/add')}>{polish ? 'Dodaj Produkt' : 'Add Product'}</button>}
          <div className='bg-zinc-100 p-5'>
            {products.slice(page * 3, page * 3 + 3).map(product =>
              <ProductsExcerpt key={product._id} product={product} />
            )}
            <div className='flex justify-end gap-10'>
              {page > 0 && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${page - 1}`)}>{polish ? 'Poprzednia strona' : 'Previous'}</button>}
              {page + 1 < (products.length / 3) && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${page + 1}`)}>{polish ? 'Następna strona' : 'Next'}</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsList