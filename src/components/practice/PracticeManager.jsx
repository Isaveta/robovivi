import CyberShield from './CyberShield';

const PracticeManager = ({ missionId, onClose }) => {
    switch (missionId) {
        case 1:
            return <div className="text-white">Тут буде Конвеєр (Місія 1)</div>;
        case 2:
            return <div className="text-white">Тут буде Лабіринт (Місія 2)</div>;
        case 3:
            return <div className="text-white">Тут будуть Сенсори (Місія 3)</div>;
        case 4:
            return <CyberShield onClose={onClose} />;
        default:
            return <div className="text-white">Місія {missionId} ще в розробці...</div>;
    }
};

export default PracticeManager;