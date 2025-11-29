
import React, { useState } from 'react';

interface AuthProps {
    onLogin: (username: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (isRegistering) {
            // Register
            const existingUser = localStorage.getItem(`user_${username}`);
            if (existingUser) {
                setError('Tên đăng nhập đã tồn tại');
                return;
            }
            localStorage.setItem(`user_${username}`, JSON.stringify({ password }));
            localStorage.setItem('currentUser', username);
            onLogin(username);
        } else {
            // Login
            const userStr = localStorage.getItem(`user_${username}`);
            if (!userStr) {
                setError('Tên đăng nhập không tồn tại');
                return;
            }
            const user = JSON.parse(userStr);
            if (user.password !== password) {
                setError('Mật khẩu không đúng');
                return;
            }
            localStorage.setItem('currentUser', username);
            onLogin(username);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-xl border border-slate-200 w-full max-w-md animate-fade-in">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">
                    {isRegistering ? 'Đăng Ký' : 'Đăng Nhập'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2">Tên đăng nhập</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center font-medium">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        {isRegistering ? 'Đăng Ký' : 'Đăng Nhập'}
                    </button>
                </form>

                <div className="mt-6 text-center text-slate-600">
                    <p>
                        {isRegistering ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}
                        <button
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError('');
                                setUsername('');
                                setPassword('');
                            }}
                            className="ml-2 text-cyan-600 font-bold hover:underline"
                        >
                            {isRegistering ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
