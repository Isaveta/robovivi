import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";

const AuthScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const role = location.state?.role || 'student';
    const [mode, setMode] = useState(location.state?.mode || 'login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (mode === 'register' && role === 'student') {
            if (!inviteCode || inviteCode.trim() === '') {
                setError("Будь ласка, введіть код запрошення, щоб приєднатися до класу!");
                return;
            }
        }

        try {
            if (mode === 'register') {
                // Створюємо користувача в Firebase Auth
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Записуємо додаткові дані в Firestore
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: name,
                    surname: surname,
                    email: email,
                    role: role,
                    inviteCode: role === 'student' ? inviteCode : null, // Зберігаємо код тільки для учня
                    createdAt: new Date().toISOString()
                });

                console.log("Користувача створено та дані записано в Firestore");
                navigate(role === 'student' ? '/student' : '/admin');
            } else {
                // Вхід
                await signInWithEmailAndPassword(auth, email, password);
                navigate(role === 'student' ? '/student' : '/admin');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: "url('/assets/clean-bg.PNG')" }}>
            <div className="w-full max-w-xl bg-slate-950/80 backdrop-blur-md border-2 border-cyan-400 rounded-3xl p-10 flex flex-col shadow-[0_0_30px_rgba(34,211,238,0.4)]">

                <div className="flex justify-center gap-12 mb-10">
                    <button onClick={() => setMode('login')} className={`text-xl font-bold pb-2 ${mode === 'login' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'}`}>УВІЙТИ</button>
                    <button onClick={() => setMode('register')} className={`text-xl font-bold pb-2 ${mode === 'register' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'}`}>ЗАРЕЄСТРУВАТИСЯ</button>
                </div>

                {error && <p className="text-red-500 text-center mb-4 font-bold">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {mode === 'register' && (
                        <>
                            <input type="text" placeholder="Напишіть як вас звати..." value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 outline-none focus:border-cyan-300" />
                            <input type="text" placeholder="Напишіть яке у вас прізвище..." value={surname} onChange={(e) => setSurname(e.target.value)} className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 outline-none focus:border-cyan-300" />
                        </>
                    )}

                    <input type="email" placeholder="Введіть вашу пошту" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 outline-none focus:border-cyan-300" required />
                    <input type="password" placeholder="Введіть пароль..." value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 outline-none focus:border-cyan-300" required />

                    {mode === 'register' && role === 'student' && (
                        <input type="text" placeholder="Код запрошення..." value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 outline-none focus:border-cyan-300" />
                    )}

                    <button type="submit" className="mt-6 bg-cyan-100 text-cyan-950 font-bold text-lg rounded-full py-4 shadow-[0_0_15px_rgba(207,250,254,0.5)] hover:bg-white transition-all">
                        {mode === 'login' ? 'УВІЙТИ' : 'ЗАРЕЄСТРУВАТИСЯ'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthScreen;