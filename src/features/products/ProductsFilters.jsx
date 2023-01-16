import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { fetchFilteredProducts } from './productsSlice'

const ProductsFilters = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
        dispatch(fetchFilteredProducts(values))
    }

    return (
        <div>
            <Formik
                initialValues={{
                    order: 'oldest',
                    minPrice: 0,
                    maxPrice: 100,
                    type: 'any',
                }}
                validationSchema={Yup.object({
                    order: Yup.string().required('Required'),
                    minPrice: Yup.number().required('Required'),
                    maxPrice: Yup.number().required('Required'),
                    type: Yup.string().required('Required'),
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    await handleSubmit(values)
                    setSubmitting(false)
                    resetForm()
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='bg-zinc-700 text-zinc-50 h-fit rounded mx-16 p-5 flex flex-col gap-y-5'>
                        <div className='flex flex-col gap-y-0.5'>
                            <label htmlFor="order">order:</label>
                            <Field className='bg-zinc-800' name="order" as='select'>
                                <option value="oldest">oldest products</option>
                                <option value="newest">newest products</option>
                                <option value="score">highest score</option>
                                <option value="highPrice">highest price</option>
                                <option value="lowPrice">lowest price</option>
                                <option value="alphabetical">alphabetical</option>
                            </Field>
                            <ErrorMessage className='text-rose-500' component="span" name="order" />
                        </div>

                        <div className='flex flex-col gap-y-0.5'>
                            <label htmlFor="minPrice">minimum price:</label>
                            <Field className='bg-zinc-800' name="minPrice" type="number" />
                            <ErrorMessage className='text-rose-500' component="span" name="minPrice" />
                        </div>

                        <div className='flex flex-col gap-y-0.5'>
                            <label htmlFor="maxPrice">maximum price:</label>
                            <Field className='bg-zinc-800' name="maxPrice" type="number" />
                            <ErrorMessage className='text-rose-500' component="span" name="maxPrice" />
                        </div>

                        <div id="my-radio-group">type:
                            <div className='flex flex-col' role="group" aria-labelledby="my-radio-group">
                                <label>
                                    <Field className='mx-2' type="radio" name="type" value="any" />
                                    any
                                </label>
                                <label>
                                    <Field className='mx-2' type="radio" name="type" value="hardcover" />
                                    hardcover
                                </label>
                                <label>
                                    <Field className='mx-2' type="radio" name="type" value="flexibound" />
                                    flexibound
                                </label>
                            </div>
                        </div>

                        <button className='p-5 hover:bg-zinc-600' type="submit" disabled={isSubmitting}>apply</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}



export default ProductsFilters