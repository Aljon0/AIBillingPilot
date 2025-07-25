import { Building } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "../Toast";

const LoginPage = ({ onLogin }) => {
  // Fixed admin credentials
  const ADMIN_CREDENTIALS = {
    email: "admin@backoffice.com",
    password: "admin123",
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { showToast, ToastComponent } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if credentials match the fixed admin account
    if (
      formData.email === ADMIN_CREDENTIALS.email &&
      formData.password === ADMIN_CREDENTIALS.password
    ) {
      showToast("Login successful! Welcome back.", "success");
      setTimeout(() => {
        onLogin(); // Successful login after showing toast
      }, 1500);
    } else {
      showToast("Invalid email or password. Please try again.", "error");
    }

    setIsLoading(false);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    showToast(
      "Password reset instructions will be sent to your email.",
      "warning"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative">
      {/* Toast Component */}
      <ToastComponent />

      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-slate-900 rounded-lg flex items-center justify-center">
            <Building className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            AI-Driven Back Office & Billing Automation
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isLoading}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={isLoading}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                disabled={isLoading}
                className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded disabled:cursor-not-allowed"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-slate-900"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isLoading}
              className="text-sm text-slate-600 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </div>

        {/* Demo credentials hint */}
        <div className="text-center text-sm text-slate-500">
          <p>Demo credentials:</p>
          <p>Email: admin@backoffice.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
