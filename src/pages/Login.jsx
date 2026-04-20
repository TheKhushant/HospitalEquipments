import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-green-700 font-semibold">
              Static Access
            </p>
            <h1 className="text-3xl font-bold mt-2">Enter the Product Dashboard</h1>
            <p className="text-sm text-gray-600 mt-3">
              This site is fully static. No account or backend login is required.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard", { replace: true })}
            className="w-full py-3 px-4 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors font-semibold"
          >
            Open Dashboard
          </button>

          <div className="flex items-center justify-center gap-4 text-sm">
            <Link to="/shop" className="text-green-700 underline">
              Shop
            </Link>
            <Link to="/" className="text-green-700 underline">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}