import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const AVATARS = [
    "/assets/avatars/avatar1.PNG",
    "/assets/avatars/avatar2.PNG",
    "/assets/avatars/avatar3.PNG",
    "/assets/avatars/avatar4.PNG",
    "/assets/avatars/avatar5.PNG",
    "/assets/avatars/avatar6.PNG"
];

const AvatarSelector = ({ userId, onClose, onUpdate, currentPhoto }) => {

    const handleSelect = async (url) => {
        if (currentPhoto) {
            alert("Аватарку можна обрати лише один раз!");
            return;
        }

        try {
            await updateDoc(doc(db, "users", userId), { photoURL: url });
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Помилка:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-slate-900 border border-cyan-500 p-6 rounded-2xl w-80 text-center">
                <h3 className="text-cyan-400 font-bold mb-4">Обери свій образ:</h3>
                <div className="grid grid-cols-3 gap-4">
                    {AVATARS.map((url) => (
                        <img
                            key={url} src={url} alt="avatar"
                            className="w-16 h-16 rounded-full cursor-pointer hover:ring-2 ring-cyan-400 transition-all"
                            onClick={() => handleSelect(url)}
                        />
                    ))}
                </div>
                <button onClick={onClose} className="mt-6 text-slate-400 underline text-sm hover:text-white">Скасувати</button>
            </div>
        </div>
    );
};

export default AvatarSelector;