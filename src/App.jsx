import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// 1. Екран вибору ролі
const RoleSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: "url('/assets/clean-bg.PNG')" }}>

            <div className="text-center mb-12 flex flex-col items-center">
                <div className="w-20 h-20 mb-6 border-2 border-cyan-400 rounded-2xl rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-slate-900/80">
                    <span className="text-4xl -rotate-45">🐱</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest mb-3 [-webkit-text-stroke:1px_#0B1021] [text-shadow:_0_4px_15px_rgb(0_0_0_/_100%),_0_0_20px_rgb(0_0_0_/_80%)]">
                    ВІТАЄМО В СИСТЕМІ
                </h1>

                <p className="text-cyan-300 font-bold tracking-wider [text-shadow:_0_2px_4px_rgb(0_0_0_/_100%)]">
                    Оберіть свою роль для початку роботи
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <button
                    onClick={() => navigate('/auth', { state: { role: 'teacher', mode: 'login' } })}
                    className="w-64 h-80 bg-slate-950/60 backdrop-blur-md hover:bg-cyan-950/60 border-2 border-cyan-500/50 hover:border-cyan-400 rounded-3xl text-cyan-100 font-bold flex flex-col items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.1),inset_0_0_10px_rgba(34,211,238,0.1)] transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.4),inset_0_0_20px_rgba(34,211,238,0.3)] hover:-translate-y-2 group p-6 text-center"
                >
                    <span className="text-6xl mb-6 group-hover:scale-110 transition-transform">👨‍🏫</span>
                    <span className="text-2xl mb-3 tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Вчитель</span>
                    <span className="text-xs font-medium text-slate-300 group-hover:text-cyan-100 transition-colors">Керування класами, статистика та аналітика успішності учнів</span>
                </button>
                <button
                    onClick={() => navigate('/auth', { state: { role: 'student', mode: 'login' } })}
                    className="w-64 h-80 bg-slate-950/60 backdrop-blur-md hover:bg-cyan-950/60 border-2 border-cyan-500/50 hover:border-cyan-400 rounded-3xl text-cyan-100 font-bold flex flex-col items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.1),inset_0_0_10px_rgba(34,211,238,0.1)] transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.4),inset_0_0_20px_rgba(34,211,238,0.3)] hover:-translate-y-2 group p-6 text-center"
                >
                    <span className="text-6xl mb-6 group-hover:scale-110 transition-transform">👩‍💻</span>
                    <span className="text-2xl mb-3 tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Учень</span>
                    <span className="text-xs font-medium text-slate-300 group-hover:text-cyan-100 transition-colors">Проходження місій та вивчення робототехніки</span>
                </button>
            </div>
        </div>
    );
};

// 2. Екран Авторизації
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

