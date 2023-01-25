import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectScoresById, fetchScores, deleteScore } from './scoresSlice'
import { selectLanguage } from '../layout/languageSlice'
import ScoreDisplay from './ScoreDisplay'

const ScoresList = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const scores = useSelector(selectScoresById(productId))
    const polish = useSelector(selectLanguage)

    useEffect(() => {
        if (!scores) dispatch(fetchScores(productId))
    }, [])

    return (
        <div className='flex flex-col items-center'>
            <button className='text-3xl bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit w-fit my-16 p-2 rounded' onClick={() => navigate(`/${productId}/details`)}>{polish ? 'Wróć' : 'Go back'}</button>

            <div className='container flex flex-wrap gap-5'>
                {scores && scores.map(score => (
                    <div className='bg-zinc-600 p-3 flex flex-col justify-center items-center gap-y-3 rounded-xl' key={score._id}>
                        <ScoreDisplay score={score.score} />
                        <button className='bg-zinc-300 hover:bg-zinc-200 outline outline-3 outline-rose-500 p-2 rounded-lg' onClick={() => dispatch(deleteScore(score._id))}>{polish ? 'USUŃ' : 'DELETE'}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScoresList