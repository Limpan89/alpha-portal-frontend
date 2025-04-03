import { useState } from "react";
import { Link } from "react-router-dom";
import { LogotypeLink } from "../components/LogotypeLink";

export const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div id="signup">
      <div className="content">
        <header className="section-header">
          <h1>Create Account</h1>
        </header>
        <section className="section-body">
          <form>
            <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                placeholder="Enter your first name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                name="lname"
                id="lname"
                placeholder="Enter your last name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                name="confirm"
                id="confirm"
                placeholder="Confirm your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" />
              <label htmlFor="terms">
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
