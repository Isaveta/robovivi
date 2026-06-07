import { useState, useMemo } from 'react';
import { mission1Test, mission2Test, mission3Test, mission4Test } from '../data/missionsData';

const TestModal = ({ openedTask, onClose }) => {
    // Вибираємо масив питань та перемішуємо варіанти
    const rawData = useMemo(() => {
        let data = [];
        if (openedTask.mission.includes('МІСІЯ 1')) data = mission1Test;
        else if (openedTask.mission.includes('МІСІЯ 2')) data = mission2Test;
        else if (openedTask.mission.includes('МІСІЯ 3')) data = mission3Test;
        else if (openedTask.mission.includes('МІСІЯ 4')) data = mission4Test;

        return data.map(q => {
            const options = q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.correct }));
            const shuffled = [...options].sort(() => Math.random() - 0.5);
            return {
                question: q.question,
                options: shuffled,
                correctIndex: shuffled.findIndex(o => o.isCorrect)
            };
        });
    }, [openedTask.mission]);

    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleAnswer = (index) => {
        if (feedback !== null) return;
        const isCorrect = index === rawData[currentStep].correctIndex;
        if (isCorrect) setScore(prev => prev + 1);
        setFeedback(isCorrect ? 'correct' : 'wrong');

        setTimeout(() => {
            setFeedback(null);
            if (currentStep + 1 < rawData.length) {
                setCurrentStep(prev => prev + 1);
            } else {
                setIsFinished(true);
            }
        }, 800);
    };

    const percentage = (score / rawData.length) * 100;
    const isPassed = percentage >= 33;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-cyan-400 rounded-3xl p-8 shadow-[0_0_50px_rgba(34,211,238,0.2)]">

                <div className="mb-8 border-b border-cyan-500/30 pb-4">
                    <h1 className="text-cyan-400 font-bold tracking-widest">{openedTask.mission}</h1>
                    <p className="text-slate-400 text-sm">ТЕСТУВАННЯ</p>
                </div>

                {!isFinished ? (
                    <div className="flex flex-col gap-6">
                        <h2 className="text-xl text-cyan-200">Питання {currentStep + 1} з {rawData.length}</h2>
                        <h3 className="text-2xl font-bold">{rawData[currentStep].question}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {rawData[currentStep].options.map((opt, i) => (
                                <button key={i} onClick={() => handleAnswer(i)}
                                        className={`p-4 rounded-xl border-2 transition-all font-medium ${
                                            feedback === 'correct' && i === rawData[currentStep].correctIndex ? 'bg-green-600 border-green-400' :
                                                feedback === 'wrong' && i === rawData[currentStep].correctIndex ? 'bg-green-600 border-green-400' :
                                                    feedback === 'wrong' && i !== rawData[currentStep].correctIndex ? 'bg-red-900 border-red-500' :
                                                        'bg-slate-800 border-slate-700 hover:border-cyan-400'
                                        }`}>
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-6 text-center h-full">
                        <img
                            src={isPassed ? "/assets/happy-vivi.PNG" : "/assets/sad-vivi.PNG"}
                            alt="Результат"
                            className="h-64 w-auto object-contain drop-shadow-[0_0_25px_rgba(34,211,238,0.6)] animate-in zoom-in duration-500"
                        />
                        <h2 className="text-4xl font-black text-white tracking-widest uppercase">
                            {isPassed ? "ВІТАЄМО!" : "СПРОБУЙ ЩЕ РАЗ"}
                        </h2>
                        <p className="text-xl text-cyan-300 font-bold">Твій результат: {score} з {rawData.length} ({Math.round(percentage)}%)</p>
                        <button onClick={onClose} className="px-12 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl font-bold text-lg hover:scale-105 transition-all">ЗАКРИТИ</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestModal;