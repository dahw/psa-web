"use client";
import { signIn, getCsrfToken } from "next-auth/react";
import { useState, useEffect } from "react";

export default function SignIn() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    // fetch csrf token on client since this is a client component
    getCsrfToken().then((token) => setCsrfToken(token || undefined));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { username: user, password: pass, callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div>
          <label className="block text-sm">Username</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full p-2 rounded bg-[#1A1A1A]"
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full p-2 rounded bg-[#1A1A1A]"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-[#6B8E23] rounded">
          Sign in
        </button>
      </form>
    </div>
  );
}
