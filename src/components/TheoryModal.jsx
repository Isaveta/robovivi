import { useState } from 'react';
import { mission1Theory } from '../data/missionsData.jsx';

const TheoryModal = ({ openedTask, onClose }) => {
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
            const textToSpeak = mission1Theory[currentTheoryPage].text;
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
            if (newPage >= mission1Theory.length) return mission1Theory.length - 1;
            return newPage;
        });
    };

    const handleClose = () => {
        stopAllAudio();
        onClose();
    };

    const isMission1 = openedTask.mission.includes('МІСІЯ 1');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10 bg-slate-950/80 backdrop-blur-sm transition-opacity">
            <div className="relative w-full max-w-6xl h-[85vh] bg-slate-900 border-2 border-cyan-400 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.2),inset_0_0_30px_rgba(34,211,238,0.1)] flex flex-col overflow-hidden" style={{ backgroundImage: "url('/assets/clean-bg.PNG')", backgroundBlendMode: 'overlay' }}>

                <div className="flex justify-between items-center px-8 py-5 border-b border-cyan-500/50 bg-slate-950/80 backdrop-blur-md relative z-10 shadow-[0_4px_20px_rgba(34,211,238,0.1)] shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-950/80 border border-cyan-400 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            <img src={`/assets/icon-theory.png`} alt="icon" className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">{openedTask.mission}</h2>
                            <p className="text-cyan-400 text-sm tracking-wider">ТЕОРІЯ</p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-600 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-950/50 transition-all text-xl">✕</button>
                </div>

                {isMission1 ? (
                    <div className="flex-1 flex flex-col relative z-10 w-full h-full p-4 sm:p-6 gap-4 min-h-0">
                        <div className="flex-1 bg-slate-950/50 rounded-2xl border border-cyan-500/30 overflow-hidden flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(34,211,238,0.05)] min-h-0">
                            <img src={mission1Theory[currentTheoryPage].image} alt={`Сторінка ${currentTheoryPage + 1}`} className="w-full h-full object-contain p-2 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-opacity duration-300" />
                        </div>
                        <div className="h-20 shrink-0 flex items-center justify-between px-6 sm:px-8 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                            <button onClick={() => changePage(-1)} disabled={currentTheoryPage === 0} className={`px-6 py-3 rounded-xl font-bold transition-all text-sm tracking-wider ${currentTheoryPage === 0 ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-700' : 'bg-cyan-950/50 text-cyan-400 hover:bg-cyan-900 hover:text-white border border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]'}`}>◀ НАЗАД</button>
                            <div className="flex items-center gap-4 sm:gap-6">
                                <button onClick={toggleSpeech} className={`flex items-center gap-2 sm:gap-3 px-6 py-3 rounded-xl font-bold transition-all border text-sm tracking-wider ${isSpeaking ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.6)] animate-pulse' : 'bg-slate-800 text-cyan-300 border-cyan-500/40 hover:bg-slate-700 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]'}`}>
                                    {isSpeaking ? '⏹ ЗУПИНИТИ' : '🔊 ОЗВУЧИТИ'}
                                </button>
                                <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-cyan-500/30 font-mono text-cyan-400 shadow-[inset_0_0_10px_rgba(34,211,238,0.1)] text-sm hidden sm:block">{currentTheoryPage + 1} / {mission1Theory.length}</div>
                            </div>
                            {currentTheoryPage === mission1Theory.length - 1 ? (
                                <button onClick={handleClose} className="px-6 py-3 rounded-xl font-bold bg-green-500 text-slate-900 hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all text-sm tracking-wider hover:scale-105">ЗАВЕРШИТИ ✔</button>
                            ) : (
                                <button onClick={() => changePage(1)} className="px-6 py-3 rounded-xl font-bold bg-cyan-950/50 text-cyan-400 hover:bg-cyan-900 hover:text-white border border-cyan-500/50 transition-all text-sm tracking-wider hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">ДАЛІ ▶</button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center relative z-10 bg-slate-950/40 backdrop-blur-sm p-8">
                        <div className="w-32 h-32 border-4 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]">
                            <img src={`/assets/icon-theory.png`} alt="icon" className="w-12 h-12 object-contain opacity-50" />
                        </div>
                        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">РОЗДІЛ У РОЗРОБЦІ</h3>
                        <p className="text-slate-400 text-center max-w-md">Сюди ми згодом додамо інтерактивний контент.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TheoryModal;