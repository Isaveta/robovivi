import { useState } from 'react';
import { unlockNextStep } from '../../utils/progressUtils';
import { useAuth } from '../../context/AuthContext';

const SortConveyor = ({ onClose }) => {
    const [step, setStep] = useState('intro');
    const [found, setFound] = useState([]);
    const [score, setScore] = useState(0);
    const { user } = useAuth();

    const conveyorItems = [
        { type: 'robot', src: '/assets/practice/m12/obj-micro.PNG' },
        { type: 'power', src: '/assets/practice/m12/obj-battery.PNG' },
        { type: 'trash', src: '/assets/practice/m12/obj-apple.PNG' },
        { type: 'trash', src: '/assets/practice/m12/obj-cup.PNG' },
        { type: 'robot', src: '/assets/practice/m12/obj-sensor.PNG' },
        { type: 'power', src: '/assets/practice/m12/obj-accu.PNG' },
    ];

    const [currentItem, setCurrentItem] = useState(conveyorItems[0]);

    const violations = [
        { id: 1, name: 'broken-wire', src: '/assets/practice/m1/broken-wire.PNG' },
        { id: 2, name: 'coffee', src: '/assets/practice/m1/spilled-coffee.PNG' },
        { id: 3, name: 'cables', src: '/assets/practice/m1/messy-cables.PNG' },
        { id: 4, name: 'papers', src: '/assets/practice/m1/paper1.PNG' },
        { id: 5, name: 'rag', src: '/assets/practice/m1/wet-rag.PNG' },
    ];

    const handleSort = (selectedType) => {
        if (selectedType === currentItem.type) {
            setScore(prev => prev + 1);
            if (score >= 5) { // 5 правильних відповідей
                setStep('complete');
            } else {
                const randomItem = conveyorItems[Math.floor(Math.random() * conveyorItems.length)];
                setCurrentItem(randomItem);
            }
        } else {
            alert("ПОМИЛКА! Невірний відсік.");
        }
    };

    if (step === 'intro') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-10 text-center border border-cyan-500/30 rounded-xl">
                <h2 className="text-3xl text-cyan-400 font-bold mb-6">МІСІЯ 1: БЕЗПЕКА ПОНАД УСЕ</h2>
                <p className="text-slate-300 mb-8 max-w-md">Перед запуском конвеєра перевір лабораторію. Знайди 5 порушень, клікаючи на них!</p>
                <button
                    onClick={() => setStep('safety')}
                    className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-all"
                >
                    ПОЧАТИ ПЕРЕВІРКУ
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-4 flex flex-col">
            {step === 'safety' ? (
                <div className="relative w-full h-full bg-slate-900 border border-cyan-500/30 rounded-xl overflow-hidden pointer-events-none">
                    <img src="/assets/practice/m1/bg-lab.PNG" className="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="lab" />
                    {violations.map((v) => (
                        !found.includes(v.id) && (
                            <img
                                key={v.id}
                                src={v.src}
                                className="absolute inset-0 w-full h-full object-cover cursor-pointer pointer-events-auto z-10"
                                alt={v.name}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const newFound = [...found, v.id];
                                    setFound(newFound);
                                    if (newFound.length === violations.length) {
                                        setTimeout(() => setStep('conveyor'), 500);
                                    }
                                }}
                            />
                        )
                    ))}
                    <div className="absolute top-4 left-4 bg-black/60 p-2 text-cyan-400 text-sm font-mono border border-cyan-500/30 rounded z-20 pointer-events-auto">
                        Порушень знайдено: {found.length} / {violations.length}
                    </div>
                </div>
            ) : step === 'conveyor' ? (
                <div className="w-full h-full flex flex-col bg-slate-900 rounded-xl border border-cyan-500/30 p-4 relative">
                    <h2 className="text-cyan-400 font-bold mb-1 uppercase tracking-widest">Етап 2: Сортувальний конвеєр</h2>
                    <p className="text-cyan-600 text-xs mb-3 italic">* Натисни на категорію, щоб відсортувати об'єкт!</p>

                    <div className="flex-1 relative bg-slate-800 rounded-lg overflow-hidden border border-cyan-500/20">
                        <img src="/assets/practice/m12/bg-conveyor.PNG" className="absolute w-full h-full object-cover" alt="conveyor" />
                        <div key={currentItem.src} className="absolute top-[35%] left-0 w-32 h-32 animate-move-right">
                            <img src={currentItem.src} alt="item" className="w-full h-full object-contain" />
                        </div>
                    </div>

                    <div className="flex justify-center gap-8 mt-6">
                        <button onClick={() => handleSort('robot')} className="flex flex-col items-center p-4 w-28 h-28 border-2 border-cyan-500/50 rounded-2xl bg-cyan-950/40 hover:bg-cyan-500/30 hover:scale-105 transition-all text-cyan-400">
                            <span className="text-4xl mb-1">⚙️</span>
                            <span className="text-[10px] font-bold uppercase">Роботи</span>
                        </button>
                        <button onClick={() => handleSort('power')} className="flex flex-col items-center p-4 w-28 h-28 border-2 border-cyan-500/50 rounded-2xl bg-cyan-950/40 hover:bg-cyan-500/30 hover:scale-105 transition-all text-cyan-400">
                            <span className="text-4xl mb-1">⚡</span>
                            <span className="text-[10px] font-bold uppercase">Живлення</span>
                        </button>
                        <button onClick={() => handleSort('trash')} className="flex flex-col items-center p-4 w-28 h-28 border-2 border-red-500/50 rounded-2xl bg-red-950/40 hover:bg-red-500/30 hover:scale-105 transition-all text-red-400">
                            <span className="text-4xl mb-1">🗑️</span>
                            <span className="text-[10px] font-bold uppercase">Сміття</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 border border-cyan-500/30 rounded-xl p-8 text-center animate-pulse">
                    <img
                        src="/assets/happy-vivi.PNG"
                        alt="Happy Vivi"
                        className="w-48 h-48 mb-6 rounded-full border-4 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)] animate-bounce"
                    />
                    <h2 className="text-4xl text-cyan-400 font-bold mb-4">МІСІЮ ВИКОНАНО!</h2>
                    <p className="text-white text-lg max-w-sm mb-8">
                        Молодець! Ти чудово впорався з сортуванням і зробив лабораторію безпечною. Я пишаюся тобою!
                    </p>
                    <button
                        onClick={async () => {
                            await unlockNextStep(user.uid, 1, 'practice');
                            onClose();
                        }}
                        className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-all"
                    >
                        ЗАВЕРШИТИ ПРАКТИКУ
                    </button>
                </div>
            )}
        </div>
    );
};

export default SortConveyor;