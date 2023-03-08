import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../Store/UserContext";
import "./Profile.css";
import { updateUser } from "../../APIs/profile";
import { toast } from "react-toastify";
import { ADD_USER } from "../../Config/constants";

function Profile() {
  const {
    user: { user },
    userDispatch,
  } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);

  const { name, email, address, phone, postal_code = "" } = user;

  const initialValues = { name, email, address, phone, postal_code };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required!"),
    email: Yup.string()
      .email("Please enter a valid Email Address!")
      .required("Email is Required!"),
    address: Yup.string().required("Address is Required!"),
    phone: Yup.number().required("Phone is Required!"),
    postal_code: Yup.string(),
  });

  const handleUpdateUser = (values) => {
    const updatedUser = { ...user, ...values };
    return updateUser(updatedUser)
      .then((res) => {
        userDispatch({
          type: ADD_USER,
          user: updatedUser,
        });
        toast.success(res.data.message);
        return setEditMode(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="profile">
      <div className="profile__title">Profile</div>
      <hr className="profile_divider" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleUpdateUser(values)}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          isSubmitting,
        }) => (
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="profile__formField">
              <span className="profile__formLabel">{`Name`}</span>{" "}
              <input
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                disabled={!editMode}
                className={`profile__formInput ${
                  touched.name && errors.name && "error"
                }`}
              />
              <p
                className={
                  touched.name && errors.name
                    ? "profile__formInputError"
                    : "hidden"
                }
              >
                {errors.name}
              </p>
            </div>

            <div className="profile__formField">
              <span className="profile__formLabel">{`Email`}</span>{" "}
              <input
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                disabled={!editMode}
                className={`profile__formInput ${
                  touched.email && errors.email && "error"
                }`}
              />
              <p
                className={
                  touched.email && errors.email
                    ? "profile__formInputError"
                    : "hidden"
                }
              >
                {errors.email}
              </p>
            </div>

            <div className="profile__formField">
              <span className="profile__formLabel">{`Address`}</span>{" "}
              <textarea
                value={values.address}
                onChange={handleChange("address")}
                onBlur={handleBlur("address")}
                disabled={!editMode}
                className={`profile__formInput h-32 ${
                  touched.address && errors.address && "error"
                }`}
              />
              <p
                className={
                  touched.address && errors.address
                    ? "profile__formInputError"
                    : "hidden"
                }
              >
                {errors.address}
              </p>
            </div>

            <div className="profile__formField">
              <span className="profile__formLabel">{`Phone Number`}</span>{" "}
              <input
                type="number"
                value={values.phone}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                disabled={!editMode}
                className={`profile__formInput ${
                  touched.phone && errors.phone && "error"
                }`}
              />
              <p
                className={
                  touched.phone && errors.phone
                    ? "profile__formInputError"
                    : "hidden"
                }
              >
                {errors.phone}
              </p>
            </div>

            <div className="profile__formField">
              <span className="profile__formLabel">{`Postal Code`}</span>{" "}
              <input
                value={values.postal_code}
                onChange={handleChange("postal_code")}
                onBlur={handleBlur("postal_code")}
                disabled={!editMode}
                className={`profile__formInput ${
                  touched.postal_code && errors.postal_code && "error"
                }`}
              />
              <p
                className={
                  touched.postal_code && errors.postal_code
                    ? "profile__formInputError"
                    : "hidden"
                }
              >
                {errors.postal_code}
              </p>
            </div>

            <div className="profile__formField">
              {editMode ? (
                <button
                  type="submit"
                  disabled={!isValid}
                  className="profile__actionsSubmit float-right"
                >
                  Update
                </button>
              ) : (
                <div className="profile__actions">
                  <button
                    onClick={() => setEditMode(true)}
                    className="profile__actionsSubmit"
                  >
                    Edit
                  </button>
                  <button className="profile__actionsConfirm">Print</button>
                </div>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Profile;
