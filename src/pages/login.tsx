import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import Input from '~/components/forms/Input';
import Button from '~/components/buttons/Button';
import Label from '~/components/forms/Label';
import { getSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const Login = () => {
    const { replace } = useRouter();
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


        if (!result?.ok) {
            setError("البريد الالكتروني او كلمة المرور غير صحيحة");

            setTimeout(() => {
                setError(null);
            }, 3000)
        } else {

            toast.success('Welcome back !', {
                theme: "colored",
            })
            replace("/")

        }

    };



    return (
        <>
            <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">Login</h2>


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
        </>

    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const result = await getSession(context)

    console.log(result);


    if (result) {
        return {
            redirect: {
                destination: "/",
            },
        }
    }
    return {
        props: {
        },
    };
}
export default Login;