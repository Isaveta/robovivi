import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RoleSelection from './pages/RoleSelection';
import AuthScreen from './pages/AuthScreen';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-[#0B1021] text-white font-sans antialiased selection:bg-cyan-500/30">
                <Routes>
                    <Route path="/" element={<RoleSelection />} />
                    <Route path="/auth" element={<AuthScreen />} />
                    <Route path="/student" element={<StudentDashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;