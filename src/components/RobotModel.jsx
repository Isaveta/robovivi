import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function RobotModel({ scene }) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="w-full h-full flex items-center justify-center text-red-400 text-xs text-center p-4">
                Помилка завантаження моделі
            </div>
        );
    }

    return (
        <Spline
            scene={scene}
            onError={() => setHasError(true)}
        />
    );
}