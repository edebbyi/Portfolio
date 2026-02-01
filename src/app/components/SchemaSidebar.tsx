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
  theme: 'light' | 'dark';
  onLogout: () => void;
  onCloseInspector?: () => void;
}

export function SchemaSidebar({ nodes, onNodeSelect, hoveredNodeId, onHover, selectedNodeId, theme, onLogout, onCloseInspector }: SchemaSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Custom order for the sidebar navigation
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

  // Sort nodes by custom order
  const sortedNodes = [...nodes].sort((a, b) => {
    const indexA = customOrder.indexOf(a.title);
    const indexB = customOrder.indexOf(b.title);
    // If not found in custom order, push to end
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Re-enabled for inspector panel
  const handleNodeClick = (node: NodeData) => {
    onNodeSelect(node);
  };

  return (
    <>
      {/* Mobile overlay behind sidebar drawer */}
      <div
        className={`sidebar-overlay ${isMobileMenuOpen ? 'visible' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile EXIT button - Only visible on small screens, positioned in top-right */}
      <button
        onClick={onLogout}
        className="mobile-exit-button md:hidden"
        style={{
          backgroundColor: theme === 'dark' ? '#2D3748' : '#e1e7ef',
          border: theme === 'dark' ? '1px solid #4A5568' : '1px solid #9aa4b2',
          color: theme === 'dark' ? '#E2E8F0' : '#1a1a1a',
          cursor: 'pointer',
          fontFamily: 'Consolas, Monaco, Menlo, monospace',
          fontSize: '11px',
          fontWeight: 500,
        }}
      >
        EXIT
      </button>

      {/* Mobile header instructions - centered between hamburger and exit */}
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
          fontFamily: 'Consolas, Monaco, Menlo, monospace',
          fontSize: '9px',
          color: theme === 'dark' ? '#8B949E' : '#999',
          opacity: 0.6,
          textAlign: 'center',
          zIndex: 49,
          pointerEvents: 'none',
        }}
      >
        Click any table to inspect • Press EXIT to leave system
      </div>

      {/* Mobile Menu Toggle Button - Only visible on small screens */}
      <button
        onClick={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen);
          // Close inspector when opening mobile menu
          if (!isMobileMenuOpen && onCloseInspector) {
            onCloseInspector();
          }
        }}
        className={`mobile-hamburger-button md:hidden ${isMobileMenuOpen ? 'hidden' : ''}`}
        style={{
          backgroundColor: theme === 'dark' ? '#2D3748' : '#e1e7ef',
          border: theme === 'dark' ? '1px solid #4A5568' : '1px solid #9aa4b2',
          cursor: 'pointer',
        }}
      >
        <Menu size={24} style={{ color: theme === 'dark' ? '#E2E8F0' : '#1a1a1a' }} />
      </button>

      {/* Top Header Bar with Instructions and EXIT - Desktop only */}
      <div
        className="hidden md:flex"
        style={{
          position: 'fixed',
          top: 0,
          left: '180px',
          right: 0,
          height: '48px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
          zIndex: 25,
        }}
      >
        {/* Instructions - absolutely centered */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'Consolas, Monaco, Menlo, monospace',
            fontSize: '11px',
            color: theme === 'dark' ? '#8B949E' : '#999',
            opacity: 0.5,
            textAlign: 'center',
            maxWidth: 'calc(100% - 200px)',
            lineHeight: '1.3',
          }}
        >
          Click any table to inspect • Press EXIT to leave system
        </div>

        {/* EXIT button - positioned absolute right */}
        <button
          onClick={onLogout}
          style={{
            position: 'absolute',
            right: '20px',
            width: '90px',
            height: '28px',
            backgroundColor: theme === 'dark' ? '#2D3748' : '#e1e7ef',
            border: theme === 'dark' ? '1px solid #4A5568' : '1px solid #9aa4b2',
            borderRadius: '4px',
            fontFamily: 'Consolas, Monaco, Menlo, monospace',
            fontSize: '11px',
            fontWeight: 500,
            color: theme === 'dark' ? '#E2E8F0' : '#1a1a1a',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme === 'dark' ? '#3A4556' : '#cfd8e3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2D3748' : '#e1e7ef';
          }}
        >
          EXIT
        </button>
      </div>

      {/* Sidebar - responsive */}
      <div 
        className={`schema-sidebar fixed left-0 top-0 h-full flex flex-col transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'open' : ''}`}
        style={{
          width: '180px',
          backgroundColor: theme === 'dark' ? '#1C2128' : '#F2F2F2',
          borderRight: theme === 'dark' ? '1px solid #30363D' : '1px solid #D1D1D1',
          fontFamily: 'IBM Plex Mono, Courier New, monospace',
          fontSize: '11px',
          zIndex: 30,
        }}
      >
        {/* Header with close button (mobile only) */}
        <div 
          className="px-3 py-3 border-b flex items-center justify-between"
          style={{
            borderColor: theme === 'dark' ? '#30363D' : '#D1D1D1',
            fontWeight: 600,
            letterSpacing: '0.5px',
            color: theme === 'dark' ? '#C9D1D9' : '#333',
          }}
        >
          <span>NAVIGATION</span>
          
          {/* Close button - mobile only */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden flex items-center justify-center"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              backgroundColor: theme === 'dark' ? '#1D232A' : '#E3E7EE',
              border: `1px solid ${theme === 'dark' ? '#4A5568' : '#C5CCD8'}`,
              cursor: 'pointer',
            }}
            whileHover={{ 
              backgroundColor: theme === 'dark' ? '#242B34' : '#E8ECF2'
            }}
            transition={{ duration: 0.14 }}
          >
            <X size={18} color={theme === 'dark' ? '#D9DEE7' : '#2D3440'} strokeWidth={2} />
          </motion.button>
        </div>

        {/* Node list */}
        <div className="flex-1 overflow-y-auto" style={{ padding: '8px 0' }}>
          {sortedNodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            
            return (
              <div
                key={node.id}
                onClick={() => {
                  handleNodeClick(node);
                  
                  // On mobile, scroll to the node within the correct container
                  if (window.innerWidth <= 480) {
                    setIsMobileMenuOpen(false); // Close mobile menu first
                  } else {
                    setIsMobileMenuOpen(false); // Close mobile menu on selection
                  }
                }}
                onMouseEnter={() => onHover(node.id)}
                onMouseLeave={() => onHover(null)}
                className="sidebar-table-item px-3 py-2 cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: theme === 'dark' 
                    ? (isSelected ? '#262E3C' : (isHovered ? '#2B3544' : 'transparent'))
                    : (isHovered ? '#E6F3FF' : (isSelected ? '#DCE9F7' : 'transparent')),
                  transition: 'background-color 0.15s ease',
                  marginBottom: '4px',
                }}
              >
                {/* Color square indicator */}
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: node.color,
                    flexShrink: 0,
                  }}
                />
                
                {/* Table name */}
                <span 
                  className="truncate"
                  style={{
                    color: theme === 'dark' ? '#C9D1D9' : '#333',
                    lineHeight: '1.4',
                  }}
                >
                  {node.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Copyright footer */}
        <div 
          className="px-3 py-3 border-t"
          style={{
            borderColor: theme === 'dark' ? '#30363D' : '#D1D1D1',
            fontSize: '10px',
            color: theme === 'dark' ? '#8B949E' : '#777',
            opacity: 0.6,
          }}
        >
          © E. DEBORAH IMAFIDON
        </div>
      </div>
    </>
  );
}