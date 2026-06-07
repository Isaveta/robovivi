import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { missions, viviQuotes } from '../data/missionsData.jsx';
import TheoryModal from '../components/TheoryModal.jsx';
import TestModal from '../components/TestModal.jsx';
import RobotModel from '../components/RobotModel.jsx';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [viviText, setViviText] = useState(viviQuotes[0]);
    const [openedTask, setOpenedTask] = useState(null);
    const [robotIndex, setRobotIndex] = useState(0);
    const [showInfo, setShowInfo] = useState(false);

    const robotsData = [
        { name: "Пересувний робот", scene: "https://prod.spline.design/PYdYImPRm4qT48eo/scene.splinecode" , info: "Технічний факт: На відміну від колісних роботів, багатоніжкові системи використовують складні алгоритми розподілу ваги. Це дозволяє їм зберігати стабільність навіть при пошкодженні кінцівки — це називається відмовостійкістю конструкції." },
        { name: "Промисловий робот", scene: "https://prod.spline.design/j8pfhOzOwm3ha9dF/scene.splinecode" ,  info: "Технічний факт: Промислові маніпулятори працюють з точністю до мікрон. Їхнє керування базується на зворотній кінематиці — математичній моделі, що дозволяє роботу миттєво обчислювати траєкторію інструмента в 3D-просторі."},
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * viviQuotes.length);
            setViviText(viviQuotes[randomIndex]);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    const getLineClass = (stepStatus) => {
        return stepStatus === 'completed' || stepStatus === 'active'
            ? 'bg-cyan-500/70 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
            : 'bg-slate-700/50';
    };

    const renderDiamond = (type, status, missionTitle) => {
        let borderColor, bgColor, shadow;
        if (status === 'completed') {
            borderColor = 'border-cyan-400'; bgColor = 'bg-cyan-950/80'; shadow = 'shadow-[0_0_20px_rgba(34,211,238,0.3)]';
        } else if (status === 'active') {
            borderColor = 'border-green-400'; bgColor = 'bg-green-950/80'; shadow = 'shadow-[0_0_20px_rgba(74,222,128,0.3)]';
        } else {
            borderColor = 'border-slate-700'; bgColor = 'bg-slate-900/50'; shadow = '';
        }

        let content = status === 'locked' ? <span className="text-2xl opacity-80">🔒</span> : <img src={`/assets/icon-${type}.png`} alt={type} className="w-8 h-8 object-contain opacity-90" />;

        return (
            <div
                onClick={() => setOpenedTask({ mission: missionTitle, type: type })}
                className={`w-16 h-16 flex items-center justify-center rotate-45 border-2 rounded-xl transition-all ${borderColor} ${bgColor} ${shadow} hover:scale-110 cursor-pointer`}
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
                    <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-cyan-400"></div>
                    <span className="font-bold text-lg tracking-widest text-white">Прізвище Ім'я</span>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-1.5 rounded-full border border-cyan-500/30">
                        <span className="font-bold text-cyan-400 text-sm">Серія днів</span>
                        <div className="w-16 h-4 bg-white rounded-sm"></div>
                        <div className="flex items-center gap-1">
                            <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
                            <div className="w-1 h-5 bg-cyan-400 rounded-full"></div>
                            <div className="w-1 h-2 bg-cyan-600 rounded-full"></div>
                        </div>
                    </div>
                    <button onClick={() => navigate('/')} className="hover:text-cyan-400 transition-colors text-sm underline opacity-70 hover:opacity-100">Вийти</button>
                </div>
            </header>

            <main className="flex-1 flex gap-6 p-6 overflow-hidden max-w-[1600px] w-full mx-auto z-10">
                <div className="flex-[5] flex flex-col gap-4">
                    <div className="bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-3xl p-8 flex flex-col gap-12 shadow-[inset_0_0_30px_rgba(34,211,238,0.05)]">
                        {missions.map((mission) => (
                            <div key={mission.id} className="flex items-center w-full">
                                <div className={`w-64 py-3 px-6 rounded-l-full rounded-r-md border-2 flex flex-col justify-center relative overflow-hidden
                    ${mission.globalStatus === 'completed' || mission.globalStatus === 'in_progress' ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-slate-700 bg-slate-900/50 text-slate-500'}`}>
                                    <span className={`text-xs font-black tracking-widest mb-1 ${mission.globalStatus !== 'locked' ? 'text-cyan-400' : 'text-slate-600'}`}>{mission.label}</span>
                                    <span className="font-bold text-sm tracking-wider leading-tight">{mission.title}</span>
                                    <span className="text-[11px] opacity-80 mt-0.5 leading-tight">{mission.subtitle}</span>
                                </div>
                                <div className={`flex-1 h-[2px] ${getLineClass(mission.theory)}`}></div>
                                {renderDiamond('theory', mission.theory, `${mission.label}: ${mission.title}`)}
                                <div className={`flex-1 h-[2px] ${getLineClass(mission.test)}`}></div>
                                {renderDiamond('test', mission.test, `${mission.label}: ${mission.title}`)}
                                <div className={`flex-1 h-[2px] ${getLineClass(mission.practice)}`}></div>
                                {renderDiamond('practice', mission.practice, `${mission.label}: ${mission.title}`)}
                                <div className={`flex-1 h-[2px] ${getLineClass(mission.globalStatus)}`}></div>
                                <div className="w-28 flex justify-end">
                                    {mission.globalStatus === 'completed' && <span className="px-3 py-1 rounded-full border border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)] text-xs font-bold tracking-wider">Завершено</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-2 border-dashed border-cyan-500/30 bg-slate-900/40 rounded-3xl p-6 flex flex-col items-center justify-center text-center opacity-80 hover:opacity-100 hover:border-cyan-400/60 transition-all shadow-[inset_0_0_15px_rgba(34,211,238,0.05)]">
                        <h4 className="text-cyan-300 font-bold tracking-widest mb-2 text-sm">ДАЛІ БУДЕ ЦІКАВІШЕ! 🚀</h4>
                        <p className="text-slate-400 text-xs max-w-lg leading-relaxed">Нові місії з робототехніки, поглиблені теоретичні матеріали та круті 3D-моделі вже в розробці. Слідкуй за оновленнями та підвищуй свій рівень!</p>
                    </div>
                </div>

                <div className="flex-[2] flex flex-col gap-6">
                    <div className="flex-[3] bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-3xl p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)] flex flex-col relative overflow-hidden">

                        {/* Заголовок із кнопкою I */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <h3 className="text-cyan-400 font-bold tracking-widest text-sm uppercase">3D МОДЕЛІ</h3>
                                <button
                                    onClick={() => setShowInfo(!showInfo)}
                                    className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_8px_rgba(34,211,238,0.4)] animate-pulse"
                                >
                                    <span className="font-bold text-xs">i</span>
                                    <span className="absolute -top-8 left-0 bg-slate-800 text-[10px] text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-cyan-500/30 pointer-events-none">
                    Дізнатись про робота
                </span>
                                </button>
                            </div>

                            {/* Кнопки перемикання */}
                            <div className="flex items-center gap-3">
                                <button onClick={() => {setRobotIndex(prev => prev === 0 ? 1 : 0); setShowInfo(false)}} className="text-cyan-400 hover:text-white text-xl font-bold">←</button>
                                <span className="text-cyan-200 text-xs font-bold w-32 text-center">{robotsData[robotIndex].name}</span>
                                <button onClick={() => {setRobotIndex(prev => prev === 0 ? 1 : 0); setShowInfo(false)}} className="text-cyan-400 hover:text-white text-xl font-bold">→</button>
                            </div>
                        </div>

                        {/* Вікно моделі + Інфо блок */}
                        <div className="flex-1 w-full border border-cyan-500/20 rounded-xl bg-slate-900/50 flex items-center justify-center overflow-hidden relative">
                            <RobotModel scene={robotsData[robotIndex].scene} />

                            {/* Інфо блок, що з'являється поверх */}
                            {showInfo && (
                                <div className="absolute inset-0 z-20 bg-slate-950/95 p-6 flex flex-col justify-center items-center text-center animate-in fade-in duration-300">
                                    <h4 className="text-cyan-400 font-bold mb-3">{robotsData[robotIndex].name}</h4>
                                    <p className="text-slate-300 text-xs leading-relaxed max-w-xs">{robotsData[robotIndex].info}</p>
                                    <button onClick={() => setShowInfo(false)} className="mt-6 px-4 py-1 border border-cyan-500 rounded text-cyan-400 text-xs hover:bg-cyan-900">Зрозуміло</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-[2] bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-3xl p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)] relative flex items-center justify-start">
                        <div className="w-[55%] -translate-y-8 border border-indigo-400/50 rounded-2xl rounded-br-sm p-5 bg-indigo-950/90 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-opacity duration-500 relative z-30">
                            <p className="text-indigo-100 text-sm italic leading-relaxed">{viviText}</p>
                        </div>
                        <div className="absolute -bottom-2 -right-12 w-[400px] z-20 pointer-events-none">
                            <img src="/assets/norm-vivi.PNG" alt="Віві помічник" className="w-full h-auto drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:scale-105 transition-transform origin-bottom pointer-events-auto cursor-pointer" />
                        </div>
                    </div>
                </div>
            </main>

            {/* РЕНДЕР МОДАЛОК ЗАЛЕЖНО ВІД ТИПУ */}
            {openedTask?.type === 'theory' && <TheoryModal openedTask={openedTask} onClose={() => setOpenedTask(null)} />}
            {openedTask?.type === 'test' && <TestModal openedTask={openedTask} onClose={() => setOpenedTask(null)} />}

            {/* Заглушка для практики */}
            {openedTask?.type === 'practice' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10 bg-slate-950/80 backdrop-blur-sm transition-opacity">
                    <div className="relative w-full max-w-6xl h-[85vh] bg-slate-900 border-2 border-cyan-400 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.2)] flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center px-8 py-5 border-b border-cyan-500/50 bg-slate-950/80">
                            <h2 className="text-2xl font-bold text-white">ПРАКТИКА</h2>
                            <button onClick={() => setOpenedTask(null)} className="text-slate-400 hover:text-cyan-400 text-xl">✕</button>
                        </div>
                        <div className="flex-1 flex items-center justify-center"><p className="text-slate-400">У розробці</p></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;