"use client";
import { signIn, getCsrfToken } from "next-auth/react";
import { useState, useEffect } from "react";

export default function SignIn() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetch csrf token on client since this is a client component
    getCsrfToken().then((token) => setCsrfToken(token || undefined));
  }, []);

  const validateForm = () => {
    if (!user.trim()) {
      setError("Username is required");
      return false;
    }
    if (!pass.trim()) {
      setError("Password is required");
      return false;
    }
    if (pass.length < 4) {
      setError("Password must be at least 4 characters");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await signIn("credentials", { username: user, password: pass, callbackUrl: "/" });
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#6B8E23] mb-2">PSA</h1>
          <p className="text-[#9CA3AF]">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="username" className="block text-sm mb-2">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#6B8E23] focus:outline-none transition-colors"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#6B8E23] focus:outline-none transition-colors"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-[#6B8E23] rounded-lg font-semibold hover:bg-[#4A5D23] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        
        {process.env.NODE_ENV === 'development' && (
          <p className="text-center text-[#9CA3AF] text-sm mt-6">
            Demo credentials: admin / secret
          </p>
        )}
      </div>
    </div>
  );
}
