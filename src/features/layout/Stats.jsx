import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLanguage } from './languageSlice'
import { selectAllProducts, fetchProducts } from '../products/productsSlice'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

const Stats = () => {
    const dispatch = useDispatch()

    const polish = useSelector(selectLanguage)
    const products = useSelector(selectAllProducts)

    useEffect(() => {
        if (!products.length ) dispatch(fetchProducts())
    }, [])

    return (
        <div className='bg-zinc-200 text-xl rounded my-16 px-8 py-6 container flex flex-col justify-center gap-y-5 divide-y-2 divide-zinc-300'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl font-bold my-2'>{polish ? 'Cena' : 'Price'}</h1>
                <div>
                    <div className='flex'>
                        <LineChart width={700} height={250} data={products}>
                            <Line type="monotone" dataKey="price" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" />
                            <YAxis />
                        </LineChart>
                        <div className='p-4 flex flex-col gap-y-3'>
                            <div>
                                <p>
                                    {polish ? 'Najdroższy produkt: ' : 'Most expensive product: '}
                                </p>
                                <p className='font-bold'>
                                    ${products.reduce((prev, current) => prev.price > current.price ? prev : current, 0).price + ' - '}
                                    {products.reduce((prev, current) => prev.price > current.price ? prev : current, 0).title }
                                </p>
                            </div>
                            <div>
                                <p>
                                    {polish ? 'Najtańszy produkt: ' : 'Cheapest product: '}
                                </p>
                                <p className='font-bold'>
                                    ${products.reduce((prev, current) => prev.price < current.price ? prev : current, 0).price + ' - '}
                                    {products.reduce((prev, current) => prev.price < current.price ? prev : current, 0).title}
                                </p>
                            </div>
                            <div>
                                <p>
                                    {polish ? 'Średnia cena produktów: ' : 'Average price of products: '}
                                </p>
                                <p className='font-bold'>
                                    ${products.reduce((prev, current) => prev + current.price, 0) / products.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl font-bold my-2'>{polish ? 'Ilość' : 'Quantity'}</h1>
                <div>
                    <div className='flex'>
                        <LineChart width={700} height={250} data={products}>
                            <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" />
                            <YAxis />
                        </LineChart>
                        <div className='p-4 flex flex-col gap-y-3'>
                            <div>
                                <p>
                                    {polish ? 'Najwyższa ilość: ' : 'Highest quantity: '}
                                </p>
                                <p className='font-bold'>
                                    {products.reduce((prev, current) => prev.quantity > current.quantity ? prev : current, 0).quantity + ' - '}
                                    {products.reduce((prev, current) => prev.quantity > current.quantity ? prev : current, 0).title }
                                </p>
                            </div>
                            <div>
                                <p>
                                    {polish ? 'Najniższa ilość: ' : 'Lowest quantity: '}
                                </p>
                                <p className='font-bold'>
                                    {products.reduce((prev, current) => prev.quantity < current.quantity ? prev : current, 0).quantity + ' - '}
                                    {products.reduce((prev, current) => prev.quantity < current.quantity ? prev : current, 0).title}
                                </p>
                            </div>
                            <div>
                                <p>
                                    {polish ? 'Średnia ilość produktów: ' : 'Average quantity of products: '}
                                </p>
                                <p className='font-bold'>
                                    {products.reduce((prev, current) => prev + current.quantity, 0) / products.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats