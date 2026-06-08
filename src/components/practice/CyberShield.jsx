import { useState } from 'react'; // Тепер useState використовується!

const CyberShield = ({ onClose }) => { // onClose тепер використовується нижче
    const [input, setInput] = useState('');

    const handleCheck = () => {
        if (input === "ROBOT") {
            alert("Система зламана!");
            onClose(); // Закриваємо вікно при успіху
        } else {
            alert("Невірний ключ!");
        }
    };

    return (
        <div className="text-cyan-100 p-6 flex flex-col items-center justify-center font-mono relative">
            {/* Кнопка виходу (використовуємо onClose) */}

            <div className="w-full border-b border-cyan-500/50 pb-4 mb-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold tracking-widest text-cyan-400 animate-pulse uppercase">
                    &gt; Взлом_системи.exe
                </h3>
            </div>

            <div className="bg-slate-950/50 border border-cyan-800 p-6 rounded-lg w-full max-w-lg shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                <p className="mb-6 text-sm text-slate-300 border-l-2 border-cyan-500 pl-4">
                    [SYSTEM WARNING]<br/>
                    Зловмисник активував шифр Цезаря.<br/>
                    Кожен символ зміщено на 3 позиції вперед.<br/><br/>
                    ЗАШИФРОВАНЕ ПОВІДОМЛЕННЯ:<br/>
                    <span className="text-2xl font-bold text-cyan-300 tracking-tighter">URERW</span>
                </p>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value.toUpperCase())}
                    className="bg-black border-2 border-cyan-500/50 p-4 w-full text-cyan-200 outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)] uppercase transition-all"
                    placeholder="Введи ключ доступу..."
                />

                <button
                    onClick={handleCheck} // Додали обробник
                    className="mt-6 w-full py-3 bg-cyan-900 border border-cyan-400 text-cyan-100 font-bold hover:bg-cyan-600 transition-colors uppercase tracking-widest"
                >
                    Дешифрувати
                </button>
            </div>
        </div>
    );
};

export default CyberShield;