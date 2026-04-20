import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-green-700 font-semibold">
            Static Access
          </p>
          <h1 className="text-3xl font-bold mt-2">Create an Entry Point</h1>
          <p className="text-sm text-gray-600 mt-3">
            This website does not use backend registration. Use the dashboard directly.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard", { replace: true })}
          className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition-colors font-semibold"
        >
          Open Dashboard
        </button>

        <p className="text-sm text-gray-600">
          Already here? <Link to="/dashboard" className="text-green-700 underline">Go to dashboard</Link>
        </p>
      </div>
    </div>
  );
}