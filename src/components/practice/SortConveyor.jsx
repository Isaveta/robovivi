import { useState } from 'react';

const SortConveyor = () => {
    const [step, setStep] = useState('intro');
    const [found, setFound] = useState([]);

    const violations = [
        { id: 1, name: 'broken-wire', src: '/assets/practice/m1/broken-wire.PNG' },
        { id: 2, name: 'coffee', src: '/assets/practice/m1/spilled-coffee.PNG' },
        { id: 3, name: 'cables', src: '/assets/practice/m1/messy-cables.PNG' },
        { id: 4, name: 'papers', src: '/assets/practice/m1/paper1.PNG' },
        { id: 5, name: 'rag', src: '/assets/practice/m1/wet-rag.PNG' },
    ];

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
                    {/* 1. Фон не реагує на кліки */}
                    <img src="/assets/practice/m1/bg-lab.PNG" className="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="lab" />

                    {/* 2. Порушення */}
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
            ) : (
                <div className="flex items-center justify-center h-full text-white text-xl bg-slate-950 rounded-xl border border-cyan-500/30">
                    <div>
                        <h2 className="text-2xl text-cyan-400 font-bold mb-4 text-center">ЕТАП 2: КОНВЕЄР</h2>
                        <p className="opacity-70">Робота конвеєра розпочата. Сортуй об'єкти...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortConveyor;