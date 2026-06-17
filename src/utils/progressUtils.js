import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const unlockNextStep = async (userId, missionId, currentStep) => {
    const ref = doc(db, "userProgress", userId);
    const updates = {};

    // 1. Поточний етап стає виконаним (це працює завжди)
    updates[`missions.${missionId}.${currentStep}`] = "completed";

    // 2. Логіка відкриття наступного кроку
    if (currentStep === 'theory') {
        updates[`missions.${missionId}.test`] = "active";
    }
    else if (currentStep === 'test') {
        updates[`missions.${missionId}.practice`] = "active";
    }
    else if (currentStep === 'practice') {
        // Якщо це практика, намагаємось відкрити теорію наступної місії
        const nextMissionId = missionId + 1;

        // Додаємо перевірку: якщо місія існує (<= 4), робимо її теорію активною
        if (nextMissionId <= 4) {
            updates[`missions.${nextMissionId}.theory`] = "active";
        }
        // Якщо missionId === 4, ми просто нічого додатково не відкриваємо,
    }

    await updateDoc(ref, updates);
};