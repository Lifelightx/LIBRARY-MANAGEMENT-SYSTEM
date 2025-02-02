import React, { useState } from 'react'

function Login() {
  const [loginType, setLoginType] = useState('admin')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-1/2 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Login</h2>
        
        <div className="flex flex-col items-center mb-4 w-full">
          <label htmlFor="loginType" className="block text-sm font-medium text-gray-700">Login as</label>
          <select
            id="loginType"
            name="loginType"
            value={loginType}
            onChange={handleLoginTypeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        
        <div className="flex flex-col items-center mb-4 w-full">
          {loginType === 'admin' ? (
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              className="shadow-sm focus:ring-indigo-500 px-3 py-2 focus:border-indigo-500 mt-1 block w-3/4 sm:text-sm border-2 border-indigo-500 rounded-md"
            />
          ) : (
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              className="shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-3/4 sm:text-sm border-2 border-indigo-500 rounded-md"
            />
          )}
        </div>

        <div className="flex flex-col items-center mb-4 w-full">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-3/4 sm:text-sm border-2 border-indigo-500 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
