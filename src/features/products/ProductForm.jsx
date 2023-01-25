import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { addProduct, updateProduct } from './productsSlice'
import { selectProductDetailsById, fetchDetails } from '../productDetails/productDetailsSlice'
import { selectLanguage } from '../layout/languageSlice'
import * as Yup from 'yup'


const ProductForm = ({ edit }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { productId } = useParams()

    const product = useSelector(selectProductDetailsById(productId))
    const polish = useSelector(selectLanguage)

    const initialValues = edit ? {
        title: product.title,
        picture: product.picture,
        price: product.price,
        quantity: product.quantity,
        type: product.type,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
    } : {
        title: '',
        picture: '',
        price: 1,
        quantity: 1,
        type: '',
        shortDescription: '',
        longDescription: '',
    }

    const handleSubmit = async (values) => {
        if (edit) {
            values.productId = productId
            await dispatch(updateProduct(values))
            await dispatch(fetchDetails(productId))
            navigate(`/${productId}/details`)
        } else {
            await dispatch(addProduct(values))
            navigate(`/`)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={
                Yup.object({
                    title: Yup.string().required('Required'),
                    picture: Yup.string().required('Required'),
                    price: Yup.number().min(1, 'Must be at least 1').required('Required'),
                    quantity: Yup.number().min(1, 'Must be at least 1').required('Required'),
                    type: Yup.string().required('Required'),
                    shortDescription: Yup.string().max(150, 'Too long').required('Required'),
                    longDescription: Yup.string().required('Required'),
                })
            }
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                await handleSubmit(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ isSubmitting }) => (
                <Form className='bg-zinc-700 text-zinc-50 text-xl container rounded mt-24 p-5 flex flex-col gap-y-5'>
                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="title">{polish ? 'tytuł' : 'title'}</label>
                        <Field className='bg-zinc-800' name="title" />
                        <ErrorMessage className='text-rose-500' component="span" name="title" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="picture">{polish ? 'zdjęcie' : 'picture'}</label>
                        <Field className='bg-zinc-800' name="picture" />
                        <ErrorMessage className='text-rose-500' component="span" name="picture" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="price">{polish ? 'cena' : 'price'}</label>
                        <Field className='bg-zinc-800' name="price" type="number" />
                        <ErrorMessage className='text-rose-500' component="span" name="price" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="quantity">{polish ? 'ilość' : 'quantity'}</label>
                        <Field className='bg-zinc-800' name="quantity" type="number" />
                        <ErrorMessage className='text-rose-500' component="span" name="quantity" />
                    </div>

                    <div id="my-radio-group">{polish ? 'typ:' : 'type:'}
                        <div className='flex gap-x-5' role="group" aria-labelledby="my-radio-group">
                            <label>
                                <Field className='mx-1' type="radio" name="type" value="hardcover" />
                                hardcover
                            </label>
                            <label>
                                <Field className='mx-1' type="radio" name="type" value="flexibound" />
                                flexibound
                            </label>
                        </div>
                        <ErrorMessage className='text-rose-500' component="span" name="type" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="shortDescription">{polish ? 'krótki opis' : 'short description'}</label>
                        <Field className='bg-zinc-800' name="shortDescription" />
                        <ErrorMessage className='text-rose-500' component="span" name="shortDescription" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="longDescription">{polish ? 'długi opis' : 'long description'}</label>
                        <Field className='bg-zinc-800' name="longDescription" as="textarea" />
                        <ErrorMessage className='text-rose-500' component="span" name="longDescription" />
                    </div>

                    <button className='p-5 hover:bg-zinc-600' type="submit" disabled={isSubmitting}>{polish ? 'Dodaj' : 'Submit'}</button>
                </Form>
            )}
        </Formik>
    )
}

export default ProductForm