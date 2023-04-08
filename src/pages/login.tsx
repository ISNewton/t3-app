import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import Input from '~/components/forms/Input';
import Button from '~/components/buttons/Button';
const Login = () => {
    // const { login } = useAuth();

    const handleSubmit = async () => {
        // await login(values);
    };

    const schema = z.object({
        email: z.string().email({ message: "البريد الالكتروني غير صحيح" }),

    })

    return (
        <Formik

            initialValues={{

                email: '',

            }}

            validationSchema={toFormikValidationSchema(schema)}

            onSubmit={() => {

                // same shape as initial values

                console.log(123);

            }}

        >

            {({ errors, touched }) => (

                <Form className='text-black'>
                    <Input type='email'
                        touched={touched.email}
                        error={errors.email} 
                        name="email"
                         />

                    {/* <button type="submit">Submit</button>
                     */}
                     <Button text='Submit' />


                </Form>

            )}

        </Formik>
    );
};

export default Login;