import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: "url('/assets/clean-bg.PNG')" }}>

            {/* Головний заголовок екрану */}
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

            {/* Картки вибору ролі */}
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

export default RoleSelection;