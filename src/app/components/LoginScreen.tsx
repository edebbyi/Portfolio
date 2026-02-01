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
  const isDark = theme === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnter();
  };

  const handleEnterClick = () => {
    onEnter();
  };

  return (
    <div
      className="login-shell"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vw, 48px)',
        fontFamily: 'var(--font-body)',
        color: 'var(--ink-1)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        className="login-layout"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          width: '100%',
          maxWidth: '980px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: 'clamp(20px, 4vw, 48px)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              letterSpacing: '1.6px',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-2)',
                boxShadow: '0 0 12px rgba(47, 143, 131, 0.35)',
              }}
            />
            Studio Portal
          </div>
          <h1
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Deborah Imafidon
          </h1>
          <p
            style={{
              fontSize: 'clamp(14px, 1.6vw, 18px)',
              color: 'var(--ink-2)',
              margin: 0,
              maxWidth: '480px',
            }}
          >
            Data, automation, and research systems built for clarity, momentum, and human context.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Research Analytics', 'Product Automation', 'Civic & Health Tech'].map((label) => (
              <span
                key={label}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  border: '1px solid var(--border-1)',
                  backgroundColor: 'var(--surface-2)',
                  fontSize: '12px',
                  letterSpacing: '0.3px',
                  color: 'var(--ink-2)',
                }}
              >
                {label}
              </span>
            ))}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
            }}
          >
            {[
              { label: 'Focus', value: 'Trustworthy data products' },
              { label: 'Approach', value: 'Methodical + collaborative' },
              { label: 'Current', value: 'Founding Product AI Engineer' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-2)',
                  backgroundColor: 'var(--surface-1)',
                  boxShadow: '0 12px 30px var(--shadow-color)',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--ink-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: '13px', marginTop: '6px', color: 'var(--ink-1)' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            width: '100%',
            backgroundColor: 'var(--surface-1)',
            border: '1px solid var(--border-1)',
            borderRadius: '18px',
            padding: 'clamp(24px, 4vw, 36px)',
            boxShadow: '0 18px 50px var(--shadow-color)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, var(--accent-2), var(--accent-1), var(--accent-3))',
              borderTopLeftRadius: '18px',
              borderTopRightRadius: '18px',
            }}
          />
          <div
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: 'var(--ink-muted)',
              marginBottom: '24px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Workspace Access
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: 'var(--ink-2)',
                  marginBottom: '8px',
                  letterSpacing: '0.4px',
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--border-1)',
                  borderRadius: '10px',
                  color: 'var(--ink-1)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-2)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(47, 143, 131, 0.18)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: 'var(--ink-2)',
                  marginBottom: '8px',
                  letterSpacing: '0.4px',
                }}
              >
                Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--border-1)',
                  borderRadius: '10px',
                  color: 'var(--ink-1)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-1)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(240, 122, 74, 0.18)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleEnterClick}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'var(--ink-1)',
                  border: 'none',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isDark ? '#0b1514' : '#fdf8f1',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 10px 24px var(--shadow-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Enter Workspace
              </button>

              <div
                className="theme-toggle"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11px',
                  color: 'var(--ink-muted)',
                }}
              >
                <Sun size={14} style={{ opacity: 0.8 }} />
                <button
                  type="button"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-1)',
                    borderRadius: '999px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: theme === 'light' ? 'var(--accent-2)' : 'transparent',
                      border: `2px solid ${theme === 'light' ? 'var(--accent-2)' : 'var(--border-1)'}`,
                      transition: 'all 0.2s ease',
                    }}
                  />
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: theme === 'dark' ? 'var(--accent-1)' : 'transparent',
                      border: `2px solid ${theme === 'dark' ? 'var(--accent-1)' : 'var(--border-1)'}`,
                      transition: 'all 0.2s ease',
                    }}
                  />
                </button>
                <Moon size={14} style={{ opacity: 0.8 }} />
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="login-footer"
        style={{
          marginTop: '24px',
          fontSize: '11px',
          color: 'var(--ink-muted)',
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.4px',
        }}
      >
        © E. Deborah Imafidon • Data & AI Product Professional
      </motion.div>
    </div>
  );
}
