import { Zap, Users, Laptop, Briefcase } from 'lucide-react';

export const solutions = [
  {
    title: 'Payroll',
    desc: 'Payroll Processing.',
    icon: Zap,
  },
  {
    title: 'HR Management',
    desc: 'Employee records & onboarding.',
    icon: Users,
  },
  {
    title: 'Leave Management',
    desc: 'Leave requests & approvals.',
    icon: Laptop,
  },
  {
    title: 'Compliance',
    desc: 'Tax and Paye Compliance.',
    icon: Briefcase,
  },
];

export const solutionPanels = {
  Payroll: {
    title: 'Payroll',
    subtitle: 'Run pay on autopilot with compliance baked in.',
    details: [
      'Automated payroll runs for your full team.',
      'Built-in ZRA and PAYE compliance checks.',
      'Export payslips and reports in seconds.',
    ],
  },
  'HR Management': {
    title: 'HR Management',
    subtitle: 'Centralize hiring, onboarding, and employee data.',
    details: [
      'Keep employee records, documents, and roles in one place.',
      'Manage onboarding, offboarding, and workflows smoothly.',
      'Track headcount and HR tasks with actionable visibility.',
    ],
  },
  'Leave Management': {
    title: 'Leave Management',
    subtitle: 'Approve leave requests, track time off, and stay organized.',
    details: [
      'Self-service leave requests with approval workflows.',
      'Accrual tracking for vacation, sick leave, and more.',
      'Keep managers aligned with clear team availability.',
    ],
  },
  Compliance: {
    title: 'Compliance',
    subtitle: 'Automate statutory reporting for tax, NAPSA, and PAYE.',
    details: [
      'Reduce risk with built-in payroll and tax compliance.',
      'Generate the documents your business needs naturally.',
      'Stay audit-ready with records and digital trail.',
    ],
  },
};

const slugify = (title) => title.toLowerCase().replace(/\s+/g, '-');

export const solutionSlugMap = solutions.reduce((map, { title }) => {
  map[slugify(title)] = title;
  return map;
}, {});

export const getSolutionTitleFromSlug = (slug) => solutionSlugMap[slug] || null;

export const getSolutionSlug = (title) => slugify(title);
