import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import Input from '~/components/forms/Input';
import Button from '~/components/buttons/Button';
import Label from '~/components/forms/Label';
import { signIn } from 'next-auth/react';
const Login = () => {
    // const { login } = useAuth();

    const schema = z.object({
        email: z.string().email({ message: "البريد الالكتروني غير صحيح" }),
        password: z.string().min(8)

    })

    const handleSubmit = async (values: {
        email: string,
        password: string
    }) => {
        // await login(values);

        const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        console.log(result);

    };



    return (
        <Formik

            initialValues={{

                email: '',
                password: ''

            }}

            validationSchema={toFormikValidationSchema(schema)}

            onSubmit={handleSubmit}

        >

            {({ errors, touched, values, handleChange }) => (

                <Form className='text-black'>

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
    );
};

export default Login;