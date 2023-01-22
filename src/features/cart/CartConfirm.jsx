import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearCart } from './cartSlice'

const CartConfirm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className='bg-zinc-300 mt-32 p-10 rounded'>
            <h1 className='text-6xl text-center mb-8 font-bold'>Confirm Order</h1>
            <p className='text-3xl mb-16'>Are you sure you want to place this order?</p>
            <div className='text-zinc-50 text-3xl font-bold flex justify-around gap-x-4'>
                <button className='bg-green-700 h-fit w-32 p-4 rounded' onClick={() => { dispatch(clearCart()); navigate('/') }}>Yes</button>
                <button className='bg-rose-700 h-fit w-32 p-4 rounded' onClick={() => navigate('/cart')}>No</button>
            </div>
        </div>
    )
}

export default CartConfirm