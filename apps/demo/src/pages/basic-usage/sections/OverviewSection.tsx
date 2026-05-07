import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Alert,
  Badge,
} from '@e-burgos/tucu-ui';

const features = [
  {
    icon: LucideIcons.ServerCog,
    gradient: 'from-blue-500 to-indigo-600',
    title: 'Server-Side Pagination',
    description:
      'Each page change fires a real API call with React Query. Previous data stays visible while new data loads—no content flicker.',
    badge: 'React Query',
    badgeColor: 'info' as const,
  },
  {
    icon: LucideIcons.ArrowUpDown,
    gradient: 'from-green-500 to-teal-600',
    title: 'Multi-Column Sorting',
    description:
      'Hold Shift and click multiple headers to sort by several columns at once. Custom sortingFn for numeric strings like height and mass.',
    badge: 'TanStack Table',
    badgeColor: 'success' as const,
  },
  {
    icon: LucideIcons.GripVertical,
    gradient: 'from-purple-500 to-violet-600',
    title: 'Drag & Reorder',
    description:
      'Grab any column header and drag it left or right to reorder. Powered by @dnd-kit under the hood with smooth animations.',
    badge: 'dnd-kit',
    badgeColor: 'warning' as const,
  },
  {
    icon: LucideIcons.PanelLeftClose,
    gradient: 'from-orange-500 to-red-500',
    title: 'Pin & Resize',
    description:
      'Pin columns to the left or right edge so they stay visible while scrolling. Drag column borders to resize them to your liking.',
    badge: 'Persistent',
    badgeColor: 'danger' as const,
  },
  {
    icon: LucideIcons.ChevronDown,
    gradient: 'from-pink-500 to-rose-600',
    title: 'Expandable Rows',
    description:
      'Click the chevron to expand a row and reveal a custom React sub-component. Perfect for showing nested data or detail panels.',
    badge: 'renderSubComponent',
    badgeColor: 'info' as const,
  },
  {
    icon: LucideIcons.HardDrive,
    gradient: 'from-cyan-500 to-sky-600',
    title: 'Automatic Persistence',
    description:
      'Column order, width, pinning and visibility are automatically saved to localStorage under the tableId key—zero extra code.',
    badge: 'localStorage',
    badgeColor: 'success' as const,
  },
];

const steps = [
  {
    number: '01',
    title: 'Fetch data',
    description:
      'useStarWarsPeople fetches one page from SWAPI via React Query and prefetches the next.',
    icon: LucideIcons.Download,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    number: '02',
    title: 'Define columns',
    description:
      'useStarWarsColumns returns ColumnDef[] with custom cell renderers and sorting functions.',
    icon: LucideIcons.Columns2,
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    number: '03',
    title: 'Render table',
    description:
      'Pass data + columns to <DataTable>. Configure headerOptions, pagination, and renderSubComponent.',
    icon: LucideIcons.Table,
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-950/30',
  },
  {
    number: '04',
    title: 'Interact & persist',
    description:
      'Users drag, resize, pin and sort. Preferences are automatically saved and restored on next visit.',
    icon: LucideIcons.Save,
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
];

const OverviewSection: React.FC = () => {
  return (
    <>
      {/* What you'll see */}
      <CardContainer>
        <CardTitle title="What You'll See in This Demo" className="mb-4 mt-6">
          <div className="space-y-6">
            <Typography
              tag="p"
              className="text-muted-foreground leading-relaxed"
            >
              This page demonstrates Tucutable connected to a{' '}
              <a
                href="https://swapi.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline font-medium"
              >
                live REST API (SWAPI)
              </a>
              . Every feature below is active in the Live Demo section above —
              try them out and notice how your preferences survive a full page
              refresh.
            </Typography>

            {/* Feature cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map(
                ({
                  icon: Icon,
                  gradient,
                  title,
                  description,
                  badge,
                  badgeColor,
                }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-border p-4 space-y-3 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-linear-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <Typography
                        tag="h4"
                        className="font-semibold text-sm leading-tight"
                      >
                        {title}
                      </Typography>
                    </div>
                    <Typography
                      tag="p"
                      className="text-xs text-muted-foreground leading-relaxed"
                    >
                      {description}
                    </Typography>
                    <Badge color={badgeColor} className="text-xs">
                      {badge}
                    </Badge>
                  </div>
                ),
              )}
            </div>

            <Alert variant="info" dismissible={false}>
              <div className="flex items-start gap-2">
                <LucideIcons.MousePointerClick className="w-4 h-4 shrink-0 mt-0.5" />
                <Typography tag="p" className="text-sm leading-relaxed">
                  <span className="font-semibold">Try it live:</span> Drag
                  column headers to reorder · Drag column borders to resize ·
                  Click the <LucideIcons.Pin className="w-3.5 h-3.5 inline" />{' '}
                  pin icon to lock a column · Click the{' '}
                  <LucideIcons.Eye className="w-3.5 h-3.5 inline" /> visibility
                  button to show/hide columns · Click{' '}
                  <LucideIcons.ChevronRight className="w-3.5 h-3.5 inline" /> to
                  expand a row.
                </Typography>
              </div>
            </Alert>
          </div>
        </CardTitle>
      </CardContainer>

      {/* How it works flow */}
      <CardContainer>
        <CardTitle title="How It Works — Data Flow" className="mb-4 mt-6">
          <div className="space-y-4">
            <Typography tag="p" className="text-muted-foreground">
              Four simple steps from API call to interactive table:
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map(
                ({ number, title, description, icon: Icon, color, bg }, i) => (
                  <div key={number} className="relative">
                    {/* connector line */}
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-border z-0 -translate-x-1/2" />
                    )}
                    <div
                      className={`${bg} rounded-xl p-4 space-y-3 relative z-10`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-border leading-none select-none">
                          {number}
                        </span>
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <Typography tag="h4" className="font-semibold text-sm">
                        {title}
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-muted-foreground leading-relaxed"
                      >
                        {description}
                      </Typography>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default OverviewSection;
