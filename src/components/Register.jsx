import { useState } from "react";
import{useAuth} from "../context/AuthContext"
import {useNavigate,Link} from "react-router-dom";

const Register = () => {
    const [formData ,setFormData] = useState({
        username:'',
        email:"",
        name:'',
        password:'',
        confirmPassword:''
        });
        const [error,setError] =useState('');
        const {register} = useAuth();
        const navigate = useNavigate();

        const handleChange = (e) => {
            e.preventDefault();
            setFormData({...formData, [e.target.id]: e.target.value});
        }
            const handleSubmit = (e) => {
              e.preventDefault();
              setError('')
            

            if(formData.password.length < 6) {
                setError('Password must be at least 6 characters long');
                return;
            }

            const result = register({
                username: formData.username,
                email: formData.email,
                name: formData.name,
                password: formData.password
            });

            if(result.success) {
                navigate('/account');
            }else{
                setError(result.error || 'Register failed Please try again.')
            }
        };

        return (
            <div className="center-content">
              <div className="col-lg-6 col-md-9 col-sm-11">
                <div className="card custom-card-shadow bg-light border-0">
                  <div className="card-header bg-success text-white text-center rounded-top-4">
                    <h3 className="mb-0 fw-bold">Create a New Account</h3>
                  </div>
                  <div className="card-body p-4 p-md-5">
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        {/* Name Field */}
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                            <label htmlFor="name">Full Name</label>
                          </div>
                        </div>
                        {/* Username Field */}
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input type="text" className="form-control" id="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                            <label htmlFor="username">Username</label>
                          </div>
                        </div>
                        {/* Email Field */}
                        <div className="col-12">
                          <div className="form-floating">
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
                            <label htmlFor="email">Email address</label>
                          </div>
                        </div>
                        {/* Password Field */}
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                            <label htmlFor="password">Password</label>
                          </div>
                        </div>
                        {/* Confirm Password Field */}
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="d-grid gap-2 mt-4">
                        <button type="submit" className="btn btn-success btn-lg">
                          Register Account
                        </button>
                      </div>
                    </form>
        
                    <p className="mt-4 text-center text-muted">
                      Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
}

export default Register;