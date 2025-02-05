import { useState } from "react";

function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    course: "",
    username: "",
    password: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/users/create",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User created successfully");
      setFormData({
        name: "",
        rollNo: "",
        course: "",
        username: "",
        password: "",
        email: ""
      });
    } catch (error) {
      alert("Error creating user: " + error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#006D77]/10 flex items-center justify-center p-4 font-[Montserrat]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-8 font-[Montserrat]">
        <h2 className="text-2xl font-bold mb-8 text-[#006D77] text-center font-[Montserrat]">Create New User</h2>
        <form onSubmit={handleSubmit} className="space-y-6 font-[Montserrat]">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#006D77] mb-1 font-[Montserrat]">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-transparent font-[Montserrat]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="rollNo" className="block text-sm font-medium text-[#006D77] mb-1 font-[Montserrat]">
                  Roll No
                </label>
                <input
                  type="text"
                  id="rollNo"
                  placeholder="Roll Number"
                  value={formData.rollNo}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-transparent font-[Montserrat]"
                />
              </div>
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-[#006D77] mb-1 font-[Montserrat]">
                  Course
                </label>
                <input
                  type="text"
                  id="course"
                  placeholder="Course Name"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-transparent font-[Montserrat]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-[#006D77] mb-1 font-[Montserrat]">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-transparent font-[Montserrat]"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#006D77] mb-1 font-[Montserrat]">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-transparent font-[Montserrat]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#006D77] mb-1 font-[Montserrat]">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-transparent font-[Montserrat]"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#006D77] text-white py-3 px-4 rounded-md hover:bg-[#006D77]/90 transition-colors duration-200 font-medium font-[Montserrat]"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;