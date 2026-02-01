import { motion, AnimatePresence } from 'motion/react';
import { X, Linkedin, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { NodeData } from './types';

// Import Anatomie AI snapshots
import anatomie_pic_1 from '@/assets/07efdb5df7873f0cab77ff28682ee6867b886a12.png';
import anatomie_pic_2 from '@/assets/7727c0d0f91c77c7211c768817c99bb28e00fd0f.png';
import anatomie_pic_3 from '@/assets/11fdc797dd132a37a37ac656235c618b2c862b9e.png';
import anatomie_pic_4 from '@/assets/11701a0c122a942aaac44c8b69d1db8394fa0a95.png';

// Import Research Analysis snapshots
import research_pic_1 from '@/assets/392470b56073a0f6b8d97700a122b7e69708594b.png';
import research_pic_2 from '@/assets/950f5022982cd1daf1b0fb791e03c4fe4e4e1fc2.png';
import research_pic_3 from '@/assets/a4a05ae7eb7e801cf0c4c0ce347e90ca391c12f0.png';

// Import Dianalysis snapshot
import dianalysis_pic_1 from '@/assets/c40ed55538d5712d3b5d53c7aa5da60767eecfa3.png';

// Import Educational Assistant snapshot
import educational_assistant_pic_1 from '@/assets/895ca08ffbaef03034b4a0ce51d50bfd087139f0.png';

// Import About snapshot
import about_pic_1 from '@/assets/09802b9c0abfa668dbd7330fdc4f971e021f3868.png';

// Import Education snapshot
import education_pic_1 from '@/assets/09802b9c0abfa668dbd7330fdc4f971e021f3868.png';

interface InspectorPanelProps {
  node: NodeData | null;
  onClose: () => void;
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
          { label: 'variables', value: 'genre dose, listening time, mood improvement, well-being indicators' },
          { label: 'analysis_method', value: 'logistic regression, adjusted models, visualization' },
          { label: 'findings', value: 'genre-specific associations predicting emotional improvement, controlling for hours/day' },
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
            value: 'I work at the intersection of data, automation, intelligent systems, tools, and workflows that people can depend on.' 
          },
          { 
            label: 'focus', 
            value: 'translating real questions into reliable data products, clear insights, and simple systems that support strong decision-making' 
          },
          { 
            label: 'mission', 
            value: 'build thoughtful, dependable solutions where data, usability, and real-world context work together' 
          },
          { 
            label: 'philosophy', 
            value: '"questions before conclusions"' 
          },
          { 
            label: 'domains', 
            value: 'health analytics, learning and well-being, applied AI, civic and nonprofit systems' 
          },
          { 
            label: 'style', 
            value: 'collaborative, structured, big-picture, constructive' 
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
        title: 'Core Skills',
        items: [
          { label: 'stats_ability', value: 'descriptive, regression, inference' },
          { label: 'languages', value: 'Python, SQL' },
          { label: 'tools', value: 'pandas, NumPy, scikit-learn, dbt, Looker, BigQuery, Power BI, Git, Jupyter Notebooks' },
          { label: 'visualization', value: 'clean minimal plots, interpretability-first' },
          { label: 'modeling_style', value: 'transparent, interpretable, methodical' },
          { label: 'communication_skill', value: 'structured explanations, clear story' },
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
            value: 'created dashboards, ran quality-of-care analytics, supported care-coordination reporting' 
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
            value: 'analyzed early-voting data, engineered features for modeling, and built demographic visualizations for swing-state trends' 
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
          { label: 'organization', value: 'Girls Who Code x Art (Miami)' },
          { label: 'role', value: 'STEM Mentor & Creative Coding Support' },
          { label: 'program', value: 'Creative Coding & Confidence-Building Workshops' },
          { label: 'population_served', value: 'middle- and high-school girls in underserved communities' },
          { label: 'impact_summary', value: 'mentorship, coding sessions, project guidance' },
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
          { label: 'population_served', value: 'young children (K–1st grade)' },
          { label: 'year', value: '2025' },
          { label: 'summary', value: 'one-on-one reading sessions, early literacy support' },
        ],
      },
      {
        title: 'Mind & Melody',
        items: [
          { label: 'organization', value: 'Mind & Melody' },
          { label: 'role', value: 'Alzheimer\'s Music Therapy Volunteer' },
          { label: 'population_served', value: 'older adults with degenerative cognitive conditions' },
          { label: 'year', value: '2025' },
          { label: 'summary', value: 'music-based engagement sessions supporting mood and memory' },
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
          { label: 'model_type', value: 'nutrition label → diabetes risk feature classifier' },
          { label: 'interpretability', value: 'transparent rule-based feature logic' },
          { label: 'features', value: 'five-point engineered metabolic risk score' },
          { label: 'outputs', value: 'classification + interpretability report' },
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
          { label: 'certification_name', value: 'Career Essentials in Data Analysis' },
          { label: 'granting_organization', value: 'Microsoft & LinkedIn' },
          { label: 'year', value: '2024' },
          { label: 'credential_id', value: 'c06ee2518bfd1dd700a7290c9dda65b9e3848960af63215137dd7cd7f45f3a0' },
          { label: 'notes', value: 'includes foundations in data analysis, visualization, Excel, and dashboards' },
        ],
      },
    ],
  },
  system_guide: {
    subtitle: 'How to Navigate This Workspace',
    sections: [
      {
        items: [
          { label: 'interaction', value: 'tap or click any table to open its details' },
          { label: 'system_navigation', value: 'use the menu on the left to jump directly to a table' },
          { label: 'click_rules', value: 'click the X in the corner to close the inspector panel' },
          { label: 'keyboard_shortcuts', value: 'on desktop, arrow keys can move between tables (optional)' },
          { label: 'line_meaning', value: 'lines show conceptual relationships, not strict dependencies' },
          { label: 'node_meaning', value: 'each table represents part of my professional work' },
          { label: 'image_guide', value: 'tap an image to view it larger; tap outside the image to close it' },
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
          { label: 'portfolio', value: 'tech.deborahi.com' },
          { label: 'social', value: 'icons' },
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
          { label: 'project_type', value: 'nutrition-label classifier and diabetes-risk scoring system' },
          { label: 'overview', value: 'A rule-based and regression-calibrated scoring pipeline that evaluates packaged foods using metabolic risk logic and curated alternatives.' },
          { label: 'what_it_does', value: 'Scores items using engineered features, generates a metabolic risk score out of five, and provides interpretable justifications for each recommendation.' },
          { label: 'technical_notes', value: 'Rule-based feature logic, calibrated LogisticRegression model, Streamlit UI for barcode lookup, synthetic-data training pipeline, reproducible artifact folder.' },
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
          { label: 'overview', value: 'An intelligent assistant that reads, searches, and summarizes user documents using dynamic tool selection and multi-step reasoning.' },
          { label: 'what_it_does', value: 'Chooses tools autonomously, retrieves relevant text, answers questions with citations, and adapts its reasoning based on user follow-ups.' },
          { label: 'technical_notes', value: 'LangChain agent with tool-calling, Pinecone vector store, windowed conversational memory, Streamlit multi-user interface, encrypted credential storage.' },
          { label: 'link', value: 'https://github.com/edebbyi/education-assistant' },
        ],
        snapshots: [
          educational_assistant_pic_1,
        ],
      },
    ],
  },
};

export function InspectorPanel({ node, onClose }: InspectorPanelProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle drag end - close if dragged down enough
  const handleDragEnd = (_event: any, info: any) => {
    if (isMobile && info.offset.y > 150) {
      onClose();
    }
  };

  if (!node) return null;

  const content = inspectorContent[node.title];
  
  // Dark mode colors - refined
  const panelBgColor = 'var(--surface-1)';
  const titleColor = 'var(--ink-1)';
  const subtitleColor = 'var(--ink-muted)';
  const labelColor = 'var(--ink-muted)';
  const textColor = 'var(--ink-1)';
  const linkColor = 'var(--ink-1)';
  const closeIconColor = 'var(--ink-muted)';
  const borderColor = 'var(--border-1)';
  const hoverBgColor = 'var(--surface-2)';
  const dividerColor = 'var(--border-2)';
  const buttonBgColor = 'var(--surface-2)';
  const buttonHoverColor = 'var(--surface-3)';
  const buttonBorderColor = 'var(--border-1)';
  const iconColor = 'var(--ink-1)';
  const dragHandleColor = 'var(--border-1)';

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
            maxWidth: '420px',
            backgroundColor: panelBgColor,
            borderLeft: '1px solid var(--border-1)',
            boxShadow: '-16px 0 40px var(--shadow-color)',
            fontFamily: 'var(--font-body)',
            zIndex: 40,
            overflowX: 'hidden',
          }}
          onDragEnd={handleDragEnd}
          drag={isMobile ? 'y' : false}
          dragConstraints={{ top: 0, bottom: 0 }}
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
              backgroundColor: panelBgColor,
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
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '0.3px',
                  color: titleColor,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {node.title}
              </h2>
              {content?.subtitle && (
                <p
                  style={{
                    fontSize: '13px',
                    color: subtitleColor,
                    marginTop: '6px',
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
                      if (node.title === 'contact' && item.label === 'Social' && item.value === 'icons') {
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
                              fontSize: '14px',
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
                              fontSize: '14px',
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
                            marginBottom: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          className="inspector-value"
                          style={{
                            fontSize: '14px',
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
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: labelColor,
                        marginBottom: '12px',
                        fontFamily: 'var(--font-mono)',
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
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = hoverBgColor;
                            e.currentTarget.style.boxShadow = '0 10px 24px var(--shadow-color)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt={`Snapshot ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
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
                        marginTop: '6px',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.6px',
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
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: labelColor,
                    fontFamily: 'var(--font-mono)',
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
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = hoverBgColor;
                        e.currentTarget.style.boxShadow = '0 10px 24px var(--shadow-color)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={`Snapshot ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
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
                  fontFamily: 'var(--font-body)',
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
            backgroundColor: 'rgba(9, 12, 12, 0.9)',
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
            loading="lazy"
            decoding="async"
            style={{
              maxWidth: 'min(90vw, 600px)',
              maxHeight: 'min(90vh, 700px)',
              objectFit: 'contain',
              borderRadius: '14px',
              boxShadow: '0 24px 60px var(--shadow-color)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}