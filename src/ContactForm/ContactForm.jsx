import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from "yup";
import css from './ContactForm.module.css';
import 'yup-phone';

  const initialValues = {
        name: "",
        number: "",
}

const contactsFormSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
    number: Yup.string().phone("any", true, "Invalid phone number").required('Required'),
});

export default function ContactForm({onContact}) {
        const nameFieldId = useId();
        const numberFieldId = useId();

    const handleSubmit = (values, actions) => {
        onContact({
            id:  nanoid(),
            name: values.name,
            number: values.number,
        })
        actions.resetForm();
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema = {contactsFormSchema}>
            <Form>
                <label htmlFor={nameFieldId} >Name</label>
                <Field className={css.field} type="text" name="name" id={nameFieldId} />
                 <ErrorMessage name="name" component="span" />
                <label htmlFor={numberFieldId}>Number</label>
                <Field className={css.field} type="text" name="number" id={numberFieldId} />
                 <ErrorMessage name="number" component="span" />
                <button className={css.btn} type="submit">Add contact</button>
            </Form>
        </Formik>
    );
};