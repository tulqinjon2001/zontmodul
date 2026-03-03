import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, Mail, Loader2, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email yoki parol noto'g'ri");
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0C0F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.webp" alt="ZONT MODUL" className="h-16 w-16 rounded-full mb-3" />
          <h1 className="font-mono text-xl tracking-[0.12em] font-bold text-[#F4F6FA]">
            ZONT MODUL
          </h1>
          <p className="text-xs text-[#A6AFBF] mt-1">Admin panel</p>
        </div>

        {/* Form */}
        <div className="bg-[#14171C] border border-[#A6AFBF]/15 rounded-sm p-8">
          <h2 className="font-mono text-xs tracking-[0.18em] uppercase text-[#F2B33D] mb-2">
            KIRISH
          </h2>
          <div className="h-0.5 w-10 bg-[#F2B33D] mb-6" />

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs text-[#A6AFBF] mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A6AFBF]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@email.com"
                  className="w-full pl-9 pr-4 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/40 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-[#A6AFBF] mb-1.5 uppercase tracking-wide">
                Parol
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A6AFBF]" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-3 rounded-sm text-[#F4F6FA] placeholder:text-[#A6AFBF]/40 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A6AFBF] hover:text-[#F4F6FA]"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
              {loading ? 'Kirish...' : 'Kirish'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#A6AFBF]/40 mt-6">
          <a href="/" className="hover:text-[#F2B33D] transition-colors">← Asosiy sahifaga qaytish</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
