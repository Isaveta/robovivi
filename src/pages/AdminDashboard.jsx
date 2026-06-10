import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { userData } = useAuth();
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [inviteCode, setInviteCode] = useState('X7B-9WQ');

    const handleGenerateNewCode = async () => {
        const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        try {
            await setDoc(doc(db, "invites", newCode), {
                code: newCode,
                teacherId: userData.uid,
                status: "active",
                createdAt: new Date().toISOString()
            });
            setInviteCode(newCode);
            alert("Новий код успішно створено в базі!");
        } catch (error) {
            console.error("Помилка при створенні коду:", error);
            alert("Не вдалося створити код.");
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-slate-900 bg-cover bg-center text-cyan-100 font-sans p-6 md:p-8 relative"
             style={{ backgroundImage: "url('/assets/clean-bg.PNG')" }}>

            <header className="flex justify-between items-center mb-8 bg-slate-950/70 p-6 rounded-3xl border border-cyan-500/40 backdrop-blur-md shadow-[0_4px_20px_rgba(34,211,238,0.1)]">

                <div className="flex items-center gap-6">
                    <div>
                        <h1 className="text-xl font-bold text-cyan-400 tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] mb-2">ПАНЕЛЬ ВЧИТЕЛЯ</h1>

                        <div className="flex items-center gap-3">
                            <select className="bg-slate-900/80 border border-cyan-500/50 text-white text-sm rounded-lg px-3 py-1.5 outline-none focus:border-cyan-300">
                                <option>7-А Інформатика</option>
                                <option>8-Б Робототехніка</option>
                            </select>

                            <button className="text-xs bg-slate-800 border border-slate-600 text-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-700 hover:text-white transition-colors">
                                + Новий клас
                            </button>

                            <button
                                onClick={() => setIsInviteModalOpen(true)}
                                className="text-xs font-bold bg-cyan-500/20 border border-cyan-400 text-cyan-300 px-4 py-1.5 rounded-lg hover:bg-cyan-500 hover:text-slate-900 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all flex items-center gap-2"
                            >
                                🔗 ЗАПРОСИТИ УЧНІВ
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="font-bold text-white text-sm">
                                {userData ? `${userData.surname} ${userData.name}` : "Завантаження..."}
                            </div>
                            <div className="text-xs text-cyan-500">Вчитель</div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]"></div>
                    </div>
                    <button onClick={() => navigate('/')} className="text-sm text-cyan-500 underline hover:text-cyan-300 transition-colors border-l border-slate-700 pl-6">Вийти</button>
                </div>
            </header>

            <main className="flex flex-col gap-6 max-w-[1600px] w-full mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-6 flex items-center gap-4 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
                        <div className="w-12 h-12 rounded-full bg-cyan-900/50 border border-cyan-400 flex items-center justify-center text-2xl">👥</div>
                        <div>
                            <div className="text-slate-400 text-xs font-bold tracking-wider mb-1">ВСІ УЧНІ</div>
                            <div className="text-3xl font-bold text-white">24</div>
                        </div>
                    </div>
                    <div className="bg-slate-950/70 backdrop-blur-md border border-green-500/40 rounded-2xl p-6 flex items-center gap-4 shadow-[inset_0_0_20px_rgba(74,222,128,0.05)]">
                        <div className="w-12 h-12 rounded-full bg-green-900/50 border border-green-400 flex items-center justify-center text-2xl">📱</div>
                        <div>
                            <div className="text-slate-400 text-xs font-bold tracking-wider mb-1">АКТИВНІ СЬОГОДНІ</div>
                            <div className="text-3xl font-bold text-green-400">18</div>
                        </div>
                    </div>
                    <div className="bg-slate-950/70 backdrop-blur-md border border-purple-500/40 rounded-2xl p-6 flex items-center gap-4 shadow-[inset_0_0_20px_rgba(168,85,247,0.05)]">
                        <div className="w-12 h-12 rounded-full bg-purple-900/50 border border-purple-400 flex items-center justify-center text-2xl">📖</div>
                        <div>
                            <div className="text-slate-400 text-xs font-bold tracking-wider mb-1">МІСІЙ ПРОЙДЕНО</div>
                            <div className="text-3xl font-bold text-purple-400">56</div>
                        </div>
                    </div>
                    <div className="bg-slate-950/70 backdrop-blur-md border border-amber-500/40 rounded-2xl p-6 flex items-center gap-4 shadow-[inset_0_0_20px_rgba(251,191,36,0.05)]">
                        <div className="w-12 h-12 rounded-full bg-amber-900/50 border border-amber-400 flex items-center justify-center text-2xl">⭐</div>
                        <div>
                            <div className="text-slate-400 text-xs font-bold tracking-wider mb-1">СЕРЕДНІЙ БАЛ</div>
                            <div className="text-3xl font-bold text-amber-400">82%</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)] h-72 flex flex-col">
                        <h3 className="text-cyan-400 font-bold text-sm tracking-wider mb-1">АКТИВНІСТЬ УЧНІВ</h3>
                        <p className="text-slate-500 text-xs mb-4">За останні 7 днів</p>
                        <div className="flex-1 border-b border-l border-slate-700/50 relative flex items-end justify-between px-2 pb-2">
                            <svg className="absolute top-4 left-0 w-full h-4/5 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <path d="M0,80 L15,40 L30,60 L45,30 L60,50 L75,20 L90,40 L100,10" fill="none" stroke="#22d3ee" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"/>
                                <circle cx="15" cy="40" r="2" fill="#fff" />
                                <circle cx="45" cy="30" r="2" fill="#fff" />
                                <circle cx="75" cy="20" r="2" fill="#fff" />
                                <circle cx="100" cy="10" r="2" fill="#fff" />
                            </svg>
                            <div className="text-[10px] text-slate-500 absolute -bottom-5 left-4">Пн</div>
                            <div className="text-[10px] text-slate-500 absolute -bottom-5 left-[20%]">Вв</div>
                            <div className="text-[10px] text-slate-500 absolute -bottom-5 left-[35%]">Ср</div>
                            <div className="text-[10px] text-slate-500 absolute -bottom-5 left-[50%]">Чт</div>
                            <div className="text-[10px] text-slate-500 absolute -bottom-5 left-[65%]">Пт</div>
                            <div className="text-[10px] text-slate-500 absolute -bottom-5 left-[80%]">Сб</div>
                            <div className="text-[10px] text-slate-500 absolute -bottom-5 right-0">Нд</div>
                        </div>
                    </div>

                    <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)] h-72 flex flex-col">
                        <h3 className="text-cyan-400 font-bold text-sm tracking-wider mb-1">УСПІШНІСТЬ ЗА МІСІЯМИ</h3>
                        <p className="text-slate-500 text-xs mb-4">Середній відсоток виконання</p>
                        <div className="flex-1 flex items-end justify-around pb-4 border-b border-slate-700/50">
                            <div className="w-12 h-[85%] bg-gradient-to-t from-cyan-900 to-green-400 rounded-t-sm relative group"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs">85%</span><span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 whitespace-nowrap">Місія 1</span></div>
                            <div className="w-12 h-[72%] bg-gradient-to-t from-cyan-900 to-green-500 rounded-t-sm relative"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs">72%</span><span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 whitespace-nowrap">Місія 2</span></div>
                            <div className="w-12 h-[68%] bg-gradient-to-t from-cyan-900 to-cyan-500 rounded-t-sm relative"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs">68%</span><span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 whitespace-nowrap">Місія 3</span></div>
                            <div className="w-12 h-[90%] bg-gradient-to-t from-cyan-900 to-cyan-300 rounded-t-sm relative"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-cyan-300">90%</span><span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 whitespace-nowrap">Місія 4</span></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
                        <h3 className="text-cyan-400 font-bold text-sm tracking-wider mb-6">РОЗПОДІЛ УСПІШНОСТІ ТЕСТІВ</h3>
                        <div className="flex items-center gap-6">
                            <div className="w-28 h-28 rounded-full border-[12px] border-slate-800 border-t-green-500 border-r-cyan-500 border-b-amber-500 flex items-center justify-center relative shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                <span className="text-lg font-bold">78%</span>
                            </div>
                            <div className="flex flex-col gap-2 text-xs">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-sm"></span> 90-100% (35%)</div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-cyan-500 rounded-sm"></span> 70-89% (45%)</div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-500 rounded-sm"></span> 50-69% (15%)</div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-slate-700 rounded-sm"></span> &lt;49% (5%)</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
                        <h3 className="text-cyan-400 font-bold text-sm tracking-wider mb-6">ЧАС ПРОХОДЖЕННЯ (сер. хв.)</h3>
                        <div className="flex flex-col gap-4 text-xs">
                            <div className="flex items-center gap-3"><span className="w-12 text-slate-400">Місія 1</span><div className="flex-1 bg-slate-800 h-3 rounded-full overflow-hidden"><div className="bg-green-500 h-full w-[40%]"></div></div><span>22 хв</span></div>
                            <div className="flex items-center gap-3"><span className="w-12 text-slate-400">Місія 2</span><div className="flex-1 bg-slate-800 h-3 rounded-full overflow-hidden"><div className="bg-cyan-500 h-full w-[70%] shadow-[0_0_8px_#22d3ee]"></div></div><span>34 хв</span></div>
                            <div className="flex items-center gap-3"><span className="w-12 text-slate-400">Місія 3</span><div className="flex-1 bg-slate-800 h-3 rounded-full overflow-hidden"><div className="bg-cyan-600 h-full w-[50%]"></div></div><span>28 хв</span></div>
                            <div className="flex items-center gap-3"><span className="w-12 text-slate-400">Місія 4</span><div className="flex-1 bg-slate-800 h-3 rounded-full overflow-hidden"><div className="bg-cyan-400 h-full w-[60%]"></div></div><span>31 хв</span></div>
                        </div>
                    </div>

                    <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-amber-400 font-bold text-sm tracking-wider drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]">🏆 ТОП УЧНІВ</h3>
                        </div>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li className="flex justify-between items-center bg-slate-800/50 p-2 rounded-lg border border-slate-700"><div className="flex items-center gap-2"><span className="text-amber-400 font-bold">1.</span><div className="w-6 h-6 rounded-full bg-slate-600"></div> Коваленко Артем</div><span className="font-bold text-green-400">92%</span></li>
                            <li className="flex justify-between items-center"><div className="flex items-center gap-2 text-slate-300"><span className="text-slate-500">2.</span><div className="w-6 h-6 rounded-full bg-slate-700"></div> Мельник Софія</div><span>89%</span></li>
                            <li className="flex justify-between items-center"><div className="flex items-center gap-2 text-slate-300"><span className="text-slate-500">3.</span><div className="w-6 h-6 rounded-full bg-slate-700"></div> Іванов Максим</div><span>87%</span></li>
                            <li className="flex justify-between items-center"><div className="flex items-center gap-2 text-slate-300"><span className="text-slate-500">4.</span><div className="w-6 h-6 rounded-full bg-slate-700"></div> Петренко Дарія</div><span>85%</span></li>
                        </ul>
                    </div>

                    <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
                        <h3 className="text-cyan-400 font-bold text-sm tracking-wider mb-4">АКТИВНІСТЬ ЗА ДНЯМИ</h3>
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 28 }).map((_, i) => (
                                <div key={i} className={`w-full aspect-square rounded-sm ${i % 3 === 0 ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : i % 5 === 0 ? 'bg-green-700' : 'bg-slate-800'}`}></div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            {isInviteModalOpen && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border-2 border-cyan-400 rounded-3xl p-8 max-w-md w-full flex flex-col items-center shadow-[0_0_40px_rgba(34,211,238,0.3),inset_0_0_20px_rgba(34,211,238,0.1)] relative">

                        <button
                            onClick={() => setIsInviteModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-cyan-400 transition-colors"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-cyan-100 mb-2 tracking-widest drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">КОД КЛАСУ</h2>
                        <p className="text-slate-400 text-sm text-center mb-8">Надішліть цей код учням або виведіть на екран, щоб вони могли зареєструватися.</p>

                        <div className="text-5xl font-mono font-bold text-cyan-400 tracking-[0.2em] bg-slate-950 px-8 py-5 rounded-2xl border border-cyan-500/50 mb-8 shadow-[inset_0_0_15px_rgba(34,211,238,0.1)]">
                            {inviteCode}
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <button
                                onClick={() => { navigator.clipboard.writeText(inviteCode); alert('Код скопійовано!'); }}
                                className="w-full bg-cyan-100 text-cyan-950 font-bold py-3.5 rounded-xl hover:bg-white shadow-[0_0_15px_rgba(207,250,254,0.4)] transition-all"
                            >
                                СКОПІЮВАТИ КОД
                            </button>

                            <button
                                onClick={handleGenerateNewCode}
                                className="w-full border border-orange-500/50 text-orange-400 font-bold py-3.5 rounded-xl hover:bg-orange-900/30 transition-all text-sm"
                            >
                                ЗГЕНЕРУВАТИ НОВИЙ (Старий згорить)
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;