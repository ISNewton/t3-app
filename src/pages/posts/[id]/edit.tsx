import { Post } from "@prisma/client";
import { Form, Formik } from "formik";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "~/components/buttons/Button";
import Checkbox from "~/components/forms/Checkbox";
import Input from "~/components/forms/Input";
import Label from "~/components/forms/Label";
import { createSsrCaller } from "~/server/api/root";
import { api } from "~/utils/api";

interface Props {
    post: Post
}
const Edit: React.FC<Props> = ({ post }) => {
    console.log(post);


    const schema = z.object({
        title: z.string().min(8),
        description: z.string().min(8),
        isActive: z.boolean()
    })


    const [error, setError] = useState<string | null>(null);

    const { mutateAsync } = api.posts.updatePost.useMutation()

    const { replace } = useRouter();


    return (
        <Formik

            initialValues={{

                title: post.title,

                description: post.description,
                isActive: post.isActive

            }}

            validationSchema={toFormikValidationSchema(schema)}

            onSubmit={async (values) => {
                console.log('submit');

                try {
                    const result = await mutateAsync({
                        ...values,
                        id: post.id,
                        description: values.description ? values.description : ''
                    })
                    console.log(result);

                    replace('/')

                
                }
                catch (e: any) {
                    console.log(e);
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
                        value={values.description ? values.description : ''}
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
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { id } = ctx.query
    if (!id || typeof id !== 'string') {
        return {
            notFound: true
        }

    }

    const client = await createSsrCaller();

    const post = await client.posts.getActivePost(id)

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        }
    }

}
export default Edit