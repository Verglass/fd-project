import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectDeliveryOptions } from '../deliveryOptions/deliveryOptionsSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const CartForm = () => {
    const navigate = useNavigate()

    const deliveryOptions = useSelector(selectDeliveryOptions)

    return (
        <Formik
            initialValues={{
                delivery: '',
                email: '',
                address1: '',
                address2: '',
                city: '',
                zip: '',
            }}
            validationSchema={Yup.object({
                delivery: Yup.string().required('Required'),
                email: Yup.string().email('Not a valid email').required('Required'),
                address1: Yup.string().required('Required'),
                address2: Yup.string(),
                city: Yup.string().required('Required'),
                zip: Yup.string().required('Required'),
            })}
            onSubmit={async (_values, { setSubmitting }) => {
                navigate('/confirm')
                setSubmitting(false)
            }}
        >
            {({ isSubmitting }) => (
                <Form className='bg-zinc-700 text-zinc-50 text-xl container rounded mt-24 p-5 flex flex-col gap-y-5'>
                    <div id="my-radio-group">delivery option:
                        <div className='flex gap-x-5' role="group" aria-labelledby="my-radio-group">
                            {deliveryOptions.length
                                ?
                                <>
                                    {
                                        deliveryOptions.map((option) => (
                                            <label key={option._id}>
                                                <Field type="radio" name="delivery" value={option.method} />
                                                {option.method} - ${option.price}
                                            </label>
                                        ))
                                    }
                                </>
                                :
                                <label>
                                    <Field type="radio" name="delivery" value="no delivery" />
                                    no delivery - $0
                                </label>
                            }
                        </div>
                        <ErrorMessage className='text-rose-500' component="span" name="delivery" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="email">email</label>
                        <Field className='bg-zinc-800' name="email" />
                        <ErrorMessage className='text-rose-500' component="span" name="email" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="address1">address line 1</label>
                        <Field className='bg-zinc-800' name="address1" />
                        <ErrorMessage className='text-rose-500' component="span" name="address1" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="address2">address line 2 (optional)</label>
                        <Field className='bg-zinc-800' name="address2" />
                        <ErrorMessage className='text-rose-500' component="span" name="address2" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="city">city</label>
                        <Field className='bg-zinc-800' name="city" />
                        <ErrorMessage className='text-rose-500' component="span" name="city" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="zip">ZIP/postcode</label>
                        <Field className='bg-zinc-800' name="zip" />
                        <ErrorMessage className='text-rose-500' component="span" name="zip" />
                    </div>

                    <button className='p-5 hover:bg-zinc-600' type="submit" disabled={isSubmitting}>Proceed</button>
                </Form>
            )}
        </Formik>
    )
}

export default CartForm