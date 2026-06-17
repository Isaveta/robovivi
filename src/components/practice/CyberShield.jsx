import { useState } from 'react';
import { unlockNextStep } from '../../utils/progressUtils';
import { useAuth } from '../../context/AuthContext';

// Генератор випадкової таблиці
const generateCipherTable = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const numbers = Array.from({ length: 26 }, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5);
    const table = {};
    alphabet.forEach((char, i) => { table[char] = numbers[i]; });
    return table;
};

const cipherTable = generateCipherTable();

const stages = [
    {
        id: 1, type: 'caesar', question: "URERW", answer: "ROBOT",
        instruction: "Зсув: 3 позиції назад",
        alphabet: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
        hint: "Підказка: Спробуй зсунути кожну літеру на 3 позиції вперед по алфавіту."
    },
    {
        id: 2, type: 'permute', question: "TSATR", answer: "START",
        instruction: "Віднови порядок літер",
        alphabet: null,
        hint: "Підказка: Це слово означає початок будь-якої місії."
    },
    {
        id: 3, type: 'cipher',
        question: `${cipherTable['M']}-${cipherTable['O']}-${cipherTable['V']}-${cipherTable['E']}`,
        answer: "MOVE",
        instruction: "Розшифруй числа за допомогою таблиці:",
        alphabet: Object.entries(cipherTable).map(([char, num]) => `${char}=${num}`).join(" "),
        hint: "Підказка: Кожне число — це порядковий номер літери в таблиці праворуч."
    }
];

const CyberShield = ({ onClose }) => {
    const { user } = useAuth();
    const [currentStage, setCurrentStage] = useState(0);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState('idle');

    const handleInputChange = (e) => {
        const val = e.target.value.toUpperCase();
        const onlyLetters = val.replace(/[^A-Z]/g, '');
        if (onlyLetters.length <= stages[currentStage].answer.length) {
            setInput(onlyLetters);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleCheck();
    };

    const handleCheck = async () => {
        if (input === stages[currentStage].answer) {
            setFeedback('correct');

            // Затримка перед переходом
            setTimeout(async () => {
                if (currentStage < stages.length - 1) {
                    setCurrentStage(prev => prev + 1);
                    setInput('');
                    setFeedback('idle');
                } else {
                    // Фіналізація місії 4
                    await unlockNextStep(user.uid, 4, 'practice');
                    alert("СИСТЕМУ ВІДНОВЛЕНО! Я ПИШАЮСЯ ТОБОЮ");
                    onClose();
                }
            }, 1000);
        } else {
            setFeedback('wrong');
            setTimeout(() => setFeedback('idle'), 3000);
        }
    };

    return (
        <div className="w-full h-full bg-[#050505] text-cyan-400 p-4 flex flex-col font-mono overflow-y-auto">
            <div className="bg-cyan-950/20 p-4 mb-4 border border-cyan-500/30">
                <h2 className="text-white text-sm mb-1 underline uppercase">Завдання місії:</h2>
                <p className="text-sm opacity-80">Вітаю, друже. Використовуй підказки для дешифрування.</p>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="border border-cyan-500/20 p-8 flex flex-col">
                    <p className="text-sm uppercase text-cyan-600 mb-2">Етап {stages[currentStage].id} — Введення:</p>
                    <p className="text-xl text-white mb-6">{stages[currentStage].instruction}</p>
                    <div className="text-5xl font-black text-cyan-300 mb-8 tracking-[0.2em]">{stages[currentStage].question}</div>

                    <div className="mt-auto">
                        <input
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className={`bg-transparent border-b-2 p-4 text-3xl outline-none w-full mb-2 ${feedback === 'wrong' ? 'border-red-500 text-red-400' : 'border-cyan-500 text-white'}`}
                            placeholder="ВВЕДИ КЛЮЧ..."
                        />
                        <div className="h-16 mb-4">
                            {feedback === 'wrong' && <p className="text-red-500 text-sm animate-pulse">{stages[currentStage].hint}</p>}
                        </div>
                        <button onClick={handleCheck} className="bg-cyan-500/10 border border-cyan-500 text-cyan-300 font-bold py-4 w-full hover:bg-cyan-500 hover:text-black uppercase">Дешифрувати</button>
                    </div>
                </div>

                <div className="border border-cyan-500/20 p-4 flex flex-col">
                    {stages[currentStage].alphabet ? (
                        <>
                            <h3 className="text-white text-sm mb-4 uppercase tracking-widest border-b border-cyan-800 pb-2">Довідкові дані:</h3>
                            <div className="text-lg font-bold text-cyan-200 tracking-widest break-all leading-snug">
                                {stages[currentStage].alphabet}
                            </div>
                        </>
                    ) : (
                        <div className="text-cyan-900 italic text-center mt-10">СИСТЕМА: Немає доступних підказок для цього етапу.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CyberShield;