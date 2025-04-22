import { Link } from "react-router-dom";
import { LogotypeLink } from "../components/LogotypeLink";
import { FormikErrors, FormikValues, useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";

const validateForm = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const errors: FormikErrors<FormikValues> = {};

  if (!email || !password) errors.login = "All fields Required";
  else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email) ||
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]).+$/i.test(
      password
    )
  )
    errors.login = "invalid email or password";

  return errors;
};

export const SignIn = () => {
  const { signIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateForm,
    onSubmit: async (values) => {
      await signIn!(values.email, values.password);
    },
  });

  return (
    <div id="signin">
      <div className="content">
        <header className="section-header">
          <h1>Login</h1>
        </header>
        <section className="section-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-submit">
              Log In
            </button>
          </form>
          <footer className="section-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-link">
                Sign Up
              </Link>
            </p>
          </footer>
        </section>
      </div>
      <div className="logo-footer">
        <LogotypeLink />
      </div>
    </div>
  );
};
