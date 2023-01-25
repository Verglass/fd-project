import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addScore } from './scoresSlice'
import { selectLanguage } from '../layout/languageSlice'

const ScoreInput = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()

    const polish = useSelector(selectLanguage)

    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    return (
        <div className='flex flex-col items-center gap-y-2'>
            <div className='flex text-3xl'>
                {[...Array(5)].map((_, idx) => {
                    idx += 1
                    return (
                        <button
                            key={idx}
                            onClick={() => setRating(idx)}
                            onMouseEnter={() => setHover(idx)}
                            onMouseLeave={() => setHover(rating)}
                            onDoubleClick={() => {
                                setRating(0);
                                setHover(0);
                            }}
                        >
                            <div className={idx <= ((rating && hover) || hover) ? 'text-amber-500' : ''}>&#9733;</div>
                        </button>
                    )
                }
                )}
            </div>
            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 text-xl p-2 rounded' onClick={() => dispatch(addScore({ score: rating, productId: productId }))}>{polish ? 'Zostaw ocenę' : 'Leave a rating'}</button>
        </div>
    )
}

export default ScoreInput