// 3. Дашборд Учня
const StudentDashboard = () => {
    const navigate = useNavigate();

    const viviQuotes = [
        "Привіт! Я Віві. Готові до нових місій? Мяу! 🐾",
        "Ого, який крутий механізм! А він вміє автоматично насипати корм? 🐟",
        "Я хоч і маленьке кошеня, але в технологіях вже розбираюсь! Поїхали!",
        "Не забувай робити перерви! Навіть видатним інженерам потрібен відпочинок. І котикам теж. 🐈",
        "Код компілюється... А поки можна почухати мене за вушком на екрані! 😸",
        "Знаєш, головне в нашій справі — щоб миші були виключно комп'ютерні! 🐭",
        "Час розім'яти лапки! Зроби глибокий вдих, потягнися вгору, і повертайся до роботи з новими силами. 🐈",
        "Ця 3D-сцена просто ідеальна для того, щоб я влаштувала там собі віртуальну лежанку. 🛋️",
        "Бачу, ти чудово справляєшся!🤖",
        "Твої очі втомилися від екрана? Зробимо гімнастику: покліпай швидко-швидко, а тепер подивись у вікно. Мяу, як там гарно! 🪟",
        "Якщо щось не працює з першого разу — не біда. Навіть коти іноді промахуються повз диван! 😹",
        "Моя мисочка з водою завжди поруч, а твоя? Не забувай пити водичку і періодично вставати з-за столу, щоб розім'ятися. 💧",
        "Як думаєш, датчики руху зреагують, якщо я дуже швидко пробіжу повз? 🏃‍♀️💨",
        "Наступна місія вже чекає! Розминай лапки... тобто пальці, та готуйся до відкриттів. ✨",
        "Проєктувати механізми так само захопливо, як полювати на лазерну указку! 🔴🐈",
        "Ти тільки подивись на цю ідеальну структуру... Майже така ж ідеальна, як мій пухнастий хвіст!",
        "Твої пальчики сьогодні багато працювали. Давай зробимо легку розминку для кистей, щоб вони залишалися швидкими та вправними! 🐾"
    ];

    const [viviText, setViviText] = useState(viviQuotes[0]);
    // НОВИЙ СТЕЙТ: Відповідає за те, яке завдання зараз відкрито у великому вікні
    const [openedTask, setOpenedTask] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * viviQuotes.length);
            setViviText(viviQuotes[randomIndex]);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const missions = [
        { id: 1, name: 'МІСІЯ 1', globalStatus: 'completed', theory: 'completed', test: 'completed', practice: 'completed' },
        { id: 2, name: 'МІСІЯ 2', globalStatus: 'in_progress', theory: 'completed', test: 'active', practice: 'locked' },
        { id: 3, name: 'МІСІЯ 3', globalStatus: 'locked', theory: 'locked', test: 'locked', practice: 'locked' },
        { id: 4, name: 'МІСІЯ 4', globalStatus: 'locked', theory: 'locked', test: 'locked', practice: 'locked' },
    ];

    const getLineClass = (stepStatus) => {
        return stepStatus === 'completed' || stepStatus === 'active'
            ? 'bg-cyan-500/70 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
            : 'bg-slate-700/50';
    };

    // Оновили функцію renderDiamond, щоб вона приймала назву місії та обробляла клік
    const renderDiamond = (type, status, missionName) => {
        let borderColor;
        let bgColor;
        let shadow;

        if (status === 'completed') {
            borderColor = 'border-cyan-400';
            bgColor = 'bg-cyan-950/80';
            shadow = 'shadow-[0_0_20px_rgba(34,211,238,0.3)]';
        } else if (status === 'active') {
            borderColor = 'border-green-400';
            bgColor = 'bg-green-950/80';
            shadow = 'shadow-[0_0_20px_rgba(74,222,128,0.3)]';
        } else {
            borderColor = 'border-slate-700';
            bgColor = 'bg-slate-900/50';
            shadow = '';
        }

        let content;
        if (status === 'locked') {
            content = <span className="text-2xl opacity-80">🔒</span>;
        } else {
            content = <img src={`/assets/icon-${type}.png`} alt={type} className="w-8 h-8 object-contain opacity-90" />;
        }

        // Обробник кліку: відкриває вікно тільки якщо етап не заблоковано
        const handleClick = () => {
            if (status !== 'locked') {
                setOpenedTask({ mission: missionName, type: type });
            }
        };

        return (
            <div
                onClick={handleClick}
                className={`w-16 h-16 flex items-center justify-center rotate-45 border-2 rounded-xl transition-all ${borderColor} ${bgColor} ${shadow} ${status !== 'locked' ? 'hover:scale-110 cursor-pointer' : 'cursor-not-allowed'}`}
            >
                <div className="-rotate-45 flex items-center justify-center pointer-events-none">
                    {content}
                </div>
            </div>
        );
    };

    // Допоміжна функція для перекладу типу завдання у красивий заголовок
    const getTaskTitle = (type) => {
        if (type === 'theory') return 'ТЕОРІЯ';
        if (type === 'test') return 'ТЕСТУВАННЯ';
        if (type === 'practice') return 'ПРАКТИКА';
        return '';
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
                                <div className={`w-40 py-3 px-6 rounded-l-full rounded-r-md border-2 font-bold text-sm tracking-wider flex items-center justify-center
                    ${mission.globalStatus === 'completed' || mission.globalStatus === 'in_progress' ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-slate-700 bg-slate-900/50 text-slate-500'}`}>
                                    {mission.name}
                                </div>

                                <div className={`flex-1 h-[2px] ${getLineClass(mission.theory)}`}></div>
                                {/* Передаємо назву місії у функцію */}
                                {renderDiamond('theory', mission.theory, mission.name)}

                                <div className={`flex-1 h-[2px] ${getLineClass(mission.test)}`}></div>
                                {renderDiamond('test', mission.test, mission.name)}

                                <div className={`flex-1 h-[2px] ${getLineClass(mission.practice)}`}></div>
                                {renderDiamond('practice', mission.practice, mission.name)}

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
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400 rounded-tl-3xl opacity-50"></div>
                        <h3 className="text-cyan-400 font-bold mb-4 tracking-widest text-sm">3D МОДЕЛІ</h3>
                        <div className="flex-1 border border-cyan-500/20 rounded-xl bg-slate-900/50 flex items-center justify-center">
                            <span className="text-slate-600 text-sm">Тут буде вбудована сцена зі Spline</span>
                        </div>
                    </div>

                    <div className="flex-[2] bg-slate-950/70 backdrop-blur-md border border-cyan-500/40 rounded-3xl p-6 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)] relative flex items-center justify-start">
                        <div className="w-[55%] -translate-y-8 border border-indigo-400/50 rounded-2xl rounded-br-sm p-5 bg-indigo-950/90 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-opacity duration-500 relative z-30">
                            <p className="text-indigo-100 text-sm italic leading-relaxed">{viviText}</p>
                        </div>
                        <div className="absolute -bottom-2 -right-12 w-[400px] z-20 pointer-events-none">
                            <img
                                src="/assets/norm-vivi.PNG"
                                alt="Віві помічник"
                                className="w-full h-auto drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:scale-105 transition-transform origin-bottom pointer-events-auto cursor-pointer"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://cdn-icons-png.flaticon.com/512/1864/1864514.png";
                                }}
                            />
                        </div>
                    </div>
                </div>

            </main>

            {/* ВЕЛИКЕ ВІКНО ДЛЯ ЗАВДАНЬ (МОДАЛКА) */}
            {openedTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10 bg-slate-950/80 backdrop-blur-sm transition-opacity">

                    {/* Контейнер вікна */}
                    <div
                        className="relative w-full max-w-6xl h-[85vh] bg-slate-900 border-2 border-cyan-400 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.2),inset_0_0_30px_rgba(34,211,238,0.1)] flex flex-col overflow-hidden"
                        // Використовуємо той самий фон для збереження стилю
                        style={{ backgroundImage: "url('/assets/clean-bg.PNG')", backgroundBlendMode: 'overlay' }}
                    >

                        {/* Шапка вікна */}
                        <div className="flex justify-between items-center px-8 py-5 border-b border-cyan-500/50 bg-slate-950/80 backdrop-blur-md relative z-10 shadow-[0_4px_20px_rgba(34,211,238,0.1)]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-cyan-950/80 border border-cyan-400 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                    <img src={`/assets/icon-${openedTask.type}.png`} alt="icon" className="w-6 h-6 object-contain" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                                        {openedTask.mission}
                                    </h2>
                                    <p className="text-cyan-400 text-sm tracking-wider">{getTaskTitle(openedTask.type)}</p>
                                </div>
                            </div>

                            {/* Кнопка закриття */}
                            <button
                                onClick={() => setOpenedTask(null)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-600 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-950/50 transition-all text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Вміст вікна (Поки що заглушка, куди ми потім додамо контент) */}
                        <div className="flex-1 flex flex-col items-center justify-center relative z-10 bg-slate-950/40 backdrop-blur-sm p-8">

                            <div className="w-32 h-32 border-4 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]">
                                <img src={`/assets/icon-${openedTask.type}.png`} alt="icon" className="w-12 h-12 object-contain opacity-50" />
                            </div>

                            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                                РОЗДІЛ У РОЗРОБЦІ
                            </h3>
                            <p className="text-slate-400 text-center max-w-md">
                                Сюди ми згодом додамо інтерактивний контент для етапу <span className="text-cyan-300 font-bold">"{getTaskTitle(openedTask.type)}"</span>.
                            </p>

                        </div>

                        {/* Декоративні елементи вікна */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                    </div>
                </div>
            )}

        </div>
    );
};

// 4. Дашборд Адміна
const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [inviteCode, setInviteCode] = useState('X7B-9WQ');

    const handleGenerateNewCode = () => {
        const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setInviteCode(newCode);
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
                            <div className="font-bold text-white text-sm">Вчитель</div>
                            <div className="text-xs text-cyan-500">Адміністратор</div>
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

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-[#0B1021] text-white font-sans antialiased selection:bg-cyan-500/30">
                <Routes>
                    <Route path="/" element={<RoleSelection />} />
                    <Route path="/auth" element={<AuthScreen />} />
                    <Route path="/student" element={<StudentDashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;