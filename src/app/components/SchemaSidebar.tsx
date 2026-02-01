import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import type { NodeData } from './types';

interface SchemaSidebarProps {
  nodes: NodeData[];
  onNodeSelect: (node: NodeData) => void;
  hoveredNodeId: string | null;
  onHover: (nodeId: string | null) => void;
  selectedNodeId: string | null;
  onLogout: () => void;
  onCloseInspector?: () => void;
}

export function SchemaSidebar({ nodes, onNodeSelect, hoveredNodeId, onHover, selectedNodeId, onLogout, onCloseInspector }: SchemaSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const customOrder = [
    'system_guide',
    'about',
    'education',
    'research_analysis',
    'toolkit',
    'personal_projects',
    'work_experience',
    'advocacy',
    'volunteering',
    'certification',
    'contact'
  ];

  const sortedNodes = [...nodes].sort((a, b) => {
    const indexA = customOrder.indexOf(a.title);
    const indexB = customOrder.indexOf(b.title);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const handleNodeClick = (node: NodeData) => {
    onNodeSelect(node);
  };

  const exitButtonStyle = {
    backgroundColor: 'var(--surface-2)',
    border: '1px solid var(--border-1)',
    color: 'var(--ink-1)',
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '1px',
  } as const;

  return (
    <>
      <div
        className={`sidebar-overlay ${isMobileMenuOpen ? 'visible' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <button
        onClick={onLogout}
        className="mobile-exit-button md:hidden"
        style={exitButtonStyle}
      >
        EXIT
      </button>

      <div
        className="mobile-header-instructions md:hidden"
        style={{
          position: 'fixed',
          top: '12px',
          left: '72px',
          right: '72px',
          height: '48px',
          display: isMobileMenuOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--ink-muted)',
          textAlign: 'center',
          zIndex: 49,
          pointerEvents: 'none',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
        }}
      >
        Tap a table to inspect • Use exit to leave
      </div>

      <button
        onClick={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen);
          if (!isMobileMenuOpen && onCloseInspector) {
            onCloseInspector();
          }
        }}
        className={`mobile-hamburger-button md:hidden ${isMobileMenuOpen ? 'hidden' : ''}`}
        style={{
          backgroundColor: 'var(--surface-2)',
          border: '1px solid var(--border-1)',
          cursor: 'pointer',
        }}
      >
        <Menu size={22} style={{ color: 'var(--ink-1)' }} />
      </button>

      <div
        className="hidden md:flex"
        style={{
          position: 'fixed',
          top: 0,
          left: '200px',
          right: 0,
          height: '52px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
          zIndex: 25,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--ink-muted)',
            textAlign: 'center',
            maxWidth: 'calc(100% - 220px)',
            letterSpacing: '0.9px',
            textTransform: 'uppercase',
          }}
        >
          Select a table to inspect • Drag cards to rearrange
        </div>

        <button
          onClick={onLogout}
          style={{
            position: 'absolute',
            right: '20px',
            width: '96px',
            height: '32px',
            borderRadius: '999px',
            transition: 'background-color 0.15s ease',
            ...exitButtonStyle,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--surface-3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--surface-2)';
          }}
        >
          EXIT
        </button>
      </div>

      <div
        className={`schema-sidebar fixed left-0 top-0 h-full flex flex-col transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'open' : ''}`}
        style={{
          width: '200px',
          backgroundColor: 'var(--surface-1)',
          borderRight: '1px solid var(--border-1)',
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          zIndex: 30,
        }}
      >
        <div
          className="px-3 py-3 border-b flex items-center justify-between"
          style={{
            borderColor: 'var(--border-1)',
            fontWeight: 600,
            letterSpacing: '1.2px',
            color: 'var(--ink-1)',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span>System Atlas</span>

          <motion.button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden flex items-center justify-center"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--border-1)',
              cursor: 'pointer',
            }}
            whileHover={{
              backgroundColor: 'var(--surface-3)',
            }}
            transition={{ duration: 0.14 }}
          >
            <X size={18} color="var(--ink-1)" strokeWidth={2} />
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto" style={{ padding: '12px 0' }}>
          {sortedNodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;

            return (
              <div
                key={node.id}
                onClick={() => {
                  handleNodeClick(node);

                  if (window.innerWidth <= 480) {
                    setIsMobileMenuOpen(false);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
                onMouseEnter={() => onHover(node.id)}
                onMouseLeave={() => onHover(null)}
                className="sidebar-table-item px-3 py-2 cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: isSelected ? 'var(--surface-3)' : isHovered ? 'var(--surface-2)' : 'transparent',
                  transition: 'background-color 0.15s ease',
                  margin: '0 10px 6px',
                  borderRadius: '10px',
                  border: isSelected ? '1px solid var(--border-1)' : '1px solid transparent',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: node.color,
                    boxShadow: `0 0 8px ${node.color}55`,
                    flexShrink: 0,
                  }}
                />

                <span
                  className="truncate"
                  style={{
                    color: 'var(--ink-1)',
                    lineHeight: '1.4',
                    fontSize: '12px',
                  }}
                >
                  {node.title}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className="px-3 py-3 border-t"
          style={{
            borderColor: 'var(--border-1)',
            fontSize: '10px',
            color: 'var(--ink-muted)',
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
          }}
        >
          © E. Deborah Imafidon
        </div>
      </div>
    </>
  );
}
