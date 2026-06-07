<<<<<<< HEAD
import { useState } from 'react';

// Створюємо масив етапів прямо тут або в окремому файлі даних
const stages = [
    { id: 1, question: "URERW", answer: "ROBOT", shift: 3, hint: "АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ" },
];

const CyberShield = ({ onClose }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, correct, wrong

    const checkAnswer = () => {
        if (input.toUpperCase() === stages[currentStage].answer) {
            setStatus('correct');
            setTimeout(() => {
                if (currentStage < stages.length - 1) {
                    setCurrentStage(prev => prev + 1);
                    setInput('');
                    setStatus('idle');
                } else {
                    alert("Місію виконано!");
                }
            }, 1000);
        } else {
            setStatus('wrong');
        }
    };

    return (
        <div className="text-cyan-100 p-6 font-mono">
            {/* Панель алфавіту */}
            <div className="bg-slate-900 p-4 mb-4 border border-cyan-500/30 text-[10px] break-all">
                <span className="text-cyan-400">ALPHABET_MAP: </span>
                {stages[currentStage].hint}
            </div>

            <div className="text-2xl font-bold text-cyan-300">{stages[currentStage].question}</div>

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`w-full mt-4 p-3 bg-black border-2 ${status === 'wrong' ? 'border-red-500' : 'border-cyan-500'} text-white`}
            />

            <button onClick={checkAnswer} className="mt-4 w-full py-3 bg-cyan-700 hover:bg-cyan-600">
                ДЕШИФРУВАТИ
            </button>

            {status === 'correct' && <div className="text-green-400 mt-2">ACCESS GRANTED</div>}
        </div>
    );
};

=======
>>>>>>> parent of 62bd2e1 (Practice System & UI Polish)
