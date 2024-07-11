import React from 'react';
import './AccountChangePassword.css';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function AccountChangePassword() {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : {};


    const handleSubmit = (values, formikBag) => {
        const { setSubmitting } = formikBag;
        // Set isSubmitting state to true when submitting
        setSubmitting(true);

        // Send request to change password
        axios({
            method: 'PATCH',
            url: `${process.env.REACT_APP_SERVER_URL}/user/change-password`,
            data: {
                username: values.username,
                oldPassword: values.currentPassword,
                newPassword: values.newPassword
            }
        }).then((response) => {
            // Handle success response
            alert(response.data.message)
            formikBag.resetForm();
        }).catch((error) => {
            // Handle error
            console.error(error);
            if (error) {
                alert(error.response.data.message);
            }
        }).finally(() => {
            // Reset isSubmitting state after request is completed
            setSubmitting(false);

        });
    }

    return (
        <>
            <div className='text-b-lg text-center'>THÔNG TIN TÀI KHOẢN</div>
            <div className="form">
                <Formik
                    initialValues={{
                        currentPassword: '',
                        newPassword: '',
                        repeatNewPassword: '',
                        username: user.username
                    }}
                    validationSchema={Yup.object().shape({
                        currentPassword: Yup.string().required('Mật khẩu hiện tại là bắt buộc'),
                        newPassword: Yup.string().required('Mật khẩu mới là bắt buộc'),
                        repeatNewPassword: Yup.string()
                            .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu mới không khớp')
                            .required('Nhập lại mật khẩu mới là bắt buộc')
                    })}
                    onSubmit={(values, formikBag) => {
                        handleSubmit(values, formikBag);
                    }}
                >
                    {(formikProps) => (
                        <Form className='account-form-info'>
                            <div className="form-group">
                                <label htmlFor="currentPassword">MẬT KHẨU HIỆN TẠI:</label>
                                <Field type="password" id="currentPassword" name="currentPassword" className="form-control" />
                                {formikProps.errors.currentPassword && formikProps.touched.currentPassword && (
                                    <div className="error">{formikProps.errors.currentPassword}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">MẬT KHẨU MỚI:</label>
                                <Field type="password" id="newPassword" name="newPassword" className="form-control" />
                                {formikProps.errors.newPassword && formikProps.touched.newPassword && (
                                    <div className="error">{formikProps.errors.newPassword}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="repeatNewPassword">NHẬP LẠI MẬT KHẨU MỚI:</label>
                                <Field type="password" id="repeatNewPassword" name="repeatNewPassword" className="form-control" />
                                {formikProps.errors.repeatNewPassword && formikProps.touched.repeatNewPassword && (
                                    <div className="error">{formikProps.errors.repeatNewPassword}</div>
                                )}
                            </div>

                            <button type="submit" disabled={formikProps.isSubmitting}>
                                {formikProps.isSubmitting ? "Lưu thay đổi ..." : "Lưu thay đổi"}
                            </button>
                        </Form>
                    )}

                </Formik>
            </div>

        </>
    )
}

export default AccountChangePassword;
