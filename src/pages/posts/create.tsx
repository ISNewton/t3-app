import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import Button from "~/components/buttons/Button"
import Checkbox from "~/components/forms/Checkbox"
import Input from "~/components/forms/Input"
import Label from "~/components/forms/Label"
import Title from "~/components/headings/title"
import { api } from "~/utils/api"

const CreatePost = () => {

    const [error, setError] = useState<string | null>(null);

    const { mutateAsync } = api.posts.createPost.useMutation()

    const { replace } = useRouter();

    const schema = z.object({
        title: z.string().min(8),
        description: z.string().min(8),
        isActive: z.boolean()
    })


    return (
        <>
        <Title title="Add post" />
        
        <Formik

            initialValues={{

                title: '',
                description: '',
                isActive: false

            }}

            validationSchema={toFormikValidationSchema(schema)}

            onSubmit={async (values) => {
                console.log('submit');

                try {
                    const result = await mutateAsync(values)

                    toast.success('Post created  ,Now start editing !',{
                        theme: "colored"
                      })

                    replace('/')

                }
                catch (e: any) {
                    setError(e.message)
                }
            }}

        >

            {({ errors, touched, values, handleChange }) => (

                <Form className='text-black'>
                    {error && <p className='text-red-500'>{error}</p>}

                    <Label text='Title' />
                    <Input type='text'
                        touched={touched.title}
                        error={errors.title}
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        id='title'
                    />


                    <Label text='Description' />
                    <Input type='text'
                        touched={touched.description}
                        error={errors.description}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        id='description'
                    />


                    <Checkbox
                        touched={touched.isActive}
                        error={errors.isActive}
                        name="isActive"
                        value={values.isActive ? 'true' : ''}
                        onChange={handleChange}
                        id='isActive'
                        label="Is Active"
                    />

                    <Button type='submit'>submit</Button>


                </Form>

            )}

        </Formik>
        </>

    )

}

export default CreatePost