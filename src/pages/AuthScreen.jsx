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

    const getErrorMessage = (code) => {
        switch (code) {
            case 'auth/user-not-found': return 'Користувача з такою поштою не знайдено.';
            case 'auth/wrong-password': return 'Невірний пароль.';
            case 'auth/email-already-in-use': return 'Ця пошта вже використовується.';
            case 'auth/weak-password': return 'Пароль занадто слабкий (мінімум 6 символів).';
            default: return 'Сталася помилка, спробуйте ще раз.';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Перевірка коду запрошення для студента
        if (mode === 'register' && role === 'student' && !inviteCode) {
            setError("Будь ласка, введіть код запрошення!");
            return;
        }

        try {
            if (mode === 'register') {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // 1. Зберігаємо дані користувача
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: name,
                    surname: surname,
                    email: email,
                    role: role,
                    inviteCode: inviteCode,
                    createdAt: new Date().toISOString()
                });

                // 2. Ініціалізуємо прогрес: відкрита тільки теорія першої місії
                await setDoc(doc(db, "userProgress", user.uid), {
                    missions: {
                        1: { theory: "active", test: "locked", practice: "locked" },
                        2: { theory: "locked", test: "locked", practice: "locked" },
                        3: { theory: "locked", test: "locked", practice: "locked" },
                        4: { theory: "locked", test: "locked", practice: "locked" }
                    }
                });

                navigate(role === 'student' ? '/student' : '/admin');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                navigate(role === 'student' ? '/student' : '/admin');
            }
        } catch (err) {
            setError(getErrorMessage(err.code));
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: "url('/assets/clean-bg.PNG')" }}>
            <div className="w-full max-w-xl bg-slate-950/80 backdrop-blur-md border-2 border-cyan-400 rounded-3xl p-10 flex flex-col shadow-[0_0_30px_rgba(34,211,238,0.4)]">

                <div className="flex justify-center gap-12 mb-10">
                    <button onClick={() => setMode('login')} className={`text-xl font-bold pb-2 ${mode === 'login' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'}`}>УВІЙТИ</button>
                    <button onClick={() => setMode('register')} className={`text-xl font-bold pb-2 ${mode === 'register' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'}`}>ЗАРЕЄСТРУВАТИСЯ</button>
                </div>

                {error && <p className="text-red-500 text-center mb-4 font-bold animate-pulse">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {mode === 'register' && (
                        <>
                            <input type="text" placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 outline-none" required />
                            <input type="text" placeholder="Прізвище" value={surname} onChange={(e) => setSurname(e.target.value)} className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 outline-none" required />
                        </>
                    )}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 outline-none" required />
                    <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 outline-none" required />

                    {mode === 'register' && role === 'student' && (
                        <input type="text" placeholder="Код запрошення..." value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} className="w-full bg-slate-900/50 border border-cyan-500/50 rounded-xl px-5 py-4 text-cyan-100 outline-none" />
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