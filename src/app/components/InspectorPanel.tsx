import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { X, Linkedin, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { NodeData } from './types';

// Import Anatomie AI snapshots
import anatomie_pic_1 from 'figma:asset/work-experience-anatomie-1.png';
import anatomie_pic_2 from 'figma:asset/work-experience-anatomie-2.png';
import anatomie_pic_3 from 'figma:asset/work-experience-anatomie-3.png';
import anatomie_pic_4 from 'figma:asset/work-experience-anatomie-4.png';

// Import Research Analysis snapshots
import research_pic_1 from 'figma:asset/research-analysis-1.png';
import research_pic_2 from 'figma:asset/research-analysis-2.png';
import research_pic_3 from 'figma:asset/research-analysis-3.png';

// Import Personal Projects snapshots
import dianalysis_pic_1 from 'figma:asset/personal-projects-dianalysis.png';
import educational_assistant_pic_1 from 'figma:asset/personal-projects-chatbot.png';

// Import About snapshot
import about_pic_1 from 'figma:asset/about-1.png';

// Import Education snapshot
import education_pic_1 from 'figma:asset/education-1.jpeg';

interface InspectorPanelProps {
  node: NodeData | null;
  onClose: () => void;
  theme: 'light' | 'dark';
}

// Inspector content for each table
const inspectorContent: Record<string, {
  subtitle?: string;
  sections: Array<{
    title?: string;
    items: Array<{ label: string; value: string }>;
    snapshots?: string[];
  }>;
  projectURL?: string;
}> = {
  education: {
    subtitle: 'Educational Background',
    sections: [
      {
        items: [
          { label: 'university', value: 'University of Miami' },
          { label: 'degree', value: 'B.A. Computer Science' },
          { label: 'major', value: 'Computer Science' },
          { label: 'minor', value: 'Communication' },
          { label: 'cognate', value: 'Psychology' },
          { label: 'honors', value: "Dean's List '25" },
          { label: 'graduation_date', value: '2025' },
        ],
        snapshots: [
          education_pic_1,
        ],
      },
    ],
  },
  research_analysis: {
    subtitle: 'Research Projects & Analysis',
    sections: [
      {
        title: 'Music & Mental Health Study',
        items: [
          { label: 'project', value: 'Music & Mental Health: Genre, Listening Habits, Mood Effects (2025)' },
          { label: 'dataset', value: 'MXMH Survey (Kaggle) — 10k+ participants' },
          { label: 'variables', value: 'Genre dose, listening time, mood improvement, well-being indicators' },
          { label: 'analysis_method', value: 'Logistic regression, adjusted models, visualization' },
          { label: 'findings', value: 'Genre-specific associations linked to mood improvement; suggests targeted listening habits that support well-being' },
          { label: 'github', value: 'https://github.com/edebbyi/music-mental-health-analysis' },
        ],
        snapshots: [
          research_pic_1,
          research_pic_2,
          research_pic_3,
        ],
      },
    ],
    projectURL: 'https://github.com/edebbyi/music-mental-health-analysis',
  },
  about: {
    subtitle: 'Professional Identity & Philosophy',
    sections: [
      {
        items: [
          { 
            label: 'identity', 
            value: 'Product-minded data and systems builder focused on health and mission-driven work' 
          },
          { 
            label: 'focus', 
            value: 'Turning research and stakeholder needs into roadmaps, measurable outcomes, and usable products' 
          },
          { 
            label: 'mission', 
            value: 'Deliver thoughtful, reliable products where data, usability, and real-world context align' 
          },
          { 
            label: 'philosophy', 
            value: 'Questions before conclusions' 
          },
          { 
            label: 'domains', 
            value: 'Public health, nonprofit operations, learning and well-being, applied AI' 
          },
          { 
            label: 'style', 
            value: 'Collaborative, structured, outcomes-first, empathetic' 
          },
        ],
        snapshots: [
          about_pic_1,
        ],
      },
    ],
  },
  toolkit: {
    subtitle: 'Technical Skills & Competencies',
    sections: [
      {
        items: [
          { label: 'stats_ability', value: 'Product analytics, descriptive, regression, experimentation' },
          { label: 'tools', value: 'Pandas, NumPy, scikit-learn, dbt, Looker, BigQuery, Power BI, Git, Jupyter, Jira, Notion, Figma' },
          { label: 'visualization', value: 'Decision-ready dashboards, narrative visuals, interpretability-first' },
          { label: 'modeling_style', value: 'Hypothesis-driven, interpretable, iteration-ready' },
          { label: 'communication_skill', value: 'Stakeholder alignment, roadmap storytelling, concise updates' },
          { label: 'languages', value: 'Python, SQL' },
        ],
      },
    ],
  },
  work_experience: {
    subtitle: 'Professional Experience',
    sections: [
      // CURRENT ROLE
      {
        title: 'Anatomie AI',
        items: [
          { label: 'company', value: 'Anatomie AI' },
          { label: 'role', value: 'Founding Product AI Engineer — Automation & Data Systems' },
          { 
            label: 'responsibilities', 
            value: 'Led full lifecycle of internal AI/data tools, built multi-agent automation + generation pipelines, defined system requirements from stakeholder needs, created tooling and dashboards for evaluating performance, partnered with teams to refine features and reliability' 
          },
          { label: 'timeframe', value: '2024–Present' },
        ],
        snapshots: [
          anatomie_pic_1,
          anatomie_pic_2,
          anatomie_pic_3,
          anatomie_pic_4,
        ],
      },

      // MORNINGSTAR
      {
        title: 'Morningstar Home Health',
        items: [
          { label: 'company', value: 'Morningstar Home Health' },
          { label: 'role', value: 'Data Analyst Intern' },
          { 
            label: 'responsibilities', 
            value: 'Created dashboards, ran quality-of-care analytics, supported care-coordination reporting' 
          },
          { label: 'timeframe', value: '2023–2024' },
        ],
      },

      // HARRIS FOR PRESIDENT
      {
        title: 'Harris for President',
        items: [
          { label: 'company', value: 'Harris for President' },
          { label: 'role', value: 'Data Science Intern' },
          { 
            label: 'responsibilities', 
            value: 'Analyzed early-voting data, engineered features for modeling, and built demographic visualizations for swing-state trends' 
          },
          { label: 'timeframe', value: '2024' },
        ],
      },

      // OUTLIER
      {
        title: 'Outlier',
        items: [
          { label: 'company', value: 'Outlier' },
          { label: 'role', value: 'AI Model Trainer' },
          { 
            label: 'responsibilities', 
            value: 'LLM instruction-tuning tasks, evaluation, quality oversight' 
          },
          { label: 'timeframe', value: '2024' },
        ],
      },
    ],
  },
  advocacy: {
    subtitle: 'Community Advocacy & Impact',
    sections: [
      {
        items: [
          { label: 'organization', value: 'Code/Art' },
          { label: 'role', value: 'Sponsor (Regular Donor)' },
          { label: 'program', value: 'Supports Code/Art programs that introduce girls to coding through art' },
          { label: 'population_served', value: 'Girls in grades 3–12, especially underrepresented communities' },
          { label: 'impact_summary', value: 'Supports a mission to increase girls in CS; 95% report feeling more like coders, 52% plan to major/minor in CS, 87% continue coding' },
          { label: 'year', value: '2025' },
        ],
      },
    ],
  },
  volunteering: {
    subtitle: 'Volunteer Work & Service',
    sections: [
      {
        title: 'Reading Pals',
        items: [
          { label: 'organization', value: 'Reading Pals (United Way)' },
          { label: 'role', value: 'Early Literacy Mentor' },
          { label: 'population_served', value: 'Young children (K–1st grade)' },
          { label: 'year', value: '2025' },
          { label: 'summary', value: 'One-on-one reading sessions, early literacy support' },
        ],
      },
      {
        title: 'Mind & Melody',
        items: [
          { label: 'organization', value: 'Mind & Melody' },
          { label: 'role', value: 'Alzheimer\'s Music Therapy Volunteer' },
          { label: 'population_served', value: 'Older adults with degenerative cognitive conditions' },
          { label: 'year', value: '2025' },
          { label: 'summary', value: 'Music-based engagement sessions supporting mood and memory' },
        ],
      },
    ],
  },
  modeling_systems: {
    subtitle: 'Modeling Projects & Systems',
    sections: [
      {
        items: [
          { label: 'model_name', value: 'Dianalysis' },
          { label: 'model_type', value: 'Nutrition label → diabetes risk feature classifier' },
          { label: 'interpretability', value: 'Transparent rule-based feature logic' },
          { label: 'features', value: 'Five-point engineered metabolic risk score' },
          { label: 'outputs', value: 'Classification + interpretability report' },
          { label: 'link', value: 'https://github.com/edebbyi/dianalysis' },
        ],
        snapshots: [
          dianalysis_pic_1,
        ],
      },
    ],
    projectURL: 'https://github.com/edebbyi/dianalysis',
  },
  certification: {
    subtitle: 'Professional Certifications',
    sections: [
      {
        items: [
          { label: 'certification_name', value: 'International SCRUM Master Foundation' },
          { label: 'granting_organization', value: 'Scrum Alliance' },
          { label: 'year', value: '2025' },
          { label: 'notes', value: 'Covers Scrum theory + agile principles, three pillars, five values, team roles, events, and artifacts with commitments (Product Goal, Sprint Goal, Definition of Done)' },
        ],
      },
      {
        items: [
          { label: 'certification_name', value: 'IBM Project Manager Professional Certificate' },
          { label: 'granting_organization', value: 'IBM' },
          { label: 'year', value: 'In Progress' },
          { label: 'notes', value: '7-course, ~3-month program covering initiation, planning, execution, Agile/Scrum, budgeting, risk, stakeholder communication, and a capstone + CAPM prep' },
        ],
      },
      {
        items: [
          { label: 'certification_name', value: 'Career Essentials in Data Analysis' },
          { label: 'granting_organization', value: 'Microsoft & LinkedIn' },
          { label: 'year', value: '2024' },
          { label: 'notes', value: 'Includes foundations in data analysis, visualization, Excel, and dashboards' },
        ],
      },
    ],
  },
  system_guide: {
    subtitle: 'How to Navigate This Workspace',
    sections: [
      {
        items: [
          { label: 'interaction', value: 'Tap or click any table to open its details' },
          { label: 'system_navigation', value: 'Use the menu on the left to jump directly to a table' },
          { label: 'click_rules', value: 'Click the X in the corner to close the inspector panel' },
          { label: 'keyboard_shortcuts', value: 'On desktop, arrow keys can move between tables (optional)' },
          { label: 'line_meaning', value: 'Lines show conceptual relationships, not strict dependencies' },
          { label: 'node_meaning', value: 'Each table maps to PM-ready capabilities and impact areas' },
          { label: 'image_guide', value: 'Tap an image to view it larger; tap outside the image to close it' },
        ],
      },
    ],
  },
  contact: {
    subtitle: 'Let\'s Get In Touch',
    sections: [
      {
        items: [
          { label: 'email', value: 'edebbyi305@gmail.com' },
          { label: 'location', value: 'Miami, FL' },
          { label: 'website', value: 'tech.deborahi.com' },
          { label: 'social', value: 'Icons' },
        ],
      },
    ],
  },
  personal_projects: {
    subtitle: 'Highlighted Personal Projects',
    sections: [
      // Dianalysis
      {
        items: [
          { label: 'project_name', value: 'Dianalysis' },
          { label: 'project_type', value: 'Nutrition-label classifier and diabetes-risk scoring system' },
          { label: 'overview', value: 'A rule-based and regression-calibrated scoring pipeline that evaluates packaged foods using metabolic risk logic and curated alternatives' },
          { label: 'what_it_does', value: 'Scores items using engineered features, generates a metabolic risk score out of five, and provides interpretable justifications for each recommendation' },
          { label: 'technical_notes', value: 'Rule-based feature logic, calibrated LogisticRegression model, Streamlit UI for barcode lookup, synthetic-data training pipeline, reproducible artifact folder' },
          { label: 'link', value: 'https://github.com/edebbyi/dianalysis' },
        ],
        snapshots: [
          dianalysis_pic_1,
        ],
      },

      // Educational AI Assistant
      {
        items: [
          { label: 'project_name', value: 'Educational AI Assistant' },
          { label: 'project_type', value: 'Document-grounded Q&A system with tool-calling agent' },
          { label: 'overview', value: 'An intelligent assistant that reads, searches, and summarizes user documents using dynamic tool selection and multi-step reasoning' },
          { label: 'what_it_does', value: 'Chooses tools autonomously, retrieves relevant text, answers questions with citations, and adapts its reasoning based on user follow-ups' },
          { label: 'technical_notes', value: 'LangChain agent with tool-calling, Pinecone vector store, windowed conversational memory, Streamlit multi-user interface, encrypted credential storage' },
          { label: 'link', value: 'https://github.com/edebbyi/education-assistant' },
        ],
        snapshots: [
          educational_assistant_pic_1,
        ],
      },
    ],
  },
};

export function InspectorPanel({ node, onClose, theme }: InspectorPanelProps) {
  const dragControls = useDragControls();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1025);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle drag end - close if dragged down enough
  const handleDragEnd = (_event: any, info: any) => {
    if (isMobile && (info.offset.y > 60 || info.velocity.y > 800)) {
      onClose();
    }
  };

  if (!node) return null;

  const content = inspectorContent[node.title];
  
  // Dark mode colors - refined
  const panelBgColor = theme === 'dark' ? '#1A1D21' : '#F9FAFC';
  const titleColor = theme === 'dark' ? '#FFFFFF' : '#1C1F23';
  const subtitleColor = theme === 'dark' ? 'rgba(255,255,255,0.55)' : '#6A7687';
  const labelColor = theme === 'dark' ? 'rgba(255,255,255,0.55)' : '#6A7687';
  const textColor = theme === 'dark' ? 'rgba(255,255,255,0.80)' : '#2D3440';
  const linkColor = theme === 'dark' ? 'rgba(255,255,255,0.80)' : '#2D3440';
  const closeIconColor = theme === 'dark' ? '#9AA5B3' : '#6A7687';
  const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.10)';
  const hoverBgColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)';
  const dividerColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
  const buttonBgColor = theme === 'dark' ? '#2D3748' : '#E4E8EE';
  const buttonHoverColor = theme === 'dark' ? '#3A4556' : '#DDE2E8';
  const buttonBorderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  const iconColor = theme === 'dark' ? 'rgba(255,255,255,0.80)' : '#2D3440';
  const dragHandleColor = theme === 'dark' ? '#475569' : '#CBD5E1';

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          key={node.id}
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className={`inspector-panel visible fixed right-0 top-0 h-full overflow-y-auto`}
          style={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: theme === 'dark' ? '#1C2128' : '#F9FAFC',
            borderLeft: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: theme === 'dark' 
              ? '-4px 0 16px rgba(0, 0, 0, 0.3)' 
              : '-4px 0 16px rgba(0, 0, 0, 0.06)',
            fontFamily: 'Consolas, Monaco, Menlo, monospace',
            zIndex: 40,
            overflowX: 'hidden',
          }}
          onDragEnd={handleDragEnd}
          drag={isMobile ? 'y' : false}
          dragControls={dragControls}
          dragListener={false}
          dragElastic={0.12}
          dragSnapToOrigin
          dragConstraints={{ top: 0, bottom: 120 }}
        >
          {/* Sticky header: colored bar + drag handle only */}
          <div 
            className="inspector-sticky-top"
            style={{
              position: 'sticky',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              backgroundColor: theme === 'dark' ? '#1C2128' : '#F9FAFC',
            }}
          >
            {/* Colored top border */}
            <div
              style={{
                height: '3px',
                backgroundColor: node.color,
              }}
            />

            {/* Mobile drag handle */}
            <div 
              className="inspector-drag-handle md:hidden" 
              style={{
                backgroundColor: dragHandleColor,
              }}
              onPointerDown={(event) => {
                if (isMobile) {
                  event.preventDefault();
                  dragControls.start(event.nativeEvent);
                }
              }}
              onTouchStart={(event) => {
                if (isMobile) {
                  dragControls.start(event.nativeEvent);
                }
              }}
            />
          </div>

          {/* Scrollable content area - consistent padding throughout */}
          <div style={{ padding: '0 32px 32px 32px' }}>
            {/* Close button - above title, visible on all screen sizes */}
            <button
              onClick={onClose}
              className="inspector-close-button hover:opacity-70 transition-opacity"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px',
                margin: '8px 0 16px -12px', // -12px aligns with content padding
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} color={closeIconColor} />
            </button>

            {/* Header content */}
            <div className="inspector-header" style={{ paddingBottom: '24px', position: 'relative', padding: '0 0 24px 0' }}>
              <h2
                className="inspector-heading"
                style={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: titleColor,
                }}
              >
                {node.title}
              </h2>
              {content?.subtitle && (
                <p
                  style={{
                    fontSize: '12px',
                    color: subtitleColor,
                    marginTop: '4px',
                  }}
                >
                  {content.subtitle}
                </p>
              )}
            </div>

            {/* Content sections */}
            {content?.sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                {/* Show section title for personal_projects, but not for work_experience and volunteering */}
                {section.title && node.title !== 'work_experience' && node.title !== 'volunteering' && (
                  <h3
                    style={{
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      color: labelColor,
                      marginBottom: '12px',
                    }}
                  >
                    {section.title}
                  </h3>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  {section.items.map((item, itemIdx) => {
                    // Helper function to detect if value is a URL or email
                    const isUrl = (value: string) => {
                      return value.startsWith('http://') || value.startsWith('https://') || 
                             value.includes('linkedin.com') || value.includes('github.com') ||
                             value.includes('.com') || value.includes('.co') || value.includes('.org') || value.includes('.net');
                    };
                    const isEmail = (value: string) => {
                      return value.includes('@') && !value.startsWith('http') && !value.startsWith('mailto:');
                    };

                    // Render value based on type
                    const renderValue = () => {
                      // Special handling for Social field in contact
                      if (node.title === 'contact' && item.label.toLowerCase() == 'social' && item.value.toLowerCase() === 'icons') {
                        return (
                          <div className="flex items-center gap-3">
                            <a
                              href="https://linkedin.com/in/e-deborah-imafidon-34000b272/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-70 transition-opacity"
                              style={{ cursor: 'pointer' }}
                            >
                              <Linkedin size={20} color={iconColor} />
                            </a>
                            <a
                              href="https://github.com/edebbyi"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-70 transition-opacity"
                              style={{ cursor: 'pointer' }}
                            >
                              <Github size={20} color={iconColor} />
                            </a>
                          </div>
                        );
                      }

                      // Make URLs and emails clickable
                      if (isUrl(item.value)) {
                        const href = item.value.startsWith('http') ? item.value : `https://${item.value}`;
                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline transition-all"
                            style={{
                              fontSize: '15px',
                              color: linkColor,
                              lineHeight: '1.5',
                              cursor: 'pointer',
                            }}
                          >
                            {item.value}
                          </a>
                        );
                      }

                      if (isEmail(item.value)) {
                        return (
                          <a
                            href={`mailto:${item.value}`}
                            className="hover:underline transition-all"
                            style={{
                              fontSize: '15px',
                              color: linkColor,
                              lineHeight: '1.5',
                              cursor: 'pointer',
                            }}
                          >
                            {item.value}
                          </a>
                        );
                      }

                      // Default text rendering
                      return item.value;
                    };

                    return (
                      <div key={itemIdx}>
                        <div
                          className="inspector-label"
                          style={{
                            fontSize: '11px',
                            color: labelColor,
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          className="inspector-value"
                          style={{
                            fontSize: '15px',
                            color: textColor,
                            lineHeight: '1.5',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {renderValue()}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Section-level SNAPSHOTS (for work_experience Anatomie AI section) */}
                {section.snapshots && section.snapshots.length > 0 && (
                  <div style={{ marginTop: '12px', marginBottom: '24px' }}>
                    {/* SNAPSHOTS header */}
                    <h3
                      className="inspector-section-title"
                      style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        color: labelColor,
                        marginBottom: '12px',
                      }}
                    >
                      SNAPSHOTS
                    </h3>
                    
                    {/* Thumbnails container - horizontal carousel on mobile */}
                    <div className="inspector-snapshots" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {section.snapshots.map((imageUrl, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedImage(imageUrl)}
                          onTouchEnd={(e) => {
                            e.preventDefault();
                            setSelectedImage(imageUrl);
                          }}
                          className="inspector-snapshot"
                          style={{
                            width: '100%',
                            maxHeight: '120px',
                            overflow: 'hidden',
                            border: `1px solid ${borderColor}`,
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = hoverBgColor;
                            if (theme === 'dark') {
                              e.currentTarget.style.boxShadow = '0 0 8px rgba(255,255,255,0.04)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt={`Snapshot ${idx + 1}`}
                            style={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '120px',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Helper text */}
                    <div
                      className="inspector-snapshot-caption"
                      style={{
                        fontSize: '10px',
                        color: subtitleColor,
                        textAlign: 'center',
                        marginTop: '4px',
                      }}
                    >
                      click to enlarge
                    </div>
                  </div>
                )}

                {/* Add divider between entries in multi-section work_experience and volunteering */}
                {(node.title === 'work_experience' || node.title === 'volunteering' || node.title === 'personal_projects') && 
                 sectionIdx < content.sections.length - 1 && (
                  <div
                    style={{
                      width: '100%',
                      height: '1px',
                      background: dividerColor,
                      margin: '20px 0',
                    }}
                  />
                )}
              </div>
            ))}

            {/* SNAPSHOTS section */}
            {content?.snapshots && content.snapshots.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                {/* SNAPSHOTS header */}
                <h3
                  style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: labelColor,
                    marginBottom: '12px',
                  }}
                >
                  SNAPSHOTS
                </h3>
                
                {/* Thumbnails container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {content.snapshots.map((imageUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(imageUrl)}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        setSelectedImage(imageUrl);
                      }}
                      style={{
                        width: '100%',
                        maxHeight: '120px',
                        overflow: 'hidden',
                        border: `1px solid ${borderColor}`,
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = hoverBgColor;
                        if (theme === 'dark') {
                          e.currentTarget.style.boxShadow = '0 0 8px rgba(255,255,255,0.04)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={`Snapshot ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '120px',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Helper text */}
                <div
                  style={{
                    fontSize: '10px',
                    color: subtitleColor,
                    textAlign: 'center',
                    marginTop: '4px',
                  }}
                >
                  click to enlarge
                </div>
              </div>
            )}

            {/* View Project Button - only for nodes with projectURL */}
            {content?.projectURL && (
              <a
                href={content.projectURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  height: '36px',
                  marginTop: '16px',
                  backgroundColor: buttonBgColor,
                  border: `1px solid ${buttonBorderColor}`,
                  borderRadius: '6px',
                  fontFamily: 'Consolas, Monaco, Menlo, monospace',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: titleColor,
                  letterSpacing: '0.4px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = buttonHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = buttonBgColor;
                }}
              >
                VIEW PROJECT
              </a>
            )}
          </div>
        </motion.div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="image-modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '40px',
            cursor: 'zoom-out',
          }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="image-modal-content"
            src={selectedImage}
            alt="Enlarged snapshot"
            style={{
              maxWidth: 'min(90vw, 600px)',
              maxHeight: 'min(90vh, 700px)',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}