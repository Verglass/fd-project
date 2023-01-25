import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLanguage } from '../layout/languageSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { fetchFilteredProducts } from './productsSlice'

const ProductsFilters = () => {
    const dispatch = useDispatch()

    const [filters, setFilters] = useState({})
    const polish = useSelector(selectLanguage)

    const handleSubmit = async (values) => {
        dispatch(fetchFilteredProducts(values))
    }

    return (
        <div>
            <Formik
                initialValues={{
                    order: 'oldest',
                    minPrice: Infinity,
                    maxPrice: Infinity,
                    type: 'all',
                }}
                validationSchema={Yup.object({
                    order: Yup.string().required('Required'),
                    minPrice: Yup.number(),
                    maxPrice: Yup.number(),
                    type: Yup.string(),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    await handleSubmit(values)
                    setFilters(values)
                    setSubmitting(false)
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='bg-zinc-700 text-zinc-50 h-fit rounded mx-16 p-5 flex flex-col gap-y-5'>
                        <div className='flex flex-col gap-y-0.5'>
                            <label htmlFor="order">{polish ? 'porządek:' : 'order:'}</label>
                            <Field className='bg-zinc-800' name="order" as='select'>
                                <option value="oldest">{polish ? 'najstarsze produkty' : 'oldest products'}</option>
                                <option value="newest">{polish ? 'najnowsze produkty' : 'newest products'}</option>
                                <option value="score">{polish ? 'najwyżej oceniane' : 'highest score'}</option>
                                <option value="highPrice">{polish ? 'najwyższa cena' : 'highest price'}</option>
                                <option value="lowPrice">{polish ? 'najniższa cena' : 'lowest price'}</option>
                                <option value="alphabetical">{polish ? 'alfabetyczny' : 'alphabetical'}</option>
                            </Field>
                            <ErrorMessage className='text-rose-500' component="span" name="order" />
                        </div>

                        <div className='flex flex-col gap-y-0.5'>
                            <label htmlFor="minPrice">{polish ? 'minimalna cena:' : 'minimum price:'}</label>
                            <Field className='bg-zinc-800' name="minPrice" type="number" />
                            <ErrorMessage className='text-rose-500' component="span" name="minPrice" />
                        </div>

                        <div className='flex flex-col gap-y-0.5'>
                            <label htmlFor="maxPrice">{polish ? 'maksymalna cena:' : 'maximum price:'}</label>
                            <Field className='bg-zinc-800' name="maxPrice" type="number" />
                            <ErrorMessage className='text-rose-500' component="span" name="maxPrice" />
                        </div>

                        <div id="my-radio-group">{polish ? 'typ:' : 'type:'}
                            <div className='flex flex-col' role="group" aria-labelledby="my-radio-group">
                                <label>
                                    <Field className='mx-2' type="radio" name="type" value="all" />
                                    {polish ? 'wszystkie' : 'all'}
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

                        <button className='p-5 hover:bg-zinc-600' type="submit" disabled={isSubmitting}>{polish ? 'zastosuj' : 'apply'}</button>
                    </Form>
                )}
            </Formik>
            {Object.keys(filters).length ?
                <div className='bg-zinc-700 text-zinc-50 h-fit rounded mt-5 mx-16 p-5 flex flex-col gap-y-5'>
                    <p>{polish ? 'porządek:' : 'order:'} {filters.order}</p>
                    {filters.minPrice && filters.minPrice !== Infinity && <p>{polish ? 'min. cena:' : 'min. price:'} {filters.minPrice}</p>}
                    {filters.maxPrice && filters.maxPrice !== Infinity && <p>{polish ? 'max. cena:' : 'max. price:'} {filters.maxPrice}</p>}
                    <p>{polish ? 'typ:' : 'type:'} {filters.type}</p>
                </div>
                : null
            }
        </div>
    )
}



export default ProductsFilters