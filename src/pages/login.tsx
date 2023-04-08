import { Field, Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
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

                    <Field touched={touched.email} errors={errors.email} name="email" type="email" />

                    {errors.email && touched.email ? <div>{errors.email}</div> : null}

                    <button type="submit">Submit</button>

                </Form>

            )}

        </Formik>
    );
};

export default Login;