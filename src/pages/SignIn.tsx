import { useState } from "react";
import { Link } from "react-router-dom";
import { LogotypeLink } from "../components/LogotypeLink";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="signin">
      <div className="content">
        <div className="section-header">
          <h1>Login</h1>
        </div>
        <div className="section-body">
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email address"
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
            <button type="submit" className="btn btn-submit">
              Log In
            </button>
          </form>
          <div className="section-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="logo-footer">
        <LogotypeLink />
      </div>
    </div>
  );
};
