import { Link, useNavigate } from "react-router-dom";
import { LogotypeLink } from "../components/LogotypeLink";
import { FormikErrors, FormikValues, useFormik } from "formik";
import { useAuth } from "../contexts/AuthContext";

export interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
}

const validateForm = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  termsAndConditions,
}: SignUpValues) => {
  const errors: FormikErrors<FormikValues> = {};

  if (!firstName || !lastName || !email || !password || !confirmPassword)
    errors.signup = "All fields Required";
  else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email) ||
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]).+$/i.test(
      password
    )
  )
    errors.signup = "invalid email or password";
  else if (confirmPassword !== password)
    errors.signup = "Password not matching";
  else if (!termsAndConditions)
    errors.signup = "Terms and conditions must be accepted";

  return errors;
};

export const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAndConditions: false,
    },
    validate: validateForm,
    onSubmit: async (values) => {
      await signUp!(values);
      navigate("/auth/signin", { replace: true });
    },
  });

  return (
    <div id="signup">
      <div className="content">
        <header className="section-header">
          <h1>Create Account</h1>
        </header>
        <section className="section-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
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
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="termsAndConditions"
                id="termsAndConditions"
                checked={formik.values.termsAndConditions}
                onChange={formik.handleChange}
              />
              <label htmlFor="termsAndConditions">
                I accept{" "}
                <Link to="#" className="text-link">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            <button type="submit" className="btn btn-submit">
              Create Account
            </button>
          </form>
        </section>
        <footer className="section-footer">
          <p>
            Already have an account?{" "}
            <Link to="/auth/signin" className="text-link">
              Login
            </Link>
          </p>
        </footer>
      </div>
      <div className="logo-footer">
        <LogotypeLink />
      </div>
    </div>
  );
};
