import { Form, Formik } from "formik"
import { useState } from "react"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import Button from "~/components/buttons/Button"
import Input from "~/components/forms/Input"
import Label from "~/components/forms/Label"
import { api } from "~/utils/api"


const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8)
})

const Signup = () => {



    // const [error, setError] = useState<string | null>(null);

    const { mutateAsync, mutate } = api.signUp.signUp.useMutation()


    async function handleSubmit(values: {
        name: string,
        email: string,
        password: string
    }) {


        const result = 1

        mutateAsync()

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
                console.log(2323);

                const result = 1

                await mutateAsync()

                console.log(result, 121212);

            }}

        >

            {({ errors, touched, values, handleChange }) => (

                <Form className='text-black'>
                    {/* {error && <p className='text-red-500'>{error}</p>} */}

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

                    <Button type='submit' text='submit' />


                </Form>

            )}

        </Formik>
    )
}

export default Signup