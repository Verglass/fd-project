import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from '../../api/axios'
import { productAdded } from './productsSlice'


const AddProductForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
        await axios.post('/products', values)
        .then(res => {
            dispatch(productAdded(res.data.product))
        })
    }

    return (
        <Formik
            initialValues={{
                title: 'test',
                picture: 'https://i.postimg.cc/kgz78D3d/placeholder.jpg',
                price: 21,
                quantity: 10,
                shortDescription: 'short description',
                longDescription: 'long description',
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('Required'),
                picture: Yup.string().required('Required'),
                price: Yup.number().min(1, 'Must be at least 1').required('Required'),
                quantity: Yup.number().min(1, 'Must be at least 1').required('Required'),
                shortDescription: Yup.string().required('Required'),
                longDescription: Yup.string().required('Required'),
            })}
            onSubmit={ async (values, { setSubmitting, resetForm }) => {
                await handleSubmit(values)
                setSubmitting(false)
                resetForm()
            }}
        >
        {({ isSubmitting }) => (
            <Form>
                <label htmlFor="title">title</label>
                <Field name="title"  />
                <ErrorMessage name="title" />

                <label htmlFor="picture">picture</label>
                <Field name="picture"  />
                <ErrorMessage name="picture" />

                <label htmlFor="price">price</label>
                <Field name="price" type="number" />
                <ErrorMessage name="price" />

                <label htmlFor="quantity">quantity</label>
                <Field name="quantity" type="number" />
                <ErrorMessage name="quantity" />

                <label htmlFor="shortDescription">short description</label>
                <Field name="shortDescription"  />
                <ErrorMessage name="shortDescription" />

                <label htmlFor="longDescription">long description</label>
                <Field name="longDescription"  as="textarea"  />
                <ErrorMessage name="longDescription" />

                <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
        )}
        </Formik>
        )
}

export default AddProductForm