import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCommentsById, fetchComments, addComment, deleteComment, fetchFilteredComments } from './commentsSlice'
import { selectAdmin } from '../layout/adminSlice'
import { selectLanguage } from '../layout/languageSlice'
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
    const polish = useSelector(selectLanguage)

    const [filters, setFilters] = useState({})

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
                        comment: Yup.string().max(125, 'Too long').required('Required'),
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
                            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit p-2 rounded' type="button" onClick={() => navigate(`/${productId}/details`)}>{polish ? 'Wróć' : 'Go back'}</button>

                            <div className='flex flex-col gap-y-0.5'>
                                <Field name="comment" as="textarea" />
                                <ErrorMessage className='text-rose-500' component="span" name="comment" />
                            </div>

                            <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 h-fit p-2 rounded' type="submit" disabled={isSubmitting}>{polish ? 'Zostaw komentarz' : 'Leave a comment'}</button>
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
                                minDate: '',
                                maxDate: '',
                                template: '',
                            }}
                            validationSchema={Yup.object({
                                order: Yup.string().required('Required'),
                                minDate: Yup.date(),
                                maxDate: Yup.date(),
                                template: Yup.string(),
                            })}
                            onSubmit={async (values, { setSubmitting }) => {
                                values.productId = productId
                                await dispatch(fetchFilteredComments(values))
                                setFilters(values)
                                setSubmitting(false)
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className='bg-zinc-700 text-zinc-50 h-fit rounded mx-16 p-5 flex flex-col gap-y-5'>
                                    <div className='flex flex-col gap-y-0.5'>
                                        <label htmlFor="order">{polish ? 'porządek:' : 'order:'}</label>
                                        <Field className='bg-zinc-800' name="order" as='select'>
                                            <option value="oldest">{polish ? 'najstarsze komentarze' : 'oldest comments'}</option>
                                            <option value="newest">{polish ? 'najnowsze komentarze' : 'newest comments'}</option>
                                            <option value="alphabetical">{polish ? 'alfabetyczny' : 'alphabetical'}</option>
                                        </Field>
                                        <ErrorMessage className='text-rose-500' component="span" name="order" />
                                    </div>

                                    <div className='flex flex-col gap-y-0.5'>
                                        <label htmlFor="minDate">{polish ? 'nowsze niż:' : 'newer than:'}</label>
                                        <Field className='bg-zinc-800' name="minDate" type="date" />
                                        <ErrorMessage className='text-rose-500' component="span" name="minDate" />
                                    </div>

                                    <div className='flex flex-col gap-y-0.5'>
                                        <label htmlFor="maxDate">{polish ? 'starsze niż:' : 'older than:'}</label>
                                        <Field className='bg-zinc-800' name="maxDate" type="date" />
                                        <ErrorMessage className='text-rose-500' component="span" name="maxDate" />
                                    </div>

                                    <div className='flex flex-col gap-y-0.5'>
                                        <label htmlFor="template">{polish ? 'zawierające:' : 'including:'}</label>
                                        <Field className='bg-zinc-800' name="template" />
                                        <ErrorMessage className='text-rose-500' component="span" name="template" />
                                    </div>

                                    <button className='p-5 hover:bg-zinc-600' type="submit" disabled={isSubmitting}>{polish ? 'zastosuj' : 'apply'}</button>
                                </Form>
                            )}
                        </Formik>
                        {Object.keys(filters).length ?
                            <div className='bg-zinc-700 text-zinc-50 h-fit rounded mt-5 mx-16 p-5 flex flex-col gap-y-5'>
                                <p>{polish ? 'porządek:' : 'order:'} {filters.order}</p>
                                {filters.minDate && <p>{polish ? 'nowsze niż:' : 'newer than:'} {filters.minDate}</p>}
                                {filters.maxDate && <p>{polish ? 'starsze niż:' : 'older than:'} {filters.maxDate}</p>}
                                {filters.template && <p>{polish ? 'zawierające:' : 'template:'} {filters.template}</p>}
                            </div>
                            : null
                        }
                    </div>
                    <div className='bg-zinc-300 h-fit col-span-2 p-5 rounded'>
                        {comments.slice(page * num, page * num + num).map(comment => (
                            <div className='mb-5 flex items-center gap-x-4' key={comment._id}>
                                <div className='bg-zinc-700 text-zinc-50 p-5 rounded grow'>
                                    <div>{comment.comment}</div>
                                    <div className='text-zinc-300 text-right text-sm'>{new Date(comment.date).toLocaleString()}</div>
                                </div>
                                {admin && <button className='hover:bg-zinc-200 outline outline-3 outline-rose-500 p-2 rounded-lg' onClick={() => dispatch(deleteComment(comment._id))}>{polish ? 'USUŃ' : 'DEL'}</button>}
                            </div>

                        ))}
                        <div className='flex justify-end gap-10'>
                            {page > 0 && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${productId}/comments/${page - 1}`)}>{polish ? 'Poprzednie' : 'Previous'}</button>}
                            {page + 1 < (comments.length / num) && <button className='bg-zinc-700 hover:bg-zinc-600 text-zinc-50 p-2 rounded' onClick={() => navigate(`/${productId}/comments/${page + 1}`)}>{polish ? 'Następne' : 'Next'}</button>}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentsList