import { Form, Formik } from "formik"
import { useState } from "react"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import Button from "~/components/buttons/Button"
import Checkbox from "~/components/forms/Checkbox"
import Input from "~/components/forms/Input"
import Label from "~/components/forms/Label"

const CreatePost = () => {

    const [error, setError] = useState<string | null>(null);

    const schema = z.object({
        title: z.string().min(8),
        description: z.string().min(8),
        isActive: z.boolean()
    })


    return (
        <Formik

            initialValues={{

                title: '',
                description: '',
                isActive: false

            }}

            validationSchema={toFormikValidationSchema(schema)}

            onSubmit={(values) => {
                console.log('submit');
                console.log(values);
                

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
    )

}

export default CreatePost