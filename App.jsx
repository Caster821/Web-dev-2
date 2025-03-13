import React, { useState } from 'react';

const UserAuth = () => {
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: registerName, email: registerEmail, password: registerPassword })
        });

        const data = await response.json();
        setMessage(data.message || 'Registration successful!');
        setMessageType(data.success ? 'success' : 'error');
        resetRegisterForm();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loginEmail, password: loginPassword })
        });

        const data = await response.json();
        setMessage(data.message || 'Login successful!');
        setMessageType(data.success ? 'success' : 'error');
        resetLoginForm();
    };

    const resetRegisterForm = () => {
        setRegisterName('');
        setRegisterEmail('');
        setRegisterPassword('');
    };

    const resetLoginForm = () => {
        setLoginEmail('');
        setLoginPassword('');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>User  Registration and Login</h1>
            <div style={styles.formContainer}>
                <form onSubmit={handleRegister} style={styles.form}>
                    <h2>Register</h2>
                    <input type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} placeholder="Name" required style={styles.input} />
                    <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} placeholder="Email" required style={styles.input} />
                    <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} placeholder="Password" required style={styles.input} />
                    <button type="submit" style={styles.button}>Register</button>
                </form>

                <form onSubmit={handleLogin} style={styles.form}>
                    <h2>Login</h2>
                    <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" required style={styles.input} />
                    <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" required style={styles.input} />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>

            {message && (
                <div style={{ ...styles.message, color: messageType === 'success' ? 'chartreuse' : '#ff4500' }}>
                    {message}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f8ff',
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
    },
    title: {
        color: '#007ba7',
        textAlign: 'center',
        marginBottom: '20px',
    },
    formContainer: {
        backgroundColor: '#e0f7fa',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '600px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    form: {
        width: '48%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #007ba7',
        borderRadius: '4px',
    },
    button: {
        backgroundColor: '#007ba7',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    message: {
        marginTop: '20px',
        textAlign: 'center',
        width: '100%',
    },
};

export default UserAuth;