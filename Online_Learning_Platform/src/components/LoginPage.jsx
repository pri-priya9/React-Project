import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f2e4f] to-[#1b4e7b] px-4">
      <div className=" flex flex-col md:flex-row bg-[#0b2d4a] rounded-2xl shadow-2xl overflow-hidden w-90 max-w-5xl mt-9">

        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 mb-7 px-8 py-12 text-white min-h-[500px] flex flex-col justify-center">
        <div className="w-70 mb-5 mx-auto ">
          <div className="mb-9">
            <div className="text-sm font-bold mb-9">🚀 LOGO</div>
            <h1 className="text-3xl text-center font-semibold">Welcome Back!</h1>
            <p className="text-sm mt-1 text-center text-gray-300">Please Log in to your Account.</p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 rounded-md bg-[#12395f] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-md bg-[#12395f] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <Link to='/document-verification'><button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold transition">
              Login
            </button>
            </Link>
          </div>

          <p className="text-sm text-center mt-6 text-gray-300">
            Don't have account?{" "}
            <Link to="/" className="text-yellow-400 hover:underline">
              Signup
            </Link>
          </p>
        </div>
        </div>

        {/* Right Side - Image */}
        
      </div>
      <div className="mt-10 m-4">
          <img
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-4525.jpg?uid=R200268884&ga=GA1.1.649360656.1737985464&semt=ais_hybrid&w=740"
            alt="Signup Illustration"
            className="p-6 md:p-10 max-h-[450px] object-contain border-2 border-[#0b2d4a] rounded-lg shadow-lg"
          />
        </div>
    </div>
  );
}

export default LoginPage;
