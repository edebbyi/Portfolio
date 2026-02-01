import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { SchemaNode } from './SchemaNode';
import { Connectors } from './Connectors';
import { SchemaSidebar } from './SchemaSidebar';
import type { NodeData, Position } from './types';
import { nodeData, connections } from './data';

interface SchemaViewProps {
  onNodeClick: (node: NodeData) => void;
  selectedNode: NodeData | null;
  onClose: () => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
}

export function SchemaView({ onNodeClick, selectedNode, onClose, onLogout, theme }: SchemaViewProps) {
  const [nodes, setNodes] = useState<NodeData[]>(nodeData);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [sidebarHoveredNodeId, setSidebarHoveredNodeId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate responsive scale based on container size
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const availableWidth = container.clientWidth;
        const availableHeight = container.clientHeight;
        
        // Detect if we're on desktop/laptop (>1024px)
        const desktop = availableWidth > 1024;
        setIsDesktop(desktop);
        
        // Base dimensions - adjust for desktop vs tablet/mobile
        const baseWidth = desktop ? 1100 : 900;
        const baseHeight = desktop ? 720 : 850;  // Slightly taller base height for tablet to fit all nodes
        
        // Calculate scale to fit both width and height
        const scaleX = availableWidth / baseWidth;
        const scaleY = availableHeight / baseHeight;
        
        // Use the smaller scale to ensure everything fits
        const newScale = Math.min(scaleX, scaleY, 1); // Cap at 1 (100%) max
        
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Update node positions based on available width
  useEffect(() => {
    const updateNodePositions = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const availableWidth = container.clientWidth;
        
        // Only apply dynamic spacing on desktop/laptop
        if (availableWidth > 1024) {
          // Base positions for compact laptop layout
          const basePositions = [80, 320, 560];
          
          // Calculate extra spacing based on available width
          // Start spreading at 1280px, add 40px per column for every 200px of extra width
          const minWidth = 1280;
          const extraWidth = Math.max(0, availableWidth - minWidth);
          const spacingMultiplier = extraWidth / 200;
          const additionalSpacing = spacingMultiplier * 40;
          
          // Map original x positions to new positions
          const positionMap: { [key: number]: number } = {
            80: 80, // First column stays at 80
            320: 320 + additionalSpacing, // Second column spreads right
            560: 560 + (additionalSpacing * 2), // Third column spreads even more right
          };
          
          setNodes(prevNodes =>
            prevNodes.map(node => ({
              ...node,
              x: positionMap[nodeData.find(n => n.id === node.id)?.x || node.x] || node.x
            }))
          );
        } else {
          // Reset to original positions for smaller screens
          setNodes(nodeData);
        }
      }
    };

    updateNodePositions();
    window.addEventListener('resize', updateNodePositions);
    return () => window.removeEventListener('resize', updateNodePositions);
  }, []);

  const handleDragStart = useCallback((nodeId: string) => {
    setDraggedNode(nodeId);
  }, []);

  const handleDrag = useCallback((nodeId: string, position: Position) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === nodeId 
          ? { ...node, x: position.x, y: position.y }
          : node
      )
    );
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedNode(null);
  }, []);

  // Get connected nodes for display
  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    
    const connected = new Set<string>();
    connections.forEach(conn => {
      if (conn.from === selectedNode.id) connected.add(conn.to);
      if (conn.to === selectedNode.id) connected.add(conn.from);
    });
    return connected;
  }, [selectedNode]);

  // Get input and output nodes
  const { inputNodes, outputNodes } = useMemo(() => {
    if (!selectedNode) return { inputNodes: [], outputNodes: [] };
    
    const inputs = nodes.filter(n => 
      connections.some(conn => conn.from === n.id && conn.to === selectedNode.id)
    );
    const outputs = nodes.filter(n => 
      connections.some(conn => conn.from === selectedNode.id && conn.to === n.id)
    );
    
    return { inputNodes: inputs, outputNodes: outputs };
  }, [selectedNode, nodes]);

  return (
    <div 
      className="relative w-full h-full schema-view-container" 
      ref={containerRef}
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 'clamp(15px, 1.5vh, 40px)',
        overflow: 'hidden',
      }}
    >
      {/* Schema Sidebar - always visible */}
      <SchemaSidebar 
        nodes={nodes} 
        onNodeSelect={onNodeClick} 
        hoveredNodeId={sidebarHoveredNodeId}
        onHover={setSidebarHoveredNodeId}
        selectedNodeId={selectedNode?.id || null}
        theme={theme}
        onLogout={onLogout}
        onCloseInspector={onClose}
      />
      
      {/* Desktop: scaled canvas | Mobile: natural stacked layout */}
      <div
        className="relative desktop-canvas-wrapper"
        style={{ 
          width: isDesktop ? '1100px' : '900px',
          height: isDesktop ? '720px' : '840px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {/* SVG layer for grid and connectors - z-index 0 */}
        <svg 
          className="schema-grid connectors-container absolute inset-0 pointer-events-none" 
          style={{ 
            width: isDesktop ? '1100px' : '900px',
            height: isDesktop ? '720px' : '840px',
            zIndex: 0,
            opacity: selectedNode ? 0.5 : 1  // Dim grid and connectors to 50% when node selected
          }}
        >
          {/* Grid pattern - retro SQL ER-diagram style */}
          <defs>
            <pattern id="erdGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke={theme === 'dark' ? 'rgba(255,255,255,0.02)' : '#D8D2C8'}
                strokeWidth="1"
                opacity={theme === 'dark' ? '1' : '0.25'}
              />
            </pattern>
          </defs>
          
          {/* Apply grid to background */}
          <rect width="1440" height="900" fill="url(#erdGrid)" />
          
          <Connectors 
            nodes={nodes} 
            connections={connections} 
            selectedNodeId={selectedNode?.id || null}
            connectedNodeIds={connectedNodeIds}
            theme={theme}
          />
        </svg>

        {/* Nodes layer - rendered above SVG with relative positioning */}
        <div className="schema-nodes-container absolute inset-0" style={{ zIndex: 1 }}>
          {nodes.map((node) => (
            <SchemaNode
              key={node.id}
              node={node}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onClick={onNodeClick}
              isDragging={draggedNode === node.id}
              isFocused={selectedNode?.id === node.id}
              isConnected={connectedNodeIds.has(node.id)}
              isOtherFocused={selectedNode !== null && selectedNode.id !== node.id}
              inputNodes={selectedNode?.id === node.id ? inputNodes : []}
              outputNodes={selectedNode?.id === node.id ? outputNodes : []}
              sidebarHoveredNodeId={sidebarHoveredNodeId}
              theme={theme}
            />
          ))}
          
          {/* Mobile notice for hidden connectors */}
          <div 
            className="mobile-connector-notice"
            style={{ 
              display: 'none',
              color: theme === 'dark' ? '#8B949E' : '#999',
              fontFamily: 'Consolas, Monaco, Menlo, monospace',
              fontSize: '11px',
              opacity: 0.5,
            }}
          >
            Connections hidden on mobile for readability
          </div>
        </div>
      </div>
    </div>
  );
}