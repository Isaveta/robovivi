import { useState } from 'react';
import { unlockNextStep } from '../../utils/progressUtils';
import { useAuth } from '../../context/AuthContext';

const MISSIONS = [
    {
        id: 0,
        task: "Діагностика: Об'єкт попереду",
        description: "Виявлено об'єкт з високим коефіцієнтом відбиття звуку. Необхідно виміряти дистанцію.",
        errors: {
            "sensor-light": "ПОМИЛКА: Оптичний сенсор не розрахований на вимірювання відстані.",
            "sensor-touch": "ПОМИЛКА: Відсутній фізичний контакт з об'єктом."
        },
        correct: "sensor-ultrasonic",
        grid: [[0,0,0,0,0], [0,0,1,0,0], [0,0,0,0,0]],
        start: {r:1, c:0}, target: {r:1, c:4}
    },
    {
        id: 1,
        task: "Діагностика: Освітленість",
        description: "Рівень освітленості нижче критичного порогу. Необхідно виявити джерело світла.",
        errors: {
            "sensor-ultrasonic": "ПОМИЛКА: Ультразвуковий датчик не реагує на потік фотонів.",
            "sensor-touch": "ПОМИЛКА: Сенсор дотику не активується світлом."
        },
        correct: "sensor-light",
        grid: [[0,0,0,0,0], [1,1,0,1,1], [0,0,0,0,0]],
        start: {r:0, c:0}, target: {r:2, c:4}
    },
    {
        id: 2,
        task: "Діагностика: Взаємодія",
        description: "Система потребує активації терміналу механічним зусиллям.",
        errors: {
            "sensor-ultrasonic": "ПОМИЛКА: Відстань зафіксована, але механічний вплив відсутній.",
            "sensor-light": "ПОМИЛКА: Оптичний канал не забезпечує фізичного контакту."
        },
        correct: "sensor-touch",
        grid: [[0,0,0,1,0], [0,1,0,1,0], [0,0,0,0,0]],
        start: {r:2, c:0}, target: {r:0, c:2}
    }
];

const SensorPicker = ({ onClose }) => {
    const [view, setView] = useState('intro');
    const [step, setStep] = useState(0);
    const [pos, setPos] = useState(MISSIONS[0].start);
    const [status, setStatus] = useState('idle');
    const [log, setLog] = useState("СИСТЕМА ГОТОВА. ОЧІКУЮ ВВЕДЕННЯ ДАНИХ.");
    const { user } = useAuth();

    const moveRobotSmoothly = async (target) => {
        setStatus('moving');
        let r = pos.r;
        let c = pos.c;
        while (r !== target.r || c !== target.c) {
            if (r < target.r) r++; else if (r > target.r) r--;
            else if (c < target.c) c++; else if (c > target.c) c--;
            setPos({ r, c });
            await new Promise(r => setTimeout(r, 400));
        }
        setStatus('idle');
    };

    const handleSensorSelect = async (sensor) => {
        if (status !== 'idle') return;
        setStatus('scanning');
        setLog(`ЗАПУСК ДІАГНОСТИКИ: ${sensor.toUpperCase()}...`);
        await new Promise(r => setTimeout(r, 1200));

        if (sensor === MISSIONS[step].correct) {
            setLog("ДАТЧИК ВІДПОВІДАЄ СПЕЦИФІКАЦІЇ. ВИКОНАННЯ МАНЕВРУ.");
            await moveRobotSmoothly(MISSIONS[step].target);
            setLog("МІСІЮ ВИКОНАНО.");
            setTimeout(() => {
                if (step < MISSIONS.length - 1) {
                    setStep(s => s + 1);
                    setPos(MISSIONS[step + 1].start);
                    setLog("СИСТЕМА ГОТОВА. ОЧІКУЮ ВВЕДЕННЯ ДАНИХ.");
                } else {
                    setView('success');
                }
            }, 1000);
        } else {
            setStatus('fail');
            setLog(MISSIONS[step].errors[sensor] || "ПОМИЛКА: НЕВІДПОВІДНІСТЬ ПАРАМЕТРІВ.");
            setTimeout(() => { setStatus('idle'); setLog("СИСТЕМА ГОТОВА. ОЧІКУЮ ВВЕДЕННЯ ДАНИХ."); }, 4000);
        }
    };

    if (view === 'intro') return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/80">
            <div className="bg-[#0b1120] p-8 rounded-3xl border border-cyan-500 w-[400px] text-center shadow-2xl">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Навігація робота</h2>
                <p className="text-white mb-8">Твоє завдання — налаштувати сенсори робота для проходження через перешкоди. Аналізуй середовище та обирай датчик, що відповідає фізичній природі завдання.</p>
                <button onClick={() => setView('game')} className="px-8 py-3 bg-cyan-600 rounded-lg font-bold text-white hover:bg-cyan-500 transition-all">РОЗПОЧАТИ</button>
            </div>
        </div>
    );

    if (view === 'success') return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-sm bg-slate-900 border border-cyan-500/30 rounded-xl p-8 text-center animate-pulse shadow-2xl">
                <img src="/assets/happy-vivi.PNG" alt="Happy Vivi" className="w-32 h-32 mb-6 mx-auto rounded-full border-4 border-cyan-500 animate-bounce" />
                <h2 className="text-3xl text-cyan-400 font-bold mb-4">МІСІЮ ВИКОНАНО!</h2>
                <p className="text-white mb-8 text-lg">Молодець! Ти чудово опанував діагностику сенсорів. Переходимо до блоку шифрування даних!</p>

                {/* Ось ця кнопка: */}
                <button
                    onClick={async () => {
                        // 3 — це ID третьої місії, після якої відкриється 4-та
                        await unlockNextStep(user.uid, 3, 'practice');
                        onClose();
                    }}
                    className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-all"
                >
                    ЗАВЕРШИТИ ПРАКТИКУ
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/70">
            <div className="bg-[#0b1120] p-6 rounded-2xl border border-cyan-500/30 w-full max-w-[450px] shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">&times;</button>
                <h2 className="text-sm font-bold text-cyan-400 mb-6 uppercase text-center tracking-widest">Практика</h2>
                <div className="bg-black p-3 rounded border border-cyan-900/50 mb-4 font-mono text-[10px] text-green-500 min-h-[50px] flex items-center">
                    {`> ${log}`}
                </div>
                <p className="text-[11px] text-slate-400 mb-6 text-center leading-relaxed font-bold">
                    {MISSIONS[step].task}
                    <span className="block font-normal mt-1">{MISSIONS[step].description}</span>
                </p>
                <div className="grid grid-cols-5 gap-1 mb-6 justify-items-center">
                    {MISSIONS[step].grid.map((row, r) => row.map((cell, c) => (
                        <div key={`${r}-${c}`} className={`w-12 h-12 border flex items-center justify-center ${cell === 1 ? 'bg-red-950/20 border-red-900/30' : 'bg-slate-900 border-slate-800'}`}>
                            {pos.r === r && pos.c === c && <img src="/assets/practice/m2/robot-lab.PNG" className="w-8 h-8 transition-all duration-300" alt="robot" />}
                            {cell === 1 && <div className="w-6 h-6 bg-red-800/20 rounded animate-pulse" />}
                        </div>
                    )))}
                </div>
                <div className="flex gap-4 justify-center">
                    {['sensor-ultrasonic', 'sensor-light', 'sensor-touch'].map(s => (
                        <button key={s} onClick={() => handleSensorSelect(s)} className="p-2 border border-slate-700 rounded hover:border-cyan-500 transition-all active:scale-95">
                            <img src={`/assets/practice/m3/${s}.PNG`} className="w-8 h-8" alt={s} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SensorPicker;