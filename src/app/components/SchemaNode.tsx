import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import type { NodeData, Position } from './types';
import { connections as allConnections } from './data';
import { desaturateColor, brightenColor } from './colorUtils';

interface SchemaNodeProps {
  node: NodeData;
  onDragStart: (nodeId: string) => void;
  onDrag: (nodeId: string, position: Position) => void;
  onDragEnd: () => void;
  onClick: (node: NodeData) => void;
  isDragging: boolean;
  isFocused: boolean;
  isConnected: boolean;
  isOtherFocused: boolean;
  inputNodes: NodeData[];
  outputNodes: NodeData[];
  sidebarHoveredNodeId: string | null;
}

export function SchemaNode({ 
  node, 
  onDragStart, 
  onDrag, 
  onDragEnd, 
  onClick,
  isDragging,
  isFocused,
  isConnected,
  isOtherFocused,
  inputNodes,
  outputNodes,
  sidebarHoveredNodeId,
}: SchemaNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // Determine if this node should show pulse animation
  // Disable all hover effects when inspector is open (any node selected), except on the selected node itself
  const isInspectorOpen = isFocused || isOtherFocused;
  const isPulsing = (isHovered || sidebarHoveredNodeId === node.id) && !isInspectorOpen;

  // Handle animation state with delayed fade-out
  useEffect(() => {
    if (isPulsing) {
      setShouldAnimate(true);
    } else {
      // Delay turning off animation for smooth fade-out
      const timeout = setTimeout(() => {
        setShouldAnimate(false);
      }, 1500); // Match the animation duration
      return () => clearTimeout(timeout);
    }
  }, [isPulsing]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isFocused) return; // Don't allow dragging when focused
    
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      onDragStart(node.id);
    }
  }, [node.id, onDragStart, isFocused]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && nodeRef.current) {
      const parentRect = nodeRef.current.parentElement?.getBoundingClientRect();
      if (parentRect) {
        const newX = e.clientX - parentRect.left - offset.x;
        const newY = e.clientY - parentRect.top - offset.y;
        onDrag(node.id, { x: newX, y: newY });
        setHasMoved(true);
      }
    }
  }, [isDragging, node.id, onDrag, offset]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      onDragEnd();
      // Reset hasMoved flag after a short delay to allow click event to check it
      setTimeout(() => setHasMoved(false), 100);
    }
  }, [isDragging, onDragEnd]);

  // Attach global mouse listeners when dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClick = () => {
    // Only trigger onClick if node wasn't dragged
    if (!hasMoved) {
      onClick(node);
    }
  };

  // Keep nodes at full opacity - backgrounds stay opaque to block content behind
  const opacity = 1;
  
  // Dim text colors instead for non-selected nodes
  const textOpacity = isOtherFocused ? 0.5 : 1;
  
  // Desaturate color for retro SQL look (no longer used for header)
  const desaturatedColor = desaturateColor(node.color, 15);
  
  // Use original node color for glow effect
  const glowColor = node.color;

  // Header and node colors tied to the redesign palette
  const nodeBgColor = 'var(--surface-1)';
  const headerBgColor = 'var(--surface-2)';
  const nodeBorderColor = 'var(--border-1)';
  const headerBorderBottom = 'var(--border-1)';
  const headerBorderTop = 'var(--border-2)';
  const fieldBorderColor = 'var(--border-2)';
  const textColor = 'var(--ink-1)';
  const fieldTextColor = 'var(--ink-2)';
  
  // Dimmed opacity for non-selected nodes
  const nodeOpacity = isOtherFocused ? 0.65 : 1;

  return (
    <div
      ref={nodeRef}
      id={`node-${node.id}`}
      data-node-id={node.id}
      className="schema-node"
      style={{
        position: 'absolute',
        left: `${node.x}px`,
        top: `${node.y}px`,
        cursor: isFocused ? 'default' : 'grab',
        zIndex: (isDragging || isFocused) ? 10 : isHovered ? 5 : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selected Node Glow Ring - OUTSIDE the node */}
      {isFocused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '12px',
            pointerEvents: 'none',
            zIndex: -1,
            boxShadow: `0 0 18px ${node.color}55`,
          }}
        />
      )}

      {/* Tech pulse effect on hover - enhanced glow - OUTSIDE the node */}
      {isPulsing && (
        <div
          style={{
            position: 'absolute',
            top: -4,
            left: -4,
            right: -4,
            bottom: -4,
            borderRadius: '12px',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          {/* SVG for flowing circuit trace */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            {/* Base solid trace - always visible */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke={glowColor}
              strokeWidth="2.5"
              rx="5"
              style={{
                opacity: 0.75,
                filter: `drop-shadow(0 0 6px ${glowColor})`,
              }}
            />
            
            {/* Traveling intense pulse - wider stroke, much longer */}
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke={glowColor}
              strokeWidth="5"
              rx="5"
              strokeDasharray="250 1000"
              style={{
                filter: `drop-shadow(0 0 16px ${glowColor}) drop-shadow(0 0 8px ${glowColor})`,
                opacity: 1,
              }}
              animate={{
                strokeDashoffset: [-1250, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Secondary pulse trail for gradient effect */}
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke={glowColor}
              strokeWidth="4"
              rx="5"
              strokeDasharray="180 1070"
              style={{
                opacity: 0.8,
                filter: `drop-shadow(0 0 6px ${glowColor})`,
              }}
              animate={{
                strokeDashoffset: [-1250, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.08
              }}
            />
            
            {/* Third trailing pulse for smooth gradient */}
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="none"
              stroke={glowColor}
              strokeWidth="3"
              rx="5"
              strokeDasharray="120 1130"
              style={{
                opacity: 0.6,
              }}
              animate={{
                strokeDashoffset: [-1250, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.15
              }}
            />
          </svg>
          
          {/* Corner nodes that light up as trace passes */}
          <motion.div 
            style={{
              position: 'absolute',
              top: -1,
              left: -1,
              width: '5px',
              height: '5px',
              backgroundColor: glowColor,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${glowColor}`,
            }}
            animate={{
              opacity: [0.4, 1, 0.4, 0.4, 0.4],
              scale: [1, 1.5, 1, 1, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.05, 0.1, 0.15, 1]
            }}
          />
          <motion.div 
            style={{
              position: 'absolute',
              top: -1,
              right: -1,
              width: '5px',
              height: '5px',
              backgroundColor: glowColor,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${glowColor}`,
            }}
            animate={{
              opacity: [0.4, 0.4, 1, 0.4, 0.4],
              scale: [1, 1, 1.5, 1, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.3, 0.35, 1]
            }}
          />
          <motion.div 
            style={{
              position: 'absolute',
              bottom: -1,
              right: -1,
              width: '5px',
              height: '5px',
              backgroundColor: glowColor,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${glowColor}`,
            }}
            animate={{
              opacity: [0.4, 0.4, 0.4, 1, 0.4],
              scale: [1, 1, 1, 1.5, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.45, 0.5, 0.6, 1]
            }}
          />
          <motion.div 
            style={{
              position: 'absolute',
              bottom: -1,
              left: -1,
              width: '5px',
              height: '5px',
              backgroundColor: glowColor,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${glowColor}`,
            }}
            animate={{
              opacity: [0.4, 0.4, 0.4, 0.4, 1, 0.4],
              scale: [1, 1, 1, 1, 1.5, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.7, 0.75, 0.8, 0.9, 1]
            }}
          />
        </div>
      )}

      {/* Compact schema view only - v2.0 */}
      <motion.div 
        onClick={handleClick}
        style={{ 
          position: 'relative',
          backgroundColor: nodeBgColor,
          minWidth: node.width ? `${node.width}px` : '176px',
          borderRadius: '12px',
          overflow: 'visible',
          boxShadow: (isFocused && !isDragging)
            ? `0 18px 30px var(--shadow-color), 0 0 18px ${glowColor}40`
            : '0 10px 22px var(--shadow-color)',
          border: `1px solid ${nodeBorderColor}`,
          zIndex: 2,
        }}
        animate={isPulsing ? {
          scale: [1.0, 1.02, 1.0],
        } : isFocused ? {
          scale: 1.015,  // Subtle 1.5% scale-up when selected
        } : {
          scale: 1.0,
        }}
        transition={isPulsing ? {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        } : {
          duration: 0.095  // 95ms for selection scale
        }}
      >
        {/* SQL Server 2005 style header - unified color */}
        <div 
          className="schema-node-header"
          style={{ 
            position: 'relative',
            backgroundColor: headerBgColor,
            borderTop: `1px solid ${headerBorderTop}`,
            borderBottom: `1px solid ${headerBorderBottom}`,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '14px',
            paddingRight: '14px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <div 
            style={{ 
              color: textColor,
              fontSize: '13px',
              fontWeight: isFocused ? 700 : 600,
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              opacity: textOpacity,
              fontFamily: 'var(--font-display)',
            }}
          >
            {node.title}
          </div>
          
          {/* Color indicator dot with pulse on hover */}
          <motion.div 
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '12px',
              height: '12px',
              backgroundColor: node.color,
              border: '1px solid var(--border-1)',
              boxShadow: `0 0 10px ${node.color}55`,
              borderRadius: '999px',
            }}
            animate={isPulsing ? {
              opacity: [1, 0.6, 1],
            } : {
              opacity: 1,
            }}
            transition={isPulsing ? {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            } : {
              duration: 0.2
            }}
          />
        </div>
        
        {/* Table body - field rows */}
        {node.fields && node.fields.length > 0 && (
          <div style={{ backgroundColor: nodeBgColor }}>
            {node.fields.slice(0, 8).map((field, idx) => (
              <div 
                key={idx}
                className="schema-node-row"
                style={{
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  paddingLeft: '14px',
                  paddingRight: '14px',
                  borderBottom: idx < node.fields.length - 1 && idx < 7 ? `1px solid ${fieldBorderColor}` : 'none',
                }}
              >
                <div 
                  style={{
                    fontSize: '12px',
                    color: fieldTextColor,
                    lineHeight: '1.4',
                    opacity: textOpacity,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {field}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}