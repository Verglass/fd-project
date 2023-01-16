import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { addProduct } from './productsSlice'


const AddProductForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
        await dispatch(addProduct(values))
    }

    return (
        <Formik
            initialValues={{
                title: 'hardcover',
                picture: 'https://i.postimg.cc/kgz78D3d/placeholder.jpg',
                price: 21,
                quantity: 10,
                type: '',
                shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan in neque sed venenatis. Donec gravida, lorem ac finibus commodo.',
                longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan in neque sed venenatis. Donec gravida, lorem ac finibus commodo, ante mauris interdum lorem, sed consequat nisi enim eu tortor. Mauris ipsum lorem, bibendum nec cursus vitae, auctor id augue. Curabitur maximus ipsum vel felis bibendum, at ultricies orci vulputate. Praesent vel scelerisque tortor. Nam eu orci vel enim vestibulum bibendum. Mauris venenatis dolor ut risus luctus mattis. Mauris molestie condimentum nibh, eget placerat elit venenatis et. Phasellus interdum diam nec dui molestie, ut vestibulum nibh varius. Quisque odio tortor, mattis sit amet rutrum et, porttitor mattis elit. Nam eget risus viverra, maximus mauris sed, viverra sem. Sed volutpat enim sed turpis scelerisque, sed vestibulum elit hendrerit.In fringilla ligula id arcu viverra luctus. Aliquam erat volutpat. Mauris viverra a justo ut fringilla. Vestibulum ullamcorper lacus at arcu feugiat, id blandit mi facilisis. Integer id odio ultricies ipsum viverra suscipit viverra vel metus. Integer id enim at ipsum luctus tempor id at ex. Ut ut rutrum libero.Phasellus turpis urna, pretium ac dolor eget, congue faucibus felis. Morbi iaculis et arcu ut volutpat. Pellentesque eu eros id ante sodales feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis id quam in posuere. Sed imperdiet scelerisque tincidunt. Etiam accumsan blandit consectetur. Fusce nec tellus a nibh convallis rutrum. ',
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('Required'),
                picture: Yup.string().required('Required'),
                price: Yup.number().min(1, 'Must be at least 1').required('Required'),
                quantity: Yup.number().min(1, 'Must be at least 1').required('Required'),
                type: Yup.string().required('Required'),
                shortDescription: Yup.string().max(150, 'Too long').required('Required'),
                longDescription: Yup.string().required('Required'),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                await handleSubmit(values)
                setSubmitting(false)
                resetForm()
            }}
        >
            {({ isSubmitting }) => (
                <Form className='bg-zinc-700 text-zinc-50 text-xl container rounded mt-24 p-5 flex flex-col gap-y-5'>
                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="title">title</label>
                        <Field className='bg-zinc-800' name="title" />
                        <ErrorMessage className='text-rose-500' component="span" name="title" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="picture">picture</label>
                        <Field className='bg-zinc-800' name="picture" />
                        <ErrorMessage className='text-rose-500' component="span" name="picture" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="price">price</label>
                        <Field className='bg-zinc-800' name="price" type="number" />
                        <ErrorMessage className='text-rose-500' component="span" name="price" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="quantity">quantity</label>
                        <Field className='bg-zinc-800' name="quantity" type="number" />
                        <ErrorMessage className='text-rose-500' component="span" name="quantity" />
                    </div>

                    <div id="my-radio-group">type:
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
                        <label htmlFor="shortDescription">short description</label>
                        <Field className='bg-zinc-800' name="shortDescription" />
                        <ErrorMessage className='text-rose-500' component="span" name="shortDescription" />
                    </div>

                    <div className='flex flex-col gap-y-0.5'>
                        <label htmlFor="longDescription">long description</label>
                        <Field className='bg-zinc-800' name="longDescription" as="textarea" />
                        <ErrorMessage className='text-rose-500' component="span" name="longDescription" />
                    </div>

                    <button className='p-5 hover:bg-zinc-600' type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
        </Formik>
    )
}

export default AddProductForm