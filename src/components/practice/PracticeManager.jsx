import CyberShield from './CyberShield';

const PracticeManager = ({ missionId, onClose }) => {
    // Жодних зайвих console.log або тексту тут не повинно бути!

    switch (missionId) {
        case 1:
            return <div className="p-10 text-white text-center">Місія 1: Конвеєр</div>;
        case 2:
            return <div className="p-10 text-white text-center">Місія 2: Лабіринт</div>;
        case 3:
            return <div className="p-10 text-white text-center">Місія 3: Сенсори</div>;
        case 4:
            return <CyberShield onClose={onClose} />;
        default:
            return <div className="p-10 text-slate-400 text-center">Ця місія ще в розробці...</div>;
    }
};

export default PracticeManager;