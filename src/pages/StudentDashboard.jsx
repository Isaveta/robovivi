import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { missions, viviQuotes } from '../data/missionsData.jsx';
import TheoryModal from '../components/TheoryModal.jsx';
import TestModal from '../components/TestModal.jsx';
import RobotModel from '../components/RobotModel.jsx';
import PracticeManager from '../components/practice/PracticeManager';
import { updateStreak } from '../utils/progressUtils';
import AvatarSelector from '../components/AvatarSelector';


const StudentDashboard = () => {
    const navigate = useNavigate();
    const { userData, user } = useAuth();
    const progress = useProgress(user?.uid);
    useEffect(() => {
        if (user?.uid) {
            updateStreak(user.uid);
        }
    }, [user]);

    const [viviText, setViviText] = useState(viviQuotes[0]);
    const [openedTask, setOpenedTask] = useState(null);
    const [robotIndex, setRobotIndex] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);


    const robotsData = [
        {
            name: "Промисловий робот",
            scene: "https://prod.spline.design/j8pfhOzOwm3ha9dF/scene.splinecode",
            info: "Технічний факт: Промислові маніпулятори працюють з точністю до мікрон. Їхнє керування базується на зворотній кінематиці — математичній моделі, що дозволяє роботу миттєво обчислювати траєкторію інструмента в 3D-просторі."
        },
        {
            name: "Пересувний робот",
            scene: "https://prod.spline.design/PYdYImPRm4qT48eo/scene.splinecode",
            info: "Технічний факт: На відміну від колісних роботів, багатоніжкові системи використовують складні алгоритми розподілу ваги. Це дозволяє їм зберігати стабільність навіть при пошкодженні кінцівки — це називається відмовостійкістю конструкції."
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * viviQuotes.length);
            setViviText(viviQuotes[randomIndex]);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    // Оновлена логіка: об'єднуємо статичні дані з прогресом з Firebase
    const getMissionsWithProgress = () => {
        if (!progress) return missions;
        return missions.map(m => ({
            ...m,
            theory: progress[m.id]?.theory || 'locked',
            test: progress[m.id]?.test || 'locked',
            practice: progress[m.id]?.practice || 'locked',
            globalStatus: progress[m.id]?.practice === 'completed' ? 'completed' : 'in_progress'
        }));
    };

    const currentMissions = getMissionsWithProgress();

    const getLineClass = (stepStatus) => {
        return stepStatus === 'completed' || stepStatus === 'active'
            ? 'bg-cyan-500/70 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
            : 'bg-slate-700/50';
    };

    const renderDiamond = (type, status, missionTitle, mission) => {
        // Жорстка перевірка: якщо це не 1-ша місія і статус 'locked' - миттєво блокуємо
        const isLocked = status === 'locked';

        let borderColor, bgColor, shadow;
        if (status === 'completed') {
            borderColor = 'border-cyan-400'; bgColor = 'bg-cyan-950/80'; shadow = 'shadow-[0_0_20px_rgba(34,211,238,0.3)]';
        } else if (status === 'active') {
            borderColor = 'border-green-400'; bgColor = 'bg-green-950/80'; shadow = 'shadow-[0_0_20px_rgba(74,222,128,0.3)]';
        } else {
            borderColor = 'border-slate-700'; bgColor = 'bg-slate-900/50'; shadow = '';
        }

        let content = isLocked ? <span className="text-2xl opacity-80">🔒</span> : <img src={`/assets/icon-${type}.png`} alt={type} className="w-8 h-8 object-contain opacity-90" />;

        return (
            <div
                onClick={() => {
                    // Якщо заблоковано — нічого не робимо
                    if (isLocked) {
                        alert("Цей етап ще заблоковано! Виконай попередні завдання.");
                        return;
                    }
                    setOpenedTask({
                        mission: missionTitle,
                        type: type,
                        missionId: mission.id
                    });
                }}
                className={`w-16 h-16 flex items-center justify-center rotate-45 border-2 rounded-xl transition-all ${borderColor} ${bgColor} ${shadow} ${!isLocked ? 'hover:scale-110 cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
            >
                <div className="-rotate-45 flex items-center justify-center pointer-events-none">{content}</div>
            </div>
        );
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-slate-900 bg-cover bg-center text-cyan-100 font-sans relative"
             style={{ backgroundImage: "url('/assets/clean-bg.PNG')" }}>

            <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/50 flex items-center justify-between px-8 shadow-[0_4px_20px_rgba(34,211,238,0.15)] z-10">
                <div className="flex items-center gap-4">
                    <div
                        className="w-10 h-10 rounded-full bg-slate-800 border-2 border-cyan-400 overflow-hidden cursor-pointer"
                        onClick={() => {
                            // Якщо фото ще немає — відкриваємо вибір, якщо є — нічого не робимо
                            if (!userData?.photoURL) {
                                setShowAvatarPicker(true);
                            }
                        }}
                    >
                        <img
                            src={userData?.photoURL || "/assets/default-avatar.PNG"}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="font-bold text-lg tracking-widest text-white">
            {userData ? `${userData.surname} ${userData.name}` : "Завантаження..."}
        </span>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-1.5 rounded-full border border-cyan-500/30">
                        <span className="font-bold text-cyan-400 text-sm">Серія днів</span>
                        <span className="font-bold text-white text-sm">{userData?.streak || 0} 🔥</span>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="hover:text-cyan-400 transition-colors text-sm underline opacity-70 hover:opacity-100"
                    >
                        Вийти
                    </button>
                </div>
            </header>

            <main className="flex-1 flex gap-6 p-6 overflow-hidden max-w-[1600px] w-full mx-auto z-10">
                <div className="flex-[5] flex flex-col gap-4">
                    <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-3xl p-8 flex flex-col gap-12 shadow-[inset_0_0_30px_rgba(34,211,238,0.05)]">
                        {currentMissions.map((mission) => (
                            <div key={mission.id} className="flex items-center w-full">
                                <div className={`w-64 py-3 px-6 rounded-l-full rounded-r-md border-2 flex flex-col justify-center relative overflow-hidden
            ${mission.theory !== 'locked' ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-slate-700 bg-slate-900/50 text-slate-500'}`}>
            <span className={`text-xs font-black tracking-widest mb-1 ${mission.theory !== 'locked' ? 'text-cyan-400' : 'text-slate-600'}`}>
                {mission.label}
            </span>
                                    <span className="font-bold text-sm tracking-wider leading-tight">{mission.title}</span>
                                    <span className="text-[11px] opacity-80 mt-0.5 leading-tight">{mission.subtitle}</span>
                                </div>
                                <div className={`flex-1 h-[2px] ${getLineClass(mission.theory)}`}></div>
                                {renderDiamond('theory', mission.theory, `${mission.label}: ${mission.title}`, mission)}
                                <div className={`flex-1 h-[2px] ${getLineClass(mission.test)}`}></div>
                                {renderDiamond('test', mission.test, `${mission.label}: ${mission.title}`, mission)}
                                <div className={`flex-1 h-[2px] ${getLineClass(mission.practice)}`}></div>
                                {renderDiamond('practice', mission.practice, `${mission.label}: ${mission.title}`, mission)}
                            </div>
                        ))}
                    </div>
                    <div className="border-2 border-dashed border-cyan-500/30 bg-slate-900/40 rounded-3xl p-6 flex flex-col items-center justify-center text-center opacity-80 hover:opacity-100 hover:border-cyan-400/60 transition-all shadow-[inset_0_0_15px_rgba(34,211,238,0.05)]">
                        <h4 className="text-cyan-300 font-bold tracking-widest mb-2 text-sm">ДАЛІ БУДЕ ЦІКАВІШЕ! 🚀</h4>
                        <p className="text-slate-400 text-xs max-w-lg leading-relaxed">Нові місії з робототехніки, поглиблені теоретичні матеріали та круті 3D-моделі вже в розробці.</p>
                    </div>
                </div>

                <div className="flex-[2] flex flex-col gap-6">
                    <div className="flex-[3] bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-3xl p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)] flex flex-col relative overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <h3 className="text-cyan-400 font-bold tracking-widest text-sm uppercase">3D МОДЕЛІ</h3>
                                <button onClick={() => setShowInfo(!showInfo)} className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_8px_rgba(34,211,238,0.4)] animate-pulse">
                                    <span className="font-bold text-xs">i</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => {setRobotIndex(prev => prev === 0 ? 1 : 0); setShowInfo(false)}} className="text-cyan-400 hover:text-white text-xl font-bold">←</button>
                                <span className="text-cyan-200 text-xs font-bold w-32 text-center">{robotsData[robotIndex].name}</span>
                                <button onClick={() => {setRobotIndex(prev => prev === 0 ? 1 : 0); setShowInfo(false)}} className="text-cyan-400 hover:text-white text-xl font-bold">→</button>
                            </div>
                        </div>
                        <div className="flex-1 w-full border border-cyan-500/20 rounded-xl bg-slate-900/50 flex items-center justify-center overflow-hidden relative">
                            <RobotModel scene={robotsData[robotIndex].scene} />
                            {showInfo && <div className="absolute inset-0 z-20 bg-slate-950/95 p-6 flex flex-col justify-center items-center text-center">
                                <h4 className="text-cyan-400 font-bold mb-3">{robotsData[robotIndex].name}</h4>
                                <p className="text-slate-300 text-xs leading-relaxed max-w-xs">{robotsData[robotIndex].info}</p>
                                <button onClick={() => setShowInfo(false)} className="mt-6 px-4 py-1 border border-cyan-500 rounded text-cyan-400 text-xs hover:bg-cyan-900">Зрозуміло</button>
                            </div>}
                        </div>
                    </div>

                    <div className="flex-[2] bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-3xl p-6 relative flex items-center justify-start">
                        <div className="w-[55%] -translate-y-8 border border-indigo-400/50 rounded-2xl p-5 bg-indigo-950/90 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                            <p className="text-indigo-100 text-sm italic leading-relaxed">{viviText}</p>
                        </div>
                        <div className="absolute -bottom-2 -right-12 w-[400px] z-20 pointer-events-none">
                            <img src="/assets/norm-vivi.PNG" alt="Віві помічник" className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </main>

            {openedTask?.type === 'theory' && <TheoryModal openedTask={openedTask} onClose={() => setOpenedTask(null)} />}
            {openedTask?.type === 'test' && <TestModal openedTask={openedTask} onClose={() => setOpenedTask(null)} />}
            {openedTask?.type === 'practice' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10 bg-slate-950/80 backdrop-blur-sm transition-opacity">
                    <div className="relative w-full max-w-6xl h-[85vh] bg-slate-900 border-2 border-cyan-400 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.2)] flex flex-col overflow-hidden">

                        <div className="flex justify-between items-center px-8 py-5 border-b border-cyan-500/50 bg-slate-950/80 backdrop-blur-md relative z-10 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-cyan-950/80 border border-cyan-400 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                    <img src="/assets/icon-practice.png" alt="icon" className="w-6 h-6 object-contain" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-widest">ПРАКТИКА</h2>
                                    <p className="text-cyan-400 text-sm tracking-wider">{openedTask.mission}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpenedTask(null)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-600 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <PracticeManager missionId={openedTask.missionId} onClose={() => setOpenedTask(null)} />
                        </div>
                    </div>
                </div>
            )}
            {showAvatarPicker && (
                <AvatarSelector
                    userId={user?.uid}
                    currentPhoto={userData?.photoURL}
                    onClose={() => setShowAvatarPicker(false)}
                    onUpdate={() => setShowAvatarPicker(false)}
                />
            )}
        </div>
    );
};

export default StudentDashboard;