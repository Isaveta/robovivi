import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore'; // Замінили getDoc на onSnapshot
import { db } from '../firebase';

export const useProgress = (userId) => {
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const unsub = onSnapshot(doc(db, "userProgress", userId), (docSnapshot) => {
            if (docSnapshot.exists()) {
                setProgress(docSnapshot.data().missions);
            }
        }, (error) => {
            console.error("Помилка при отриманні прогресу в реальному часі:", error);
        });

        return () => unsub();
    }, [userId]);

    return progress;
};