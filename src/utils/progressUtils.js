import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

// Логіка розблокування місій
export const unlockNextStep = async (userId, missionId, currentStep) => {
    const ref = doc(db, "userProgress", userId);
    const updates = {};

    // 1. Поточний етап стає виконаним
    updates[`missions.${missionId}.${currentStep}`] = "completed";

    // 2. Логіка відкриття наступного кроку
    if (currentStep === 'theory') {
        updates[`missions.${missionId}.test`] = "active";
    }
    else if (currentStep === 'test') {
        updates[`missions.${missionId}.practice`] = "active";
    }
    else if (currentStep === 'practice') {
        const nextMissionId = missionId + 1;
        if (nextMissionId <= 4) {
            updates[`missions.${nextMissionId}.theory`] = "active";
        }
    }

    await updateDoc(ref, updates);
};

// Логіка для стріку днів
export const updateStreak = async (userId) => {
    const userRef = doc(db, "users", userId); // Працюємо з колекцією users
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const data = userSnap.data();
    const lastLogin = data.lastLogin?.toDate();
    const today = new Date();

    let newStreak = data.streak || 1;

    if (lastLogin) {
        // Рахуємо різницю в днях
        const lastLoginDate = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const diffDays = Math.floor((todayDate - lastLoginDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            newStreak += 1; // Учень зайшов на наступний день
        } else if (diffDays > 1) {
            newStreak = 1; // Пропустив день — скидаємо
        }
    }

    await updateDoc(userRef, {
        streak: newStreak,
        lastLogin: serverTimestamp()
    });
};