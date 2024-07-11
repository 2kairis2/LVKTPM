import { Field, Form, Formik } from "formik";
import React from "react";
import "./AccountInfor.css";
import axios from "axios";
function AccountInfor() {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : {};

  const optionGender = ["Nam", "Nữ", "Khác"];

  const handleSubmit = (values, formikBag) => {
    const { setSubmitting } = formikBag;
    const { username, ...prevValues } = values;
    // Ngăn ngừa việc gửi đi biểu mẫu nhiều lần
    setSubmitting(true);

    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_SERVER_URL}/user/update?uid=${user._id}`,
      data: prevValues,
    })
      .then((response) => {
        // Extract updated user data from the response
        const updatedUserData = response.data.data;

        // Merge updated user data with existing user data from localStorage
        const updatedUser = { ...user, ...updatedUserData };
        const { password, ...dataExcludePassword } = updatedUser;
        console.log(dataExcludePassword);
        // Save the merged user data back to localStorage
        localStorage.setItem("user", JSON.stringify(dataExcludePassword));
        alert("Cập nhật thông tin thành công");

        // Handle any other logic after successful update
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      })
      .finally(() => {
        // Reset the submitting state after request is completed
        setSubmitting(false);
      });
  };
  return (
    <>
      <div className="text-b-lg text-center">THÔNG TIN TÀI KHOẢN</div>
      <div className="form">
        <Formik
          initialValues={{
            username: user?.username ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            gender: user?.gender ?? "",
            birthday:
              new Date(user?.birthday).toISOString().substring(0, 10) ?? "",
          }}
          onSubmit={(e, values) => handleSubmit(e, values)}
        >
          {(formikProps) => (
            <Form className="account-form-info">
              <div className="form-group">
                <label htmlFor="username">Tên tài khoản:</label>
                <Field
                  type="text"
                  id="username"
                  disabled
                  name="username"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại:</label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Giới tính:</label>
                <Field
                  as="select"
                  id="gender"
                  name="gender"
                  className="form-control"
                >
                  <option value="">Chọn giới tính</option>
                  {optionGender.map((item, id) => {
                    return (
                      <option key={id} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className="form-group">
                <label htmlFor="birthday">Ngày sinh:</label>
                <Field
                  type="date"
                  id="birthday"
                  name="birthday"
                  className="form-control"
                />
              </div>
              <button type="submit" disabled={formikProps.isSubmitting}>
                {formikProps.isSubmitting
                  ? "Đang thay đổi ..."
                  : "Lưu thay đổi"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AccountInfor;
