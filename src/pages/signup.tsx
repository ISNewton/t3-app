import { type TRPCClientError } from "@trpc/client"
import { Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import Button from "~/components/buttons/Button"
import Input from "~/components/forms/Input"
import Label from "~/components/forms/Label"
import { api } from "~/utils/api"
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";


const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8)
})

const Signup = () => {



    const [error, setError] = useState<string | null>(null);

    const { mutateAsync, mutate } = api.signUp.signUp.useMutation()


    async function handleSubmit(values: {
        name: string,
        email: string,
        password: string
    }) {


        const result = 1


        console.log(result, 121212);

    }

    return (
        <Formik

            initialValues={{
                name: '',
                email: '',
                password: ''

            }}

            validationSchema={toFormikValidationSchema(schema)}

            onSubmit={async (values, action) => {

                try {

                    await mutateAsync(values)

                    await signIn("credentials", {
                        redirect: false,
                        email: values.email,
                        password: values.password,
                    });

                }
                catch (error: any) {
                    console.log(error, 121212);
                    setError(error.message)
                    setTimeout(() => {
                        setError(null)
                    }, 5000);

                }

            }}

        >

            {({ errors, touched, values, handleChange }) => (

                <Form className='text-black'>
                    {error && <p className='text-red-500'>{error}</p>}

                    <Label text='name' />
                    <Input type='name'
                        touched={touched.name}
                        error={errors.name}
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />

                    <Label text='Email' />
                    <Input type='email'
                        touched={touched.email}
                        error={errors.email}
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />


                    <Label text='Password' />
                    <Input type='password'
                        touched={touched.password}
                        error={errors.password}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />

                    <Button type='submit' >submit</Button>


                </Form>

            )}

        </Formik>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {

    const result = await getSession(context)

    console.log(22,result);
    

    if (!result) {
        return {
            redirect: {
                destination: "/",
            },
        }
    }



    return {
        props: {
            session: result,
            ...context
        }
    }
}

export default Signup