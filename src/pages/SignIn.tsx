import { useState } from "react";
import { Link } from "react-router-dom";
import { LogotypeLink } from "../components/LogotypeLink";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div id="signin">
      <div className="content">
        <header className="section-header">
          <h1>Login</h1>
        </header>
        <section className="section-body">
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
