import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCart, fetchCart, deleteProductFromCart, updateProductFromCart } from './cartSlice'
import { selectDeliveryOptions, fetchDeliveryOptions } from '../deliveryOptions/deliveryOptionsSlice'
import { selectLanguage } from '../layout/languageSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'


const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(selectCart)
    const deliveryOptions = useSelector(selectDeliveryOptions)
    const polish = useSelector(selectLanguage)

    const [rate, setRate] = useState('')

    useEffect(() => {
        if (!cart.length) dispatch(fetchCart())
        if (!deliveryOptions.length) dispatch(fetchDeliveryOptions())
        axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/usd.json')
            .then(res => setRate(res.data.usd))
    }, [])

    return (
        <div className='container flex justify-center'>
            {cart.length
                ?
                <div className='bg-zinc-200 text-xl rounded mt-16 px-8 py-6 flex flex-col divide-y-2 divide-zinc-400'>
                    {cart.map(entry => (
                        <div className='h-44 py-5 flex justify-between' key={entry._id}>
                            <div className='flex gap-x-5'>
                                <img className='h-full' src={entry.product.picture} alt={entry.product.title} />
                                <div>
                                    <button className='text-2xl font-bold mb-3' onClick={() => navigate(`/${entry.product._id}/details`)}>{entry.product.title}</button>
                                    <div className='text-zinc-500'>{polish ? 'Dostępne:' : 'In stock:'} {entry.product.quantity}</div>
                                </div>
                            </div>
                            <Formik
                                initialValues={{
                                    quantity: entry.quantity,
                                }}
                                validationSchema={Yup.object({
                                    quantity: Yup.number()
                                        .integer('Must be a whole number')
                                        .max(entry.product.quantity, 'Cannot order more than is available in stock')
                                        .moreThan(0, 'Must be greater than zero')
                                        .required('Required'),
                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    values.cartId = entry._id
                                    await dispatch(updateProductFromCart(values))
                                    setSubmitting(false)
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className='h-full flex items-center gap-x-5'>
                                        <div className='flex flex-col gap-y-0.5'>
                                            <Field name="quantity" type="number" />
                                            <ErrorMessage className='text-rose-500' component="span" name="quantity" />
                                            <div className='font-bold text-3xl text-right'>{polish ? 'Cena:' : 'Price:'} ${entry.product.price * entry.quantity}</div>
                                        </div>
                                        <div className='flex flex-col gap-y-5'>
                                            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit p-2 rounded' type="submit" disabled={isSubmitting}>{polish ? 'Zapisz' : 'Save'}</button>
                                            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit p-2 rounded' type="button" onClick={() => dispatch(deleteProductFromCart(entry._id))}>{polish ? 'Usuń' : 'Remove'}</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    ))}
                    <div className='py-5 flex justify-end gap-x-5'>
                        <div className='text-right'>
                            <div className='text-3xl font-bold'>{polish ? 'Razem:' : 'Total:'} ${cart.reduce((acc, entry) => acc + entry.product.price * entry.quantity, 0)}</div>
                            {rate && <div className='text-3xl font-bold'>{polish ? 'W euro:' : 'In euro:'} €{Math.round(cart.reduce((acc, entry) => acc + entry.product.price * entry.quantity, 0) * rate)}</div>}
                            {deliveryOptions.length && <div className='text-3xl font-bold'>{polish ? 'Z dostawą:' : 'With delivery:'} ${cart.reduce((acc, entry) => acc + entry.product.price * entry.quantity, deliveryOptions[0].price)}</div>}
                        </div>
                        <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit p-2 rounded' onClick={() => navigate('/checkout')}>{polish ? 'Kasa' : 'Checkout'}</button>
                    </div>
                </div>
                :
                <h1 className='mt-32 text-8xl font-bold'>{polish ? 'Koszyk jest pusty' : 'Cart is empty'}</h1>
            }
        </div>
    )
}

export default Cart