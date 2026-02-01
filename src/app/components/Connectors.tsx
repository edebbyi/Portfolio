import type { NodeData, Connection } from './types';

interface ConnectorsProps {
  nodes: NodeData[];
  connections: Connection[];
  selectedNodeId?: string | null;
  connectedNodeIds?: Set<string>;
}

export function Connectors({ nodes, connections, selectedNodeId, connectedNodeIds }: ConnectorsProps) {
  const getNodePosition = (nodeId: string, side: 'left' | 'right') => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };

    const nodeWidth = 140;
    const nodeHeight = 80;

    if (side === 'left') {
      return { x: node.x, y: node.y + nodeHeight / 2 };
    } else {
      return { x: node.x + nodeWidth, y: node.y + nodeHeight / 2 };
    }
  };

  const createOrthogonalPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    fromSide: 'left' | 'right',
    toSide: 'left' | 'right'
  ) => {
    const midX = (start.x + end.x) / 2;
    
    // Simple orthogonal routing - Manhattan style (straight lines only)
    if (fromSide === 'right' && toSide === 'left') {
      return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
    } else if (fromSide === 'left' && toSide === 'right') {
      return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
    } else {
      // Same side connections
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }
  };

  // Create arrowhead for the end point
  const createArrowhead = (
    end: { x: number; y: number },
    toSide: 'left' | 'right'
  ) => {
    const arrowSize = 6;
    
    if (toSide === 'left') {
      // Arrow pointing left
      return `M ${end.x} ${end.y} L ${end.x + arrowSize} ${end.y - arrowSize / 2} L ${end.x + arrowSize} ${end.y + arrowSize / 2} Z`;
    } else {
      // Arrow pointing right
      return `M ${end.x} ${end.y} L ${end.x - arrowSize} ${end.y - arrowSize / 2} L ${end.x - arrowSize} ${end.y + arrowSize / 2} Z`;
    }
  };

  return (
    <g className="connectors" style={{ zIndex: -1 }}>
      {connections.map((connection, idx) => {
        const start = getNodePosition(connection.from, connection.fromSide);
        const end = getNodePosition(connection.to, connection.toSide);
        const path = createOrthogonalPath(start, end, connection.fromSide, connection.toSide);
        const arrowPath = createArrowhead(end, connection.toSide);

        // Connector colors aligned with the redesign palette
        const lineColor = 'var(--grid-line)';
        const lineOpacity = selectedNodeId ? 0.55 : 0.75;
        const diamondColor = 'var(--ink-muted)';
        
        return (
          <g key={idx}>
            {/* Connection line */}
            <path
              d={path}
              stroke={lineColor}
              strokeWidth="1"
              strokeLinecap="square"
              fill="none"
              opacity={lineOpacity}
            />
            
            {/* Arrowhead at end */}
            <path
              d={arrowPath}
              fill={lineColor}
              opacity={lineOpacity}
            />
            
            {/* Diamond at start */}
            <path
              d={`M ${start.x} ${start.y - 4.5} L ${start.x + 4.5} ${start.y} L ${start.x} ${start.y + 4.5} L ${start.x - 4.5} ${start.y} Z`}
              fill={diamondColor}
              stroke={diamondColor}
              strokeWidth="1"
            />
            
            {/* Diamond at end */}
            <path
              d={`M ${end.x} ${end.y - 4.5} L ${end.x + 4.5} ${end.y} L ${end.x} ${end.y + 4.5} L ${end.x - 4.5} ${end.y} Z`}
              fill={diamondColor}
              stroke={diamondColor}
              strokeWidth="1"
            />
          </g>
        );
      })}
    </g>
  );
}