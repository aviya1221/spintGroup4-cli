import React from 'react'
import{Link} from 'react-router-dom'

export default function Login() {
  return (
    <>
    <div className="container py-4">
      <h2>Login</h2>
      <form>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>

    </>
  )
}
