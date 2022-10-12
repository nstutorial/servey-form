import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    
    
  return (
    <div className="session">
    <div className="form_container">
        <div className="column-left">
            <div className="login-left">
                <h2>Welcome Back</h2>
                <p>Create your account. <br/>Honesty is the best policy</p>
                <Link to="/" className="button">Sign Up</Link>
            </div>
        </div>

        <div className="column-right">
            <div className="login-form">
                <h2>Login</h2>
                <form action="" method="post">
                    <div>
                        <label htmlFor="">Username or Email<span>*</span></label>
                        <input type="text" placeholder="Username or Email" name='username' required/>
                    </div>
                    <div>
                        <label htmlFor="">Password<span>*</span></label>
                        <input type="password" placeholder="Password" name='password' required/>
                    </div>
                    
                    <Link to="/contact"> <p><input type="submit" value="Login" /></p></Link>
                    
                    
                    <p><Link to="">Forget password?</Link></p>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login