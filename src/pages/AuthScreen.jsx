import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const role = location.state?.role || 'student';
    const initialMode = location.state?.mode || 'login';
    const [mode, setMode] = useState(initialMode);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role === 'student') navigate('/student');
        else navigate('/admin');
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: "url('/assets/clean-bg.PNG')" }}>

            <div className="w-full max-w-xl bg-slate-950/80 backdrop-blur-md border-2 border-cyan-400 rounded-3xl p-10 flex flex-col shadow-[0_0_30px_rgba(34,211,238,0.4),inset_0_0_15px_rgba(34,211,238,0.2)]">

                <div className="flex justify-center gap-12 mb-10">
                    <button onClick={() => setMode('login')} className={`text-xl font-bold pb-2 transition-all ${mode === 'login' ? 'text-cyan-400 border-b-2 border-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-500 hover:text-cyan-200'}`}>УВІЙТИ</button>
                    <button onClick={() => setMode('register')} className={`text-xl font-bold pb-2 transition-all ${mode === 'register' ? 'text-cyan-400 border-b-2 border-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-500 hover:text-cyan-200'}`}>ЗАРЕЄСТРУВАТИСЯ</button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {mode === 'register' && (
                        <>
                            <input type="text" placeholder="Напишіть як вас звати..." className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 placeholder-cyan-700 outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all" />
                            <input type="text" placeholder="Напишіть яке у вас прізвище..." className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 placeholder-cyan-700 outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all" />
                        </>
                    )}

                    <input type="email" placeholder="Введіть вашу пошту" className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 placeholder-cyan-700 outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all" />
                    <input type="password" placeholder="Введіть пароль..." className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 placeholder-cyan-700 outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all" />

                    {mode === 'register' && role === 'student' && (
                        <input type="text" placeholder="Код запрошення (наприклад, X7B-9WQ)..." className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 placeholder-cyan-700 outline-none focus:border-cyan-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all" />
                    )}

                    <button type="submit" className="mt-6 bg-cyan-100 text-cyan-950 font-bold text-lg rounded-full py-4 shadow-[0_0_15px_rgba(207,250,254,0.5)] hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-all">
                        {mode === 'login' ? 'УВІЙТИ' : 'ЗАРЕЄСТРУВАТИСЯ'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthScreen;