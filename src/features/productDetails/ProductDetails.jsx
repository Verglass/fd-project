import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectProductDetailsById, fetchDetails } from './productDetailsSlice'
import { selectAvgScoreById, fetchScores } from '../scores/scoresSlice'
import { selectDeliveryOptions, fetchDeliveryOptions } from '../deliveryOptions/deliveryOptionsSlice'
import { selectAdmin } from '../layout/adminSlice'
import ScoreDisplay from '../scores/ScoreDisplay'
import ScoreInput from '../scores/ScoreInput'

const ProductDetails = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const product = useSelector(selectProductDetailsById(productId))
    const avgScore = useSelector(selectAvgScoreById(productId))
    const deliveryOptions = useSelector(selectDeliveryOptions)
    const admin = useSelector(selectAdmin)

    useEffect(() => {
        if (!product) dispatch(fetchDetails(productId))
        if (!avgScore) dispatch(fetchScores(productId))
        if (!deliveryOptions.length) dispatch(fetchDeliveryOptions())
    }, [])

    return (
        <>
            {product &&
                <div className='bg-zinc-200 mt-10 p-6 container flex flex-col justify-cneter items-center gap-y-6 divide-y-2 divide-zinc-400 rounded'>
                    <div className='w-full flex items-center'>
                        <div className='text-center text-3xl font-bold grow'>{product.title}</div>
                        <button className='bg-zinc-700 hover:bg-zinc-600 text-xl font-bold text-zinc-50 p-2 rounded'>Add to cart</button>
                    </div>
                    <div className='px-44 py-6 grid grid-cols-3'>
                        <img className='w-full col-span-2' src={product.picture} alt={product.title} />
                        <div className='flex flex-col justify-between items-end'>
                            <div className='text-right'>
                                <div className='text-3xl font-bold'>${product.price}</div>
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
                    <div className='text-xl w-full flex justify-end items-end gap-x-6'>
                        {admin && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${productId}/scores`)}>Scores</button>}
                        <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${productId}/comments/0`)}>Comments</button>
                        <ScoreInput />
                    </div>
                </div>
            }
        </>
    )
}

export default ProductDetails