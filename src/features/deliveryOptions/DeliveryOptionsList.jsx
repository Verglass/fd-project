import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectDeliveryOptions, fetchDeliveryOptions, addDeliveryOption, deleteDeliveryOption } from './deliveryOptionsSlice'
import { selectLanguage } from '../layout/languageSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const DeliveryOptionsList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deliveryOptions = useSelector(selectDeliveryOptions)
    const polish = useSelector(selectLanguage)

    useEffect(() => {
        if (!deliveryOptions.length) dispatch(fetchDeliveryOptions())
    }, [])

    return (
        <div className='mt-16 container grid grid-cols-3'>
            <div className='w-fit mx-auto'>
                <Formik
                    initialValues={{
                        method: '',
                        price: 0,
                    }}
                    validationSchema={Yup.object({
                        method: Yup.string().max(100, 'Too long').required('Required'),
                        price: Yup.number().min(1, 'Must be at least 1').required('Required'),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        await dispatch(addDeliveryOption(values))
                        setSubmitting(false)
                        resetForm()
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className='bg-zinc-200 text-xl rounded mt-4 p-5 flex flex-col items-center  gap-y-5'>
                            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit p-2 rounded' type="button" onClick={() => navigate(-1)}>{polish ? 'Wróć' : 'Go back'}</button>

                            <div className='flex flex-col gap-y-0.5'>
                                <label htmlFor="method">{polish ? 'metoda' : 'method'}</label>
                                <Field name="method" />
                                <ErrorMessage className='text-rose-500' component="span" name="method" />
                            </div>

                            <div className='flex flex-col gap-y-0.5'>
                                <label htmlFor="price">{polish ? 'cena' : 'price'}</label>
                                <Field name="price" type="number" />
                                <ErrorMessage className='text-rose-500' component="span" name="price" />
                            </div>

                            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit p-2 rounded' type="submit" disabled={isSubmitting}>{polish ? 'Dodaj opcje' : 'Add an option'}</button>
                        </Form>
                    )}
                </Formik>
            </div>
            {deliveryOptions &&
                <div className='text-xl w-fit flex flex-wrap gap-5 col-span-2'>
                    {deliveryOptions.map(option => (
                        <div className='bg-zinc-700 text-zinc-50 h-fit p-3 flex flex-col justify-center items-center gap-y-3 rounded-xl' key={option._id}>
                            <div className='flex flex-col gap-y-0.5'>
                                <div>{polish ? 'metoda:' : 'method:'} {option.method}</div>
                                <div>{polish ? 'cena:' : 'price:'} {option.price}</div>
                            </div>
                            <button className='bg-zinc-800 hover:bg-zinc-600 outline outline-3 outline-rose-500 p-2 rounded-lg' onClick={() => dispatch(deleteDeliveryOption(option._id))}>{polish ? 'USUŃ' : 'DELETE'}</button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default DeliveryOptionsList