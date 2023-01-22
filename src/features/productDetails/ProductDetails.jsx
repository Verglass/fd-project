import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct } from '../products/productsSlice'
import { selectProductDetailsById, fetchDetails } from './productDetailsSlice'
import { selectAvgScoreById, fetchScores } from '../scores/scoresSlice'
import { selectDeliveryOptions, fetchDeliveryOptions } from '../deliveryOptions/deliveryOptionsSlice'
import { selectAdmin } from '../layout/adminSlice'
import { selectUserToken, addProductToCart } from '../cart/cartSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ScoreDisplay from '../scores/ScoreDisplay'
import ScoreInput from '../scores/ScoreInput'
import * as Yup from 'yup'


const ProductDetails = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const product = useSelector(selectProductDetailsById(productId))
    const avgScore = useSelector(selectAvgScoreById(productId))
    const deliveryOptions = useSelector(selectDeliveryOptions)
    const admin = useSelector(selectAdmin)
    const userToken = useSelector(selectUserToken)

    useEffect(() => {
        if (!product) dispatch(fetchDetails(productId))
        if (!avgScore) dispatch(fetchScores(productId))
        if (!deliveryOptions.length) dispatch(fetchDeliveryOptions())
    }, [])

    return (
        <>
            {product &&
                <div className='bg-zinc-200 mt-10 p-6 container flex flex-col justify-cneter items-center gap-y-6 divide-y-2 divide-zinc-400 rounded'>
                    <div className='text-center text-3xl font-bold'>{product.title}</div>
                    <div className='px-32 py-6 grid grid-cols-3 gap-x-32'>
                        <img className='w-full col-span-2' src={product.picture} alt={product.title} />
                        <div className='w-fit flex flex-col justify-between items-end'>
                            <Formik
                                initialValues={{
                                    quantity: 1,
                                }}
                                validationSchema={Yup.object({
                                    quantity: Yup.number()
                                        .integer('Must be a whole number')
                                        .max(product.quantity, 'Cannot order more than is available in stock')
                                        .moreThan(0, 'Must be greater than zero')
                                        .required('Required'),
                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    values.productId = productId
                                    values.userToken = userToken
                                    await dispatch(addProductToCart(values))
                                    setSubmitting(false)
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className='text-xl flex flex-col items-end gap-x-5'>
                                        <div className='flex flex-col gap-y-0.5'>
                                            <ErrorMessage className='text-rose-500' component="span" name="quantity" />
                                            <Field name="quantity" type="number" />
                                        </div>
                                        <div className='flex flex-col gap-y-5'>
                                            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit p-2 rounded' type="submit" disabled={isSubmitting}>Add to cart</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className='text-right'>
                                <div className='font-bold  text-zinc-600'>Price: </div>
                                <div className='text-4xl font-bold'>${product.price}</div>
                                <div>
                                    <div className='font-bold  text-zinc-600'>Avrage rating: </div>
                                    {avgScore !== undefined &&
                                        <div className='flex text-3xl gap-x-2'>
                                            <ScoreDisplay score={avgScore} />
                                            {avgScore.toFixed(1)}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='flex items-center gap-x-6'>
                                {admin && <button className='bg-zinc-700 hover:bg-zinc-600 h-fit text-zinc-50 p-2 rounded' onClick={() => navigate('/deliveryOptions')}>Delivery options</button>}
                                <div className='flex flex-col items-end'>
                                    <div className='font-bold  text-zinc-600'>In stock: {product.quantity}</div>
                                    <div className='font-bold text-zinc-600'>Delivery options: </div>
                                    {deliveryOptions.map(option => (
                                        <div className='flex gap-x-2 text-zinc-500' key={option._id}>
                                            <div>{option.method}</div>
                                            <div className='font-bold'>${option.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='font-bold'>Description: </div>
                        <div>{product.longDescription}</div>
                    </div>
                    <div className='text-xl w-full flex justify-between'>
                        <div className='flex items-end gap-x-6'>
                            {admin && <button className='bg-rose-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => { dispatch(deleteProduct(productId)); navigate('/') }}>Delete</button>}
                            {admin && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${productId}/edit`)}>Edit</button>}
                        </div>
                        <div className='flex items-end gap-x-6'>
                            {admin && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${productId}/scores`)}>Scores</button>}
                            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${productId}/comments/0`)}>Comments</button>
                            <ScoreInput />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductDetails