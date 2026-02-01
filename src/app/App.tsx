import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SchemaView } from './components/SchemaView';
import { InspectorPanel } from './components/InspectorPanel';
import { LoginScreen } from './components/LoginScreen';
import type { NodeData } from './components/types';
import { nodeData } from './components/data';

export default function App() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleNodeClick = (node: NodeData) => {
    // Toggle selection - if clicking the same node, close inspector
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const handleCloseInspector = () => {
    setSelectedNode(null);
  };

  const handleLogout = () => {
    setSelectedNode(null);
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsTransitioning(true);
    // Fade to black, then show schema view
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsTransitioning(false);
    }, 350); // 350ms for black screen duration
  };

  // Keyboard navigation between nodes
  useEffect(() => {
    if (!isLoggedIn || isTransitioning) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't interfere if user is typing in an input field
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Arrow key navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();

        // Navigation order matching the sidebar (using titles)
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

        // Get nodes in navigation order
        const orderedNodes = customOrder
          .map(title => nodeData.find(node => node.title === title))
          .filter((node): node is NodeData => node !== undefined);

        // If no node is selected, select the first one
        if (!selectedNode) {
          setSelectedNode(orderedNodes[0]);
          return;
        }

        // Find current index in ordered list
        const currentIndex = orderedNodes.findIndex(node => node.id === selectedNode.id);
        if (currentIndex === -1) {
          setSelectedNode(orderedNodes[0]);
          return;
        }

        // Navigate based on arrow key
        let newIndex = currentIndex;
        
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          // Move to next item
          newIndex = (currentIndex + 1) % orderedNodes.length;
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          // Move to previous item
          newIndex = (currentIndex - 1 + orderedNodes.length) % orderedNodes.length;
        }

        setSelectedNode(orderedNodes[newIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoggedIn, isTransitioning, selectedNode]);

  // Auto-open system_guide inspector on first visit
  useEffect(() => {
    if (!isLoggedIn || isTransitioning) return;

    // Check if user has already visited the diagram
    const hasVisited = sessionStorage.getItem('hasVisitedDiagram');
    
    if (!hasVisited) {
      // Wait for schema layout to fully render
      const timer = setTimeout(() => {
        const systemGuideNode = nodeData.find(node => node.title === 'system_guide');
        if (systemGuideNode) {
          setSelectedNode(systemGuideNode);
        }
        // Mark as visited
        sessionStorage.setItem('hasVisitedDiagram', 'true');
      }, 500); // Delay to ensure schema view is fully rendered

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isTransitioning]);

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#0F1419' : '#FAF7F2' }}>
      <AnimatePresence mode="wait">
        {!isLoggedIn && !isTransitioning && (
          <motion.div
            key="login"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LoginScreen onEnter={handleLogin} theme={theme} setTheme={setTheme} />
          </motion.div>
        )}
        
        {isTransitioning && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#000000',
              zIndex: 9999,
            }}
          />
        )}

        {isLoggedIn && !isTransitioning && (
          <motion.div
            key="schema"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative w-full h-full overflow-hidden"
          >
            <SchemaView 
              onNodeClick={handleNodeClick}
              selectedNode={selectedNode}
              onClose={handleCloseInspector}
              onLogout={handleLogout}
              theme={theme}
            />
            <InspectorPanel 
              node={selectedNode}
              onClose={handleCloseInspector}
              theme={theme}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}