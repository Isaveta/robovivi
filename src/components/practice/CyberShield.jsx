import { useState } from 'react';

// Генератор випадкової таблиці для 3-го етапу
const generateCipherTable = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const numbers = Array.from({ length: 26 }, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5);
    const table = {};
    alphabet.forEach((char, i) => { table[char] = numbers[i]; });
    return table;
};

// Створюємо таблицю один раз
const cipherTable = generateCipherTable();

const stages = [
    { id: 1, type: 'caesar', question: "URERW", answer: "ROBOT", instruction: "Зсув: 3 позиції назад", alphabet: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z" },
    { id: 2, type: 'permute', question: "TSATR", answer: "START", instruction: "Віднови порядок літер", alphabet: null },
    {
        id: 3,
        type: 'cipher',
        question: `${cipherTable['M']}-${cipherTable['O']}-${cipherTable['V']}-${cipherTable['E']}`,
        answer: "MOVE",
        instruction: "Розшифруй числа за допомогою таблиці:",
        alphabet: Object.entries(cipherTable).map(([char, num]) => `${char}=${num}`).join(" ")
    }
];

const CyberShield = ({ onClose }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState('idle');

    const handleInputChange = (e) => {
        const val = e.target.value.toUpperCase();
        // Дозволяємо тільки букви, обмежуємо довжину відповіді
        const onlyLetters = val.replace(/[^A-Z]/g, '');
        if (onlyLetters.length <= stages[currentStage].answer.length) {
            setInput(onlyLetters);
        }
    };

    const handleCheck = () => {
        if (input === stages[currentStage].answer) {
            setFeedback('correct');
            setTimeout(() => {
                if (currentStage < stages.length - 1) {
                    setCurrentStage(prev => prev + 1);
                    setInput('');
                    setFeedback('idle');
                } else {
                    alert("ДОСТУП ВІДНОВЛЕНО!");
                    onClose();
                }
            }, 1000);
        } else {
            setFeedback('wrong');
            setTimeout(() => setFeedback('idle'), 2000);
        }
    };

    return (
        <div className="w-full h-full bg-[#050505] text-cyan-400 p-4 flex flex-col font-mono overflow-y-auto">

            <div className="bg-cyan-950/20 p-4 mb-4 border border-cyan-500/30">
                <h2 className="text-white text-sm mb-1 underline uppercase">Завдання місії:</h2>
                <p className="text-sm opacity-80">Вітаю, оперативнику. Наша мета — повернути контроль над системою. Використовуй панель підказок справа для дешифрування.</p>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="border border-cyan-500/20 p-8 flex flex-col justify-start">
                    <p className="text-sm uppercase tracking-widest text-cyan-600 mb-2">Етап {stages[currentStage].id} — Введення:</p>
                    <p className="text-xl text-white mb-6">{stages[currentStage].instruction}</p>
                    <div className="text-5xl font-black text-cyan-300 mb-8 tracking-[0.2em]">{stages[currentStage].question}</div>

                    <div className="mt-auto">
                        <input
                            value={input}
                            onChange={handleInputChange}
                            className={`bg-transparent border-b-2 p-4 text-3xl outline-none w-full mb-2 transition-colors ${feedback === 'wrong' ? 'border-red-500 text-red-400' : 'border-cyan-500 text-white'}`}
                            placeholder="ВВЕДИ КЛЮЧ..."
                        />
                        <div className="h-6 mb-4">
                            {feedback === 'wrong' && <p className="text-red-500 text-sm animate-pulse">ПОМИЛКА: Невірний ключ, спробуй знову.</p>}
                            {feedback === 'correct' && <p className="text-green-500 text-sm">ВІРНО. ПЕРЕХІД ДО НАСТУПНОГО ЕТАПУ...</p>}
                        </div>

                        <button onClick={handleCheck} className="bg-cyan-500/10 border border-cyan-500 text-cyan-300 font-bold text-xl py-4 hover:bg-cyan-500 hover:text-black transition-all uppercase tracking-widest w-full">
                            Дешифрувати
                        </button>
                    </div>
                </div>

                <div className="border border-cyan-500/20 p-4 flex flex-col">
                    <h3 className="text-white text-sm mb-2 uppercase tracking-widest">Довідкові дані:</h3>
                    <div className="text-lg font-bold text-cyan-200 tracking-widest break-all leading-snug">
                        {stages[currentStage].alphabet}
                    </div>
                    <div className="mt-auto pt-4 text-cyan-800 text-[10px] italic">
                        [ СИСТЕМА: {feedback === 'wrong' ? 'ПОМИЛКА ВВОДУ' : 'ЗАШИФРОВАНА'} ]<br/>
                        [ З'ЄДНАННЯ: СТАБІЛЬНЕ ]
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CyberShield;