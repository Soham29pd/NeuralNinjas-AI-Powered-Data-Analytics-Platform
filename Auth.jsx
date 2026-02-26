import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!isLogin && !agree) {
      setError("You must agree to terms & conditions");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        // LOGIN
        await signInWithEmailAndPassword(auth, email, password);
        const name = email.split('@')[0];
        localStorage.setItem("userName", name);
      } else {
        // SIGNUP
        await createUserWithEmailAndPassword(auth, email, password);
        const name = email.split('@')[0];
        localStorage.setItem("userName", name);
      }

      navigate("/onboarding");
    } catch (err) {
      setError(err.message.replace("Firebase:", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="logo">TrendSight</h1>
        <p className="tagline">Hack the Space 🚀</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <div className="agree-box">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label>I agree to all Terms & Conditions</label>
            </div>
          )}

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>

        <p className="back" onClick={() => navigate("/")}>
          ← Back to Landing
        </p>
      </div>
    </div>
  );
};

export default Auth;
