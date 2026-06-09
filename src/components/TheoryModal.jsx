import { useState } from 'react';
import { mission1Theory, mission2Theory, mission3Theory, mission4Theory } from '../data/missionsData.jsx';

const TheoryModal = ({ openedTask, onClose }) => {
    // Вибираємо масив залежно від назви місії
    const getTheoryData = () => {

        if (openedTask.mission.includes('МІСІЯ 1')) return mission1Theory;
        if (openedTask.mission.includes('МІСІЯ 2')) return mission2Theory;
        if (openedTask.mission.includes('МІСІЯ 3')) return mission3Theory;
        if (openedTask.mission.includes('МІСІЯ 4')) return mission4Theory;

        return [];
    };

    const currentTheory = getTheoryData();
    const [currentTheoryPage, setCurrentTheoryPage] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceWarningShown, setVoiceWarningShown] = useState(false);

    const stopAllAudio = () => {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const toggleSpeech = () => {
        if (!('speechSynthesis' in window)) {
            alert("Ваш браузер не підтримує Web Speech API.");
            return;
        }

        if (isSpeaking) {
            stopAllAudio();
        } else {
            const textToSpeak = currentTheory[currentTheoryPage].text;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'uk-UA';
            utterance.rate = 1.0;
            utterance.pitch = 1.3;

            const availableVoices = window.speechSynthesis.getVoices();
            const ukVoice = availableVoices.find(voice => voice.lang === 'uk-UA' || voice.lang.includes('uk'));

            if (ukVoice) {
                utterance.voice = ukVoice;
            } else if (!voiceWarningShown) {
                alert("Увага: На вашому пристрої не знайдено українського голосового пакету.\n\nБраузер спробує прочитати текст іншими доступними голосами, тому озвучка може звучати з сильним акцентом. Це нормально!");
                setVoiceWarningShown(true);
            }

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const changePage = (delta) => {
        stopAllAudio();
        setCurrentTheoryPage(prev => {
            const newPage = prev + delta;
            if (newPage < 0) return 0;
            if (newPage >= currentTheory.length) return currentTheory.length - 1;
            return newPage;
        });
    };

    const handleClose = () => {
        stopAllAudio();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10 bg-slate-950/80 backdrop-blur-sm transition-opacity">
            <div className="relative w-full max-w-6xl h-[85vh] bg-slate-900 border-2 border-cyan-400 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.2),inset_0_0_30px_rgba(34,211,238,0.1)] flex flex-col overflow-hidden" style={{ backgroundImage: "url('/assets/clean-bg.PNG')", backgroundBlendMode: 'overlay' }}>

                <div className="flex justify-between items-center px-8 py-5 border-b border-cyan-500/50 bg-slate-950/80 backdrop-blur-md relative z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-950/80 border border-cyan-400 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            <img src="/assets/icon-theory.png" alt="icon" className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-widest">{openedTask.mission}</h2>
                            <p className="text-cyan-400 text-sm tracking-wider">ТЕОРІЯ</p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-600 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all text-xl">✕</button>
                </div>

                {currentTheory.length > 0 ? (
                    <div className="flex-1 flex flex-col relative z-10 w-full h-full p-6 gap-4 min-h-0">
                        <div className="flex-1 bg-slate-950/50 rounded-2xl border border-cyan-500/30 overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(34,211,238,0.05)] min-h-0">
                            <img src={currentTheory[currentTheoryPage].image} alt="сторінка" className="w-full h-full object-contain p-2" />
                        </div>
                        <div className="h-20 shrink-0 flex items-center justify-between px-8 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-cyan-500/50">
                            <button onClick={() => changePage(-1)} disabled={currentTheoryPage === 0} className={`px-6 py-3 rounded-xl font-bold ${currentTheoryPage === 0 ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' : 'bg-cyan-950/50 text-cyan-400 hover:bg-cyan-900'}`}>◀ НАЗАД</button>
                            <div className="flex items-center gap-6">
                                <button onClick={toggleSpeech} className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold border ${isSpeaking ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-800 text-cyan-300 border-cyan-500'}`}>
                                    {isSpeaking ? '⏹ ЗУПИНИТИ' : '🔊 ОЗВУЧИТИ'}
                                </button>
                                <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-cyan-500/30 text-cyan-400 font-mono text-sm">{currentTheoryPage + 1} / {currentTheory.length}</div>
                            </div>
                            {currentTheoryPage === currentTheory.length - 1 ? (
                                <button onClick={handleClose} className="px-6 py-3 rounded-xl font-bold bg-green-500 text-slate-900 hover:bg-green-400">ЗАВЕРШИТИ ✔</button>
                            ) : (
                                <button onClick={() => changePage(1)} className="px-6 py-3 rounded-xl font-bold bg-cyan-950/50 text-cyan-400 hover:bg-cyan-900">ДАЛІ ▶</button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                        <h3 className="text-3xl font-black text-cyan-400">РОЗДІЛ У РОЗРОБЦІ</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TheoryModal;