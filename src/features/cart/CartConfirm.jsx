import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectLanguage } from '../layout/languageSlice'
import { clearCart } from './cartSlice'
import axios  from '../../../api/axios'

const CartConfirm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const polish = useSelector(selectLanguage)

    const  handleYes = async () => {
        await axios.post('/cart/checkout/confirm')
        dispatch(clearCart())
        navigate('/')
    }

    const handleNo = async () => {
        await axios.post('/cart/checkout/confirm')
        navigate('/cart')
    }

    return (
        <div className='bg-zinc-300 mt-32 p-10 rounded'>
            <h1 className='text-6xl text-center mb-8 font-bold'>{polish ? 'Potwierdź Zamówienie' : 'Confirm Order'}</h1>
            <p className='text-3xl mb-16'>{polish ? 'Czy na pewno chcesz złożyć to zamówienie?' : 'Are you sure you want to place this order?'}</p>
            <div className='text-zinc-50 text-3xl font-bold flex justify-around gap-x-4'>
                <button className='bg-green-700 h-fit w-32 p-4 rounded' onClick={handleYes}>{polish ? 'Tak' : 'Yes'}</button>
                <button className='bg-rose-700 h-fit w-32 p-4 rounded' onClick={handleNo}>{polish ? 'Nie' : 'No'}</button>
            </div>
        </div>
    )
}

export default CartConfirm