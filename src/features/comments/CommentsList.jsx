import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCommentsById, fetchComments, addComment, deleteComment, fetchSortedComments } from './commentsSlice'
import { selectAdmin } from '../layout/adminSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const CommentsList = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const page = Number(useParams().page)
    const num = 4

    const comments = useSelector(selectCommentsById(productId))
    const admin = useSelector(selectAdmin)

    useEffect(() => {
        if (!comments) dispatch(fetchComments(productId))
    }, [])

    return (
        <div>
            <div className='w-fit mx-auto'>
                <Formik
                    initialValues={{
                        comment: '',
                    }}
                    validationSchema={Yup.object({
                        comment: Yup.string().max(150, 'Too long').required('Required'),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        values.productId = productId
                        await dispatch(addComment(values))
                        setSubmitting(false)
                        resetForm()
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className='bg-zinc-200 text-xl container rounded mt-16 p-5 flex items-center gap-x-5'>
                            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit p-2 rounded' type="button" onClick={() => navigate(`/${productId}/details`)}>Go back</button>

                            <div className='flex flex-col gap-y-0.5'>
                                <Field name="comment" as="textarea" />
                                <ErrorMessage className='text-rose-500' component="span" name="comment" />
                            </div>

                            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit p-2 rounded' type="submit" disabled={isSubmitting}>Leave a comment</button>
                        </Form>
                    )}
                </Formik>
            </div>
            {comments &&
                <div className='text-xl mt-4 container grid grid-cols-3'>
                    <div>
                        <Formik
                            initialValues={{
                                order: 'oldest',
                            }}
                            validationSchema={Yup.object({
                                order: Yup.string().required('Required'),
                            })}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                values.productId = productId
                                await dispatch(fetchSortedComments(values))
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
                                            <option value="alphabetical">alphabetical</option>
                                        </Field>
                                        <ErrorMessage className='text-rose-500' component="span" name="order" />
                                    </div>

                                    <button className='p-5 hover:bg-zinc-600' type="submit" disabled={isSubmitting}>apply</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className='bg-zinc-300 col-span-2 p-5 rounded'>
                        {comments.slice(page * num, page * num + num).map(comment => (
                            <div className='mb-5 flex items-center gap-x-4'>
                                <div className='bg-zinc-700 text-zinc-50 p-5 rounded grow' key={comment._id}>
                                    <div>{comment.comment}</div>
                                    <div className='text-zinc-300 text-right text-sm'>{new Date(comment.date).toLocaleString()}</div>
                                </div>
                                {admin && <button className='hover:bg-zinc-200 outline outline-3 outline-rose-500 p-2 rounded-lg' onClick={() => dispatch(deleteComment(comment._id))}>DEL</button>}
                            </div>

                        ))}
                        <div className='flex justify-end gap-10'>
                            {page > 0 && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${productId}/comments/${page - 1}`)}>Previous</button>}
                            {page + 1 < (comments.length / num) && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${productId}/comments/${page + 1}`)}>Next</button>}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentsList