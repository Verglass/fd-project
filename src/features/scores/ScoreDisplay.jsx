
const ScoreDisplay = ({ score }) => {
    return (
        <div className='flex text-3xl'>
            {[...Array(5)].map((_, idx) => {
                idx += 1
                return (
                    <div className={idx <= score ? 'text-amber-500' : ''} key={idx}>&#9733;</div>
                )
            }
            )}
        </div>
    )
}

export default ScoreDisplay