import React, { useContext } from "react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { login, register } from "../../APIs/login";
import { UserContext } from "../../Store/UserContext";
import { ADD_USER } from "../../Config/constants";

function Login() {
  const [loginRegisterSwitch, setLoginRegisterSwitch] = useState(true);
  const { userDispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { email, password } = values;

    return login(email, password)
      .then((response) => {
        const { user } = response.data;
        if (user && Object.keys(user)) {
          userDispatch({
            type: ADD_USER,
            user: user,
          });
          return navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleRegister = (values) => {
    return register(values)
      .then((response) => {
        if (response.data) {
          const { user } = response.data;
          userDispatch({
            type: ADD_USER,
            user: user,
          });
          return navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen text-black bg-gray-900 pt-10 pb-5">
      <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
        <div className="flex items-center justify-center">
          <FaOpencart className="text-white text-4xl mr-5" />
          <h1 className="font-bold text-center text-white text-4xl">
            BuyTheBest
          </h1>
        </div>
        <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
          <ul className="flex items-center justify-center flex-wrap">
            <li>
              <button
                className={`transition-all duration-500 inline-block py-3 px-4 text-sm font-medium text-center rounded-tl-lg rounded-bl-lg border-2 ${
                  loginRegisterSwitch && "active"
                }`}
                onClick={() => setLoginRegisterSwitch(true)}
              >
                Log In
              </button>
            </li>
            <li>
              <button
                className={`transition-all duration-500 inline-block py-3 px-4 text-sm font-medium text-center rounded-tr-lg rounded-br-lg border-2 ${
                  !loginRegisterSwitch && "active"
                }`}
                onClick={() => setLoginRegisterSwitch(false)}
              >
                Sign Up
              </button>
            </li>
          </ul>

          {loginRegisterSwitch ? (
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Please enter a valid Email Address!")
                  .required("Email is Required!"),
                password: Yup.string()
                  .required("Password is Required!")
                  .min(5, "Password must be at least 6 Characters"),
              })}
              onSubmit={(values) => handleLogin(values)}
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
                <form
                  className="flex flex-col space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col space-y-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={`border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow ${
                        touched.email && errors.email && "error"
                      }`}
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder="Email Id"
                    />
                    <p className={`text-red-400 text-xs`}>{errors.email}</p>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className={`border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow ${
                        touched.password && errors.password && "error"
                      }`}
                      value={values.password}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      placeholder="Password"
                    />
                    <p
                      className={`${
                        touched.password && errors.password ? "block" : "hidden"
                      } text-red-400 text-xs`}
                    >
                      {errors.password}
                    </p>
                  </div>

                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
                phone: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is Required!"),
                email: Yup.string()
                  .email("Please enter a valid Email Address!")
                  .required("Email is Required!"),
                password: Yup.string()
                  .required("Password is Required!")
                  .min(5, "Password must be at least 6 Characters"),
                confirmPassword: Yup.string().oneOf(
                  [Yup.ref("password"), null],
                  "Passwords must match"
                ),
                address: Yup.string().required("Address is Required!"),
                phone: Yup.string().required("Phone is Required!"),
              })}
              onSubmit={(values) => handleRegister(values)}
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
                <form
                  className="flex flex-col space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col space-y-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow ${
                        touched.name && errors.name && "error"
                      }`}
                      value={values.name}
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      placeholder="Name"
                    />
                    <p
                      className={`${
                        touched.name && errors.name ? "block" : "hidden"
                      } text-red-400 text-xs`}
                    >
                      {errors.name}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={`border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow ${
                        touched.email && errors.email && "error"
                      }`}
                      placeholder="Email Id"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                    <p
                      className={`${
                        touched.email && errors.email ? "block" : "hidden"
                      } text-red-400 text-xs`}
                    >
                      {errors.email}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className={`border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow ${
                        touched.password && errors.password && "error"
                      }`}
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                    <p
                      className={`${
                        touched.password && errors.password ? "block" : "hidden"
                      } text-red-400 text-xs`}
                    >
                      {errors.password}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <input
                      type="password"
                      name="conPassword"
                      id="conPassword"
                      className={`border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow ${
                        touched.confirmPassword &&
                        errors.confirmPassword &&
                        "error"
                      }`}
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                    />
                    <p
                      className={`${
                        touched.confirmPassword && errors.confirmPassword
                          ? "block"
                          : "hidden"
                      } text-red-400 text-xs`}
                    >
                      {errors.confirmPassword}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className={`border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow ${
                        touched.address && errors.address && "error"
                      }`}
                      placeholder="Address"
                      value={values.address}
                      onChange={handleChange("address")}
                      onBlur={handleBlur("address")}
                    />
                    <p
                      className={`${
                        touched.address && errors.address ? "block" : "hidden"
                      } text-red-400 text-xs`}
                    >
                      {errors.address}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      className={`border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow ${
                        touched.phone && errors.phone && "error"
                      }`}
                      placeholder="Phone Number"
                      value={values.phone}
                      onChange={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                    />
                    <p
                      className={`${
                        touched.phone && errors.phone ? "block" : "hidden"
                      } text-red-400 text-xs`}
                    >
                      {errors.phone}
                    </p>
                  </div>

                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
