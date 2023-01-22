import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAdmin, adminSwitch } from './adminSlice'
import { selectCart } from '../cart/cartSlice'

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const admin = useSelector(selectAdmin)
    const cart = useSelector(selectCart)

    return (
        <>
            <nav className='bg-zinc-700 text-zinc-50 text-xl h-14 fixed top-0 left-0 right-0 flex justify-between'>
                <div className='h-fit px-10 self-center flex gap-10'>
                    <button onClick={() => navigate('/')}>home</button>
                    {admin
                        ?
                        <button onClick={() => dispatch(adminSwitch())}>user</button>
                        :
                        <button onClick={() => dispatch(adminSwitch())}>admin</button>
                    }
                </div>
                <div className='h-fit px-10 self-center'>
                    <button onClick={() => navigate('/cart')}>cart({cart.length})</button>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout