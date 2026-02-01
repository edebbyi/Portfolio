import type { NodeData, Connection } from './types';

// Node data - SQL-style table schema
export const nodeData: NodeData[] = [
  // === COLUMN 1 (Left) - staggered y positions ===
  // result_b1 -> education & training - top
  {
    id: 'result_b1',
    title: 'education',
    category: 'result',
    fields: ['university', 'degree', 'major', 'minor', 'cognate', 'honors', 'graduation_date', 'snapshots'],
    x: 80,
    y: 40,
    color: '#63D18A', // Bright but friendly green
    content: {
      description: 'Education and training background with academic credentials.',
      details: [
        'Lists educational institutions',
        'Includes degrees and majors',
        'Shows honors and graduation dates'
      ]
    }
  },
  // special_orders -> work_experience
  {
    id: 'special_orders',
    title: 'work_experience',
    category: 'table',
    fields: ['company', 'role', 'responsibilities', 'timeframe', 'snapshots'],
    x: 80,
    y: 200,
    color: '#A58BFF', // Deeper lavender that is NOT similar to toolkit
    content: {
      description: 'Professional work experience and employment history.',
      details: [
        'Lists companies and roles',
        'Documents responsibilities',
        'Shows timeframes'
      ]
    }
  },
  // customers -> about
  {
    id: 'customers',
    title: 'about',
    category: 'table',
    fields: ['identity', 'focus', 'mission', 'philosophy', 'domains', 'style', 'snapshots'],
    x: 80,
    y: 370,
    color: '#6FA8FF', // Gentle-yet-vivid cornflower blue
    content: {
      description: 'About section containing identity, mission, and focus areas.',
      details: [
        'Defines identity and professional focus',
        'Outlines mission and philosophy',
        'Lists domains of expertise'
      ]
    }
  },
  // rs1 -> system_guide - bottom
  {
    id: 'rs1',
    title: 'system_guide',
    category: 'result',
    fields: ['interaction', 'system_navigation', 'click_rules', 'keyboard_shortcuts', 'line_meaning', 'node_meaning', 'image_guide'],
    x: 80,
    y: 540,
    color: '#F76868', // Soft coral-red
    content: {
      description: 'Navigation guide explaining system interactions and controls.',
      details: [
        'Describes interaction patterns',
        'Documents keyboard shortcuts'
      ]
    }
  },

  // === COLUMN 2 (Center) - staggered y positions ===
  // result_a1 -> volunteering
  {
    id: 'result_a1',
    title: 'volunteering',
    category: 'result',
    fields: ['organization', 'role', 'population_served', 'year', 'summary'],
    x: 320,
    y: 50,
    color: '#E9C856', // Golden soft-amber
    content: {
      description: 'Volunteering experience with community involvement.',
      details: [
        'Documents volunteer work',
        'Shows organizations and roles',
        'Describes populations served'
      ]
    }
  },
  // insert_select1 -> toolkit
  {
    id: 'insert_select1',
    title: 'toolkit',
    category: 'query',
    fields: ['stats_ability', 'tools', 'visualization', 'modeling_style', 'communication_skill', 'languages'],
    x: 320,
    y: 210,
    color: '#C976D9', // Distinctly different, soft-magenta violet
    content: {
      description: 'Toolkit encompassing statistical abilities, tools, and technical skills.',
      details: [
        'Statistical abilities and methods',
        'Visualization and modeling styles',
        'Communication skills and languages'
      ]
    }
  },
  // orders -> research & analysis
  {
    id: 'orders',
    title: 'research_analysis',
    category: 'table',
    fields: ['project', 'dataset', 'variables', 'analysis_method', 'findings', 'github', 'snapshots'],
    x: 320,
    y: 380,
    width: 185,
    color: '#4BC7CF', // Clear analytic blue-green
    content: {
      description: 'Research and analysis projects with datasets and methodologies.',
      details: [
        'Contains research project information',
        'Links to datasets and variables',
        'Documents methods and findings'
      ]
    }
  },
  // large_orders -> certification
  {
    id: 'large_orders',
    title: 'certification',
    category: 'table',
    fields: ['certification_name', 'granting_org', 'year', 'credential_id', 'notes'],
    x: 320,
    y: 550,
    color: '#F781AD', // Soft vibrant pink
    content: {
      description: 'Professional certifications and credentials.',
      details: [
        'Lists certifications and granting organizations',
        'Shows credential IDs and years',
        'Includes additional notes'
      ]
    }
  },

  // === COLUMN 3 (Right) - staggered y positions ===
  // vaal -> contact - top
  {
    id: 'vaal',
    title: 'contact',
    category: 'table',
    fields: ['email', 'location', 'portfolio', 'social'],
    x: 560,
    y: 40,
    color: '#FFB199', // Soft peach
    content: {
      description: 'Contact information and communication channels.',
      details: [
        'Provides email and social links',
        'Includes portfolio link',
        'Lists message endpoints'
      ]
    }
  },
  // medium_orders -> modeling & systems
  {
    id: 'medium_orders',
    title: 'personal_projects',
    category: 'table',
    fields: ['project_name', 'problem', 'approach', 'what_it_does', 'tech_summary', 'outcomes', 'link', 'snapshots'],
    x: 560,
    y: 185,
    color: '#54D0BB', // Crisp mint-teal
    content: {
      description: 'Personal projects and featured work.',
      details: [
        'Showcases independent projects',
        'Documents technical approaches',
        'Includes links to implementations'
      ]
    }
  },
  // small_orders -> advocacy
  {
    id: 'small_orders',
    title: 'advocacy',
    category: 'table',
    fields: ['organization', 'role', 'program', 'population_served', 'impact_summary', 'year'],
    x: 560,
    y: 360,
    color: '#F7A45A', // Warm apricot-orange that is vivid without being neon
    content: {
      description: 'Advocacy work and community programs.',
      details: [
        'Documents advocacy initiatives',
        'Shows programs and impact',
        'Lists populations served'
      ]
    }
  }
];

// Connections between nodes - SQL-style relational connections
export const connections: Connection[] = [
  // education → about (top left to lower left, vertical)
  { from: 'result_b1', to: 'customers', fromSide: 'right', toSide: 'right' },
  
  // about → contact (middle left to top right, diagonal)
  { from: 'customers', to: 'vaal', fromSide: 'right', toSide: 'left' },
  
  // research_analysis → toolkit (lower center to middle center, vertical)
  { from: 'orders', to: 'insert_select1', fromSide: 'left', toSide: 'left' },
  
  // personal_projects → research_analysis (right to center, diagonal)
  { from: 'medium_orders', to: 'orders', fromSide: 'left', toSide: 'right' },
  
  // certification → toolkit (lower center to middle center)
  { from: 'large_orders', to: 'insert_select1', fromSide: 'left', toSide: 'right' },
  
  // work_experience → toolkit (left to center)
  { from: 'special_orders', to: 'insert_select1', fromSide: 'right', toSide: 'left' },
  
  // advocacy → work_experience (right to left, diagonal)
  { from: 'small_orders', to: 'special_orders', fromSide: 'left', toSide: 'right' },
  
  // volunteering → advocacy (top center-left to lower center-right, diagonal)
  { from: 'result_a1', to: 'small_orders', fromSide: 'right', toSide: 'left' },
  
  // system_guide → about (bottom left to middle left, vertical)
  { from: 'rs1', to: 'customers', fromSide: 'right', toSide: 'right' },
];