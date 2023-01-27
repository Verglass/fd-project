import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAdmin, adminSwitch } from './adminSlice'
import { selectLanguage, languageSwitch } from './languageSlice'
import { selectCart } from '../cart/cartSlice'

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const admin = useSelector(selectAdmin)
    const polish = useSelector(selectLanguage)
    const cart = useSelector(selectCart)

    return (
        <>
            <nav className='bg-zinc-700 text-zinc-50 text-xl h-14 fixed top-0 left-0 right-0 flex justify-between'>
                <div className='h-fit px-10 self-center flex gap-10'>
                    <button onClick={() => navigate('/')}>{polish ? 'dom' : 'home'}</button>
                    {admin
                        ?
                        <button onClick={() => dispatch(adminSwitch())}>{polish ? 'użytkownik' : 'user'}</button>
                        :
                        <button onClick={() => dispatch(adminSwitch())}>{polish ? 'administrator' : 'admin'}</button>
                    }
                    {admin && <button onClick={() => navigate('/stats')}>{polish ? 'statystyki' : 'stats'}</button>}
                </div>
                <div className='h-fit px-10 self-center flex gap-10'>
                    <button onClick={() => navigate('/cart')}>{polish ? 'koszyk' : 'cart'}({cart.length})</button>
                    {polish
                        ?
                        <button onClick={() => dispatch(languageSwitch())}>EN</button>
                        :
                        <button onClick={() => dispatch(languageSwitch())}>PL</button>
                    }
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout