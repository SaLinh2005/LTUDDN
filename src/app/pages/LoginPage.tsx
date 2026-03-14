import { useState } from 'react';
import { useNavigate } from 'react-router';
// 👈 THÊM DÒNG NÀY ĐỂ GỌI HÀM GHI LOG (Nhớ check lại đường dẫn file utils của em)
import { logAuditEvent } from '../utils/auditLogger'; 

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 👈 Thêm chữ 'async' vào đây
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Store login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email || 'anhthuqtqt@gmail.com');
    
    // 👈 THÊM ĐOẠN NÀY ĐỂ GHI NHẬN LỊCH SỬ ĐĂNG NHẬP
    try {
      await logAuditEvent({
        action_type: 'Authentication',
        resource_path: '/login',
        new_values: { method: 'Email/Password' }
      });
    } catch (error) {
      console.error("Lỗi khi ghi Audit Log:", error);
    }

    // Redirect to home
    navigate('/');
  };

  // 👈 Thêm chữ 'async' vào đây
  const handleGoogleLogin = async () => {
    // Store login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'anhthuqtqt@gmail.com');
    
    // 👈 THÊM ĐOẠN NÀY ĐỂ GHI NHẬN LỊCH SỬ ĐĂNG NHẬP BẰNG GOOGLE
    try {
      await logAuditEvent({
        action_type: 'Authentication',
        resource_path: '/login',
        new_values: { method: 'Google OAuth' }
      });
    } catch (error) {
      console.error("Lỗi khi ghi Audit Log:", error);
    }

    // Redirect to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">⚡</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">DemoWebsite</span>
        </div>

        {/* Right: Nav Links */}
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Help
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Explore apps
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Contact Sales
          </a>
          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm">
            Sign up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-6 py-12">
        <div className="w-full max-w-5xl grid grid-cols-2 gap-12 items-center">
          {/* Left Section - Introduction */}
          <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-10 border border-orange-100">
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">⚡</span>
              </div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                Automate your workflows
              </h1>
              <p className="text-gray-600 leading-relaxed">
                DemoWebsite helps teams automate tasks and connect systems without writing code.
              </p>
            </div>

            <button className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-medium transition-colors border border-gray-200 shadow-sm">
              Explore Automation
            </button>
          </div>

          {/* Right Section - Login Card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                Log in to your account
              </h2>
              <p className="text-sm text-gray-600">Welcome back!</p>
            </div>

            <form onSubmit={handleLogin}>
              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-3 mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm text-gray-700">Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or use your email address to log in</span>
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors mb-4"
              >
                Log in
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600">
                Don't have an account yet?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}