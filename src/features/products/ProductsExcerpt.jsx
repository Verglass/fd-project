import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserToken, addProductToCart } from '../cart/cartSlice'
import { selectCommentsById, fetchComments, deleteComment } from '../comments/commentsSlice'
import { selectAdmin } from '../layout/adminSlice'

const ProductsExcerpt = ({ product }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = useSelector(selectUserToken)
    const comments = useSelector(selectCommentsById(product._id))
    const admin = useSelector(selectAdmin)

    const [commentsActive, setCommentsActive] = useState(false)

    const values = {
        productId: product._id,
        quantity: 1,
        userToken: token
    }

    useEffect(() => {
        if (!comments) dispatch(fetchComments(product._id))
    }, [])

    return (
        <div className='w-full border-2 border-zinc-300 mb-5' key={product._id}>
            <h3 className='bg-zinc-300 text-3xl font-bold text-center'>{product.title}</h3>
            <div className='flex justify-between'>
                <div className='flex items-center'>
                    <img className='h-52 p-3' src={product.picture} alt={product.title} />
                    <h4 className='p-4'>{product.shortDescription}</h4>
                </div>
                <div className='text-right w-fit shrink-0 p-5 flex flex-col justify-between'>
                    <div>
                        <h3 className='text-2xl font-bold'>${product.price}</h3>
                        <h4 className='font-light'>with delivery: ${product.priceWithDelivery}</h4>
                        <h4 className='font-light'>in stock: {product.quantity}</h4>
                    </div>
                    <div className='flex py-5 gap-x-5'>
                        <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${product._id}/details`)}>Details</button>
                        <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => dispatch(addProductToCart(values))}>Add to cart</button>
                    </div>
                    <div>
                        {admin && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => setCommentsActive(!commentsActive)}>Toggle comments</button>}
                    </div>
                </div>
            </div>
            {commentsActive && comments && admin &&
                <div className='text-xl mt-4'>
                    {comments.map(comment => (
                        <div className='w-2/3 mx-auto mb-5 flex items-center gap-x-4' key={comment._id}>
                            <div className='bg-zinc-700 text-zinc-50 p-2 rounded grow overflow-hidden'>
                                <div>{comment.comment}</div>
                            </div>
                            <button className='bg-rose-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => dispatch(deleteComment(comment._id))}>Remove</button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default ProductsExcerpt