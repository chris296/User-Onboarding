import React, {useState, useEffect} from 'react';
import { Form, withFormik, Field, } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const UserForm = ({ values, errors, touched, status}) => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        console.log('status had changed', status);

        status && setUser(user => [...user, status]);
    }, [status]);
    return (
        <div>
            <Form>
                <Field name = 'name' type='text' placeholder='enter name' />
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                <Field name = 'email' type='text' placeholder='enter email' />
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                <Field name = 'password' type='text' placeholder='enter password' />
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
                <label htmlFor='Tos'>Agree to Terms of Service:
                <Field name = 'Tos' type='checkbox' checked={values.Tos} />
                </label>

                <input type='submit' />
            </Form>
            {user.map(u => {
                return (
                    <ul key={u.id}>
                        <li>name: {u.name}</li>
                        <li>email: {u.email}</li>
                        <li>agreed to TOS: {u.Tos}</li>
                    </ul>
                )
            })}
        </div>
    );
}


const FormikUserForm = withFormik({
    mapPropsToValues(props) {
        return {
            name: props.name || '',
            email: props.email || '',
            password: props.password || '',
            Tos: props.Tos || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    }),

    handleSubmit(values, {setStatus, resetForm }) {
        console.log('submitting', values);
        axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
            console.log('success', res);
            setStatus(res.data);

            resetForm();
        })
        .catch(err => console.log(err.response));
    }
})(UserForm);
export default FormikUserForm;