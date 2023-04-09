import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import Input from '~/components/forms/Input';
import Button from '~/components/buttons/Button';
import Label from '~/components/forms/Label';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
const Login = () => {
    // const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const schema = z.object({
        email: z.string().email({ message: "البريد الالكتروني غير صحيح" }),
        password: z.string().min(8)

    })

    const handleSubmit = async (values: {
        email: string,
        password: string
    }) => {

        const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        console.log(result);

        if(!result?.ok) {
            setError("البريد الالكتروني او كلمة المرور غير صحيحة");

            setTimeout(() => {
                setError(null);
            }, 3000)
        }

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
                    {error && <p className='text-red-500'>{error}</p>}

                    <Label text='Email' />
                    <Input type='email'
                        touched={touched.email}
                        error={errors.email}
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        id='email'
                    />


                    <Label text='Password' />
                    <Input type='password'
                        touched={touched.password}
                        error={errors.password}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id='password'
                    />

                    <Button type='submit'  >submit</Button>


                </Form>

            )}

        </Formik>
    );
};

export default Login;