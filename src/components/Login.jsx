import { useState } from "react";
import {useNavigate, Link} from 'react-router-dom';
import{useAuth} from "../context/AuthContext";

const Login = () => {
    const [identifier,serIdentifier] = useState('') // username or email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if(identifier || !password) {
            setError(`Please enter your email or username and password`);
            return;
        }
        // to login via authContext
        const result = login(identifier,password);

        if(result.success) {
            navigate('/account');
        }else{
            setError(result.error || 'Login failed. Please check your credentials');
        }
    };

    return (
        <div className="center-content">
        <div className="col-lg-5 col-md-8 col-sm-10">
          <div className="card custom-card-shadow bg-light border-0">
            <div className="card-header bg-primary text-white text-center rounded-top-4">
              <h3 className="mb-0 fw-bold">Sign In to Your Account</h3>
            </div>
            <div className="card-body p-4 p-md-5">
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="identifier"
                    placeholder="name@example.com or username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                  <label htmlFor="identifier">Email or Username</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Login
                  </button>
                </div>
              </form>
              
              <p className="mt-4 text-center text-muted">
                Don't have an account? <Link to="/register" className="text-decoration-none">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div> 
    )
};

export default Login;