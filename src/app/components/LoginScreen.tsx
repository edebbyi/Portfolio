import { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface LoginScreenProps {
  onEnter: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export function LoginScreen({ onEnter, theme, setTheme }: LoginScreenProps) {
  const [username, setUsername] = useState('visitor');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnter();
  };

  const handleEnterClick = () => {
    onEnter();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme === 'dark' ? '#0F1419' : '#FAF7F2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Consolas, Monaco, Menlo, monospace',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Background grid pattern - matching schema view */}
      <svg 
        className="login-grid"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 1,
        }}
      >
        <defs>
          <pattern id="loginGrid" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="none" />
            <rect width="1" height="1" fill={theme === 'dark' ? '#2A3441' : '#D8D2C8'} opacity={theme === 'dark' ? '0.05' : '0.02'} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#loginGrid)" />
      </svg>

      {/* Title above card */}
      <motion.div
        className="login-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontSize: '14px',
          color: theme === 'dark' ? '#C9D1D9' : '#1C1F23',
          opacity: 0.85,
          letterSpacing: '0.3px',
          marginBottom: '28px',
          fontFamily: 'Consolas, Monaco, Menlo, monospace',
          padding: '0 20px',
          textAlign: 'center',
        }}
      >
        Deborah's Workspace v1.0
      </motion.div>

      {/* Login card - matching inspector panel style */}
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          width: '100%',
          maxWidth: '420px',
          margin: '0 20px',
          backgroundColor: theme === 'dark' ? '#1C2128' : '#F9FAFC',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '6px',
          padding: 'clamp(24px, 5vw, 36px) clamp(20px, 5vw, 40px)',
          boxShadow: theme === 'dark' 
            ? '0 4px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)' 
            : '0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          transition: 'background-color 0.3s ease, border 0.3s ease',
        }}
      >
        {/* Colored top border accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #63D18A 0%, #8BB8FF 50%, #FFBA63 100%)',
          }}
        />

        {/* Header */}
        <div
          style={{
            fontSize: '11px',
            color: theme === 'dark' ? '#C9D1D9' : '#1C1F23',
            opacity: 0.65,
            letterSpacing: '1px',
            marginBottom: '24px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          SYSTEM ACCESS PORTAL
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                color: theme === 'dark' ? '#C9D1D9' : '#1C1F23',
                opacity: 0.7,
                marginBottom: '6px',
                letterSpacing: '0.3px',
              }}
            >
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                backgroundColor: theme === 'dark' ? '#0D1117' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: '4px',
                color: theme === 'dark' ? '#C9D1D9' : '#1C1F23',
                fontSize: '13px',
                fontFamily: 'Consolas, Monaco, Menlo, monospace',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(99, 209, 138, 0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(99, 209, 138, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password field */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                color: theme === 'dark' ? '#C9D1D9' : '#1C1F23',
                opacity: 0.7,
                marginBottom: '6px',
                letterSpacing: '0.3px',
              }}
            >
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '10px 12px',
                backgroundColor: theme === 'dark' ? '#0D1117' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: '4px',
                color: theme === 'dark' ? '#C9D1D9' : '#1C1F23',
                fontSize: '13px',
                fontFamily: 'Consolas, Monaco, Menlo, monospace',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.3s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(99, 209, 138, 0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(99, 209, 138, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Enter button - matching EXIT button style */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={handleEnterClick}
              style={{
                width: '140px',
                height: '36px',
                backgroundColor: theme === 'dark' ? '#2D3748' : '#e1e7ef',
                border: theme === 'dark' ? '1px solid #4A5568' : '1px solid #9aa4b2',
                borderRadius: '4px',
                fontFamily: 'Consolas, Monaco, Menlo, monospace',
                fontSize: '11px',
                fontWeight: 500,
                color: theme === 'dark' ? '#E2E8F0' : '#1a1a1a',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme === 'dark' ? '#3A4556' : '#cfd8e3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2D3748' : '#e1e7ef';
              }}
            >
              ENTER
            </button>
          </div>

          {/* Theme toggle - matching colored tag squares on schema nodes */}
          <div 
            className="theme-toggle"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '100%',
              gap: '8px',
              fontSize: '10px',
              color: theme === 'dark' ? '#C9D1D9' : '#1C1F23',
              opacity: 0.6,
            }}
          >
            <Sun size={14} style={{ opacity: 0.7 }} />
            <button
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: theme === 'light' ? '#63D18A' : 'transparent',
                border: `2px solid ${theme === 'light' ? '#63D18A' : (theme === 'dark' ? '#4A5568' : '#D8D2C8')}`,
                transition: 'all 0.2s ease',
              }} />
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#58A6FF' : 'transparent',
                border: `2px solid ${theme === 'dark' ? '#58A6FF' : (theme === 'dark' ? '#4A5568' : '#D8D2C8')}`,
                transition: 'all 0.2s ease',
              }} />
            </button>
            <Moon size={14} style={{ opacity: 0.7 }} />
          </div>
        </form>
      </motion.div>

      {/* Footer attribution */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="login-footer"
        style={{
          marginTop: '32px',
          fontSize: '11px',
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)',
          textAlign: 'center',
          fontFamily: 'Consolas, Monaco, Menlo, monospace',
        }}
      >
        © E. Deborah Imafidon • Data & AI Product Professional
      </motion.div>
    </div>
  );
}