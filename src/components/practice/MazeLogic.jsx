import { useState } from 'react';

const MazeMission = ({ onClose }) => {
    const [mazeMap] = useState([
        [3, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [1, 1, 1, 0, 1, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 2]
    ]);

    const [robotPos, setRobotPos] = useState({ y: 0, x: 0, dir: 1 });
    const [commands, setCommands] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [showHelp, setShowHelp] = useState(true);
    const [loopSettings, setLoopSettings] = useState({ action: 'Вперед', count: 2 });

    const MAX_COMMANDS = 12;

    const runAlgorithm = () => {
        setIsRunning(true);
        setStepCount(0);
        let expanded = [];

        commands.forEach(cmd => {
            if (cmd.type === 'loop') {
                for(let i = 0; i < cmd.count; i++) expanded.push(cmd.action);
            } else {
                expanded.push(cmd.type);
            }
        });

        expanded.forEach((action, index) => {
            setTimeout(() => {
                setStepCount(prev => prev + 1);
                let finalY, finalX;

                setRobotPos(prev => {
                    let { y, x, dir } = prev;
                    const cmdName = (typeof action === 'object') ? action.type : action;

                    if (cmdName === 'Вперед') {
                        if (dir === 0 && y > 0 && mazeMap[y-1][x] !== 1) y -= 1;
                        else if (dir === 1 && x < 7 && mazeMap[y][x+1] !== 1) x += 1;
                        else if (dir === 2 && y < 7 && mazeMap[y+1][x] !== 1) y += 1;
                        else if (dir === 3 && x > 0 && mazeMap[y][x-1] !== 1) x -= 1;
                    } else if (cmdName === 'Поворот') {
                        dir = (dir + 1) % 4;
                    }
                    finalY = y;
                    finalX = x;
                    return { y, x, dir };
                });

                if (index === expanded.length - 1) {
                    setTimeout(() => checkWinCondition(finalY, finalX), 600);
                }
            }, index * 600);
        });
    };

    const checkWinCondition = (y, x) => {
        setIsRunning(false);
        setResult(y === 7 && x === 7 ? 'win' : 'lose');
    };

    const resetMission = () => {
        setCommands([]);
        setRobotPos({ y: 0, x: 0, dir: 1 });
        setStepCount(0);
        setResult(null);
    };

    const getTileImage = (type) => {
        if (type === 1) return "/assets/practice/m2/tile-wall.PNG";
        if (type === 2) return "/assets/practice/m2/tile-goal.PNG";
        if (type === 3) return "/assets/practice/m2/tile-start.PNG";
        return "/assets/practice/m2/tile-path.PNG";
    };

    return (
        <div className="flex gap-8 p-6 bg-slate-950 rounded-xl border border-cyan-500/30 relative">
            {showHelp && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center rounded-xl z-50 p-10 text-center">
                    <h2 className="text-3xl text-cyan-400 font-bold mb-4">Як грати?</h2>
                    <p className="text-white text-lg mb-6">Допоможи роботові дійти до бази за 12 кроків. Використовуй цикли для оптимізації!</p>
                    <button onClick={() => setShowHelp(false)} className="px-8 py-3 bg-cyan-600 text-white rounded-lg">Почати!</button>
                </div>
            )}

            <div className="w-[384px] h-[384px] grid grid-cols-8 border-2 border-cyan-500/20 shrink-0">
                {mazeMap.map((row, y) => row.map((cell, x) => (
                    <div key={`${y}-${x}`} className="relative bg-slate-800">
                        <img src={getTileImage(cell)} className="w-full h-full object-cover" alt="tile" />
                        {robotPos.y === y && robotPos.x === x && (
                            <img src="/assets/practice/m2/robot-lab.PNG" className="absolute inset-0 w-full h-full p-1 transition-all duration-500"
                                 style={{ transform: `rotate(${robotPos.dir * 90}deg)` }} alt="robot" />
                        )}
                    </div>
                )))}
            </div>

            <div className="flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-cyan-400 font-bold uppercase">Алгоритм ({commands.length}/{MAX_COMMANDS})</h2>
                    <span className="text-cyan-600 text-sm">Кроків: {stepCount}</span>
                </div>

                <div className="h-[250px] bg-slate-900 border border-dashed border-cyan-500 rounded p-4 overflow-y-auto flex flex-wrap gap-2 content-start">
                    {commands.map((cmd, i) => (
                        <button key={i} disabled={isRunning} onClick={() => setCommands(commands.filter((_, idx) => idx !== i))}
                                className={`${cmd.type === 'loop' ? 'bg-purple-600' : 'bg-cyan-600'} px-3 py-1 rounded text-white text-xs hover:bg-red-600 transition-colors`}>
                            {cmd.type === 'loop' ? `↺ ${cmd.action} x${cmd.count}` : cmd.type} ✕
                        </button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <button disabled={isRunning || commands.length >= MAX_COMMANDS} onClick={() => setCommands([...commands, {type: 'Вперед'}])} className="px-4 py-2 bg-cyan-700 text-white rounded disabled:opacity-30">Вперед</button>
                    <button disabled={isRunning || commands.length >= MAX_COMMANDS} onClick={() => setCommands([...commands, {type: 'Поворот'}])} className="px-4 py-2 bg-cyan-700 text-white rounded disabled:opacity-30">Поворот</button>
                    <button disabled={isRunning || commands.length >= MAX_COMMANDS} onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-30">Цикл</button>
                    <button disabled={isRunning} onClick={resetMission} className="px-4 py-2 bg-red-900 text-white rounded disabled:opacity-30">Скинути</button>
                </div>
                <button disabled={isRunning} onClick={runAlgorithm} className="w-full py-3 bg-green-600 text-white font-bold rounded hover:bg-green-500 disabled:opacity-30">ЗАПУСК</button>
            </div>

            {isModalOpen && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-xl z-50">
                    <div className="bg-slate-800 p-6 rounded-lg border border-purple-500 w-80">
                        <h3 className="text-white mb-4">Налаштування циклу</h3>
                        <select className="w-full mb-4 p-2 bg-slate-900 text-white border border-purple-500 rounded" value={loopSettings.action} onChange={(e) => setLoopSettings({...loopSettings, action: e.target.value})}>
                            <option value="Вперед" className="bg-slate-800">Вперед</option>
                            <option value="Поворот" className="bg-slate-800">Поворот</option>
                        </select>
                        <label className="text-white text-sm block mb-2">Кількість: {loopSettings.count}</label>
                        <input type="range" min="1" max="5" value={loopSettings.count} className="w-full mb-6 accent-purple-500" onChange={(e) => setLoopSettings({...loopSettings, count: parseInt(e.target.value)})} />
                        <div className="flex gap-2">
                            <button onClick={() => {setCommands([...commands, {type: 'loop', ...loopSettings}]); setIsModalOpen(false);}} className="flex-1 bg-green-600 py-2 text-white rounded">Додати</button>
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-red-600 py-2 text-white rounded">Скасувати</button>
                        </div>
                    </div>
                </div>
            )}

            {result && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center rounded-xl z-50 p-6 text-center">
                    <img src={result === 'win' ? "/assets/happy-vivi.PNG" : "/assets/sad-vivi.PNG"} className="h-64 w-auto mb-6 object-contain" alt="Vivi" />
                    <h2 className="text-3xl text-white font-bold mb-2">
                        {result === 'win' ? "Молодець, я пишаюсь тобою!" : "Не засмучуйся, робот теж вчиться!"}
                    </h2>
                    <p className="text-cyan-200 text-lg mb-8 max-w-md">
                        {result === 'win'
                            ? "Твій алгоритм був гарним. Тепер ми нарешті можемо перейти на наступну місію про сенсори!"
                            : "Підказка: спробуй згрупувати однакові рухи за допомогою циклів, щоб зекономити блоки!"
                        }
                    </p>

                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-all"
                    >
                        ЗАВЕРШИТИ ПРАКТИКУ
                    </button>

                    {result === 'lose' && (
                        <button onClick={resetMission} className="mt-4 px-8 py-2 bg-red-700 text-white rounded-lg font-bold">
                            Спробувати ще раз
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MazeMission;