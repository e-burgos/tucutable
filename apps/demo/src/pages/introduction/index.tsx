import { useMemo } from 'react';
import {
  CardContainer,
  Badge,
  Typography,
  LucideIcons,
  AnchorLink,
  CardTitle,
  CodeBlock,
  Alert,
  HeroCard,
} from '@e-burgos/tucu-ui';
import { DataTable, TanstackTable } from '@e-burgos/tucutable';
import TucuTableLogo from '../../assets/images/table-icon.png';
import { GITHUB_URL } from '../../utils/constants';

interface MockUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
  createdAt: string;
}

const MOCK_USERS: MockUser[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: [
    'Alice Johnson',
    'Bob Smith',
    'Carol White',
    'David Brown',
    'Eva Martinez',
    'Frank Wilson',
    'Grace Lee',
    'Henry Davis',
    'Isla Clark',
    'James Taylor',
  ][i % 10],
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer', 'Manager'][i % 4],
  status: i % 4 === 0 ? 'inactive' : 'active',
  department: ['Engineering', 'Design', 'Marketing', 'Sales', 'Support'][i % 5],
  createdAt: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString('en-US'),
}));

export function Introduction() {
  const columns = useMemo<TanstackTable.ColumnDef<MockUser>[]>(
    () => [
      { accessorKey: 'id', header: 'ID', size: 60 },
      { accessorKey: 'name', header: 'Name', size: 180 },
      { accessorKey: 'email', header: 'Email', size: 220 },
      { accessorKey: 'role', header: 'Role', size: 110 },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        cell: (info: TanstackTable.CellContext<MockUser, unknown>) => {
          const val = info.getValue() as string;
          return (
            <Badge color={val === 'active' ? 'success' : 'gray'}>{val}</Badge>
          );
        },
      },
      { accessorKey: 'department', header: 'Department', size: 140 },
      { accessorKey: 'createdAt', header: 'Created', size: 120 },
    ],
    [],
  );

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroCard
        title="TucuTable"
        description="A modern, comprehensive React data table component library built with TypeScript, Tailwind CSS v4, and TanStack Table. Features advanced column management, drag-and-drop reordering, state persistence, and production-ready functionality."
        backgroundAnimation
        icon={
          <img
            alt="logo"
            src={TucuTableLogo}
            className="w-48 h-48 text-white filter drop-shadow-sm"
          />
        }
        customButton={{
          label: 'View on GitHub',
          link: GITHUB_URL,
          target: '_blank',
          variant: 'solid',
          icon: <LucideIcons.Github className="w-4 h-4 mr-2" />,
        }}
      />

      {/* Key Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Why Choose Tucutable?
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Built with modern best practices and designed for production-ready
            data table applications
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: (
                <LucideIcons.Table className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Advanced Column Management',
              description:
                'Drag & drop reordering, resizing, pinning, visibility toggle, and full column control',
              color: 'from-purple-500 via-purple-600 to-pink-500',
            },
            {
              icon: (
                <LucideIcons.Zap className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Production Ready',
              description:
                'Built on TanStack Table with TypeScript, optimized performance, and battle-tested in real applications',
              color: 'from-orange-500 via-yellow-500 to-amber-500',
            },
            {
              icon: (
                <LucideIcons.Code className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Developer Friendly',
              description:
                'Fully typed with excellent IDE support, comprehensive documentation, and intuitive API',
              color: 'from-blue-500 via-cyan-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.Smartphone className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Responsive & Mobile-First',
              description:
                'Horizontal scrolling, touch-friendly interactions, and seamless behavior across all devices',
              color: 'from-green-500 via-emerald-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.Moon className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Dark & Light Themes',
              description:
                'Native theme support with CSS variables, smooth transitions, and customizable color schemes',
              color: 'from-indigo-500 via-purple-500 to-violet-500',
            },
            {
              icon: (
                <LucideIcons.Database className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'State Persistence',
              description:
                'Automatic state persistence using Zustand with localStorage for column order, sorting, and preferences',
              color: 'from-red-500 via-pink-500 to-rose-500',
            },
            {
              icon: (
                <LucideIcons.Eye className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Accessible',
              description:
                'WCAG 2.1 AA compliant with proper ARIA labels, keyboard navigation, and screen reader support',
              color: 'from-teal-500 via-cyan-500 to-blue-500',
            },
            {
              icon: (
                <LucideIcons.GripVertical className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Rich Features',
              description:
                'Sorting, filtering, pagination, row selection, actions menu, expandable rows, and nested tables',
              color: 'from-amber-500 via-yellow-500 to-orange-500',
            },
          ].map((feature, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-linear-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {feature.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {feature.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-muted-foreground leading-relaxed"
                >
                  {feature.description}
                </Typography>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Technology Foundation" className="mt-2 mb-2">
            <div className="w-full space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    name: 'React 18+',
                    description: 'Modern hooks and concurrent features',
                    icon: '⚛️',
                    color:
                      'bg-linear-to-br from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-200 dark:from-blue-400/20 dark:to-cyan-400/20 dark:text-blue-300 dark:border-blue-700',
                  },
                  {
                    name: 'TypeScript',
                    description:
                      'Full type safety and excellent developer experience',
                    icon: '📘',
                    color:
                      'bg-linear-to-br from-indigo-500/10 to-blue-500/10 text-indigo-700 border-indigo-200 dark:from-indigo-400/20 dark:to-blue-400/20 dark:text-indigo-300 dark:border-indigo-700',
                  },
                  {
                    name: 'TanStack Table',
                    description:
                      'Powerful headless table library for flexible data table functionality',
                    icon: '📊',
                    color:
                      'bg-linear-to-br from-cyan-500/10 to-teal-500/10 text-cyan-700 border-cyan-200 dark:from-cyan-400/20 dark:to-teal-400/20 dark:text-cyan-300 dark:border-cyan-700',
                  },
                  {
                    name: 'Tailwind CSS v4',
                    description:
                      'Latest version with custom theme variables and utility classes',
                    icon: '🎨',
                    color:
                      'bg-linear-to-br from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-200 dark:from-purple-400/20 dark:to-pink-400/20 dark:text-purple-300 dark:border-purple-700',
                  },
                  {
                    name: 'Zustand',
                    description: 'Lightweight state management for persistence',
                    icon: '🗄️',
                    color:
                      'bg-linear-to-br from-emerald-500/10 to-green-500/10 text-emerald-700 border-emerald-200 dark:from-emerald-400/20 dark:to-green-400/20 dark:text-emerald-300 dark:border-emerald-700',
                  },
                  {
                    name: '@dnd-kit',
                    description:
                      'Modern drag and drop toolkit for column reordering',
                    icon: '🔄',
                    color:
                      'bg-linear-to-br from-orange-500/10 to-red-500/10 text-orange-700 border-orange-200 dark:from-orange-400/20 dark:to-red-400/20 dark:text-orange-300 dark:border-orange-700',
                  },
                ].map((tech, index) => (
                  <div
                    key={index}
                    className={`p-4 sm:p-6 border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer ${tech.color}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{tech.icon}</span>
                      <Typography tag="h4" className="font-semibold">
                        {tech.name}
                      </Typography>
                    </div>
                    <Typography tag="p" className="text-sm opacity-80">
                      {tech.description}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Core Features Showcase */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Core Features & Capabilities
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Powerful features designed for modern data table applications with
            advanced customization options
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Data Management Features */}
          <CardContainer>
            <CardTitle title="Data Management" className="mt-2 mb-6">
              <div className="space-y-4">
                <Typography tag="p" className="text-muted-foreground">
                  Comprehensive data handling capabilities:
                </Typography>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      feature: 'Sorting',
                      icon: <LucideIcons.ArrowUpDown className="w-4 h-4" />,
                      desc: 'Multi-column',
                    },
                    {
                      feature: 'Filtering',
                      icon: <LucideIcons.Filter className="w-4 h-4" />,
                      desc: 'Column & global',
                    },
                    {
                      feature: 'Pagination',
                      icon: <LucideIcons.FileText className="w-4 h-4" />,
                      desc: 'Client & server',
                    },
                    {
                      feature: 'Export',
                      icon: <LucideIcons.Download className="w-4 h-4" />,
                      desc: 'Data export',
                    },
                    {
                      feature: 'Selection',
                      icon: <LucideIcons.CheckSquare className="w-4 h-4" />,
                      desc: 'Row selection',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                        {item.icon}
                      </div>
                      <div>
                        <Typography tag="h4" className="font-medium text-sm">
                          {item.feature}
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-xs text-muted-foreground"
                        >
                          {item.desc}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200 dark:border-purple-700">
                  <Typography
                    tag="p"
                    className="text-sm text-purple-700 dark:text-purple-300"
                  >
                    <LucideIcons.Database className="w-4 h-4 inline mr-2" />
                    Full support for client-side and server-side data operations
                    with state persistence
                  </Typography>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Column Management Features */}
          <CardContainer>
            <CardTitle title="Column Management" className="mt-2 mb-6">
              <div className="space-y-4">
                <Typography tag="p" className="text-muted-foreground">
                  Advanced column control and customization:
                </Typography>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <LucideIcons.GripVertical className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Drag & Drop Reordering
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-muted-foreground"
                      >
                        Reorder columns via drag and drop with @dnd-kit
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <LucideIcons.Move className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Column Resizing
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-muted-foreground"
                      >
                        Resize columns with min/max constraints and persistence
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <LucideIcons.Pin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Column Pinning
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-muted-foreground"
                      >
                        Pin columns to left or right for better data visibility
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                      <LucideIcons.Eye className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Visibility Toggle
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-muted-foreground"
                      >
                        Show/hide columns dynamically with persistent state
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-200 dark:border-blue-700">
                  <Typography
                    tag="p"
                    className="text-sm text-blue-700 dark:text-blue-300"
                  >
                    <LucideIcons.Save className="w-4 h-4 inline mr-2" />
                    All column preferences are automatically persisted using
                    Zustand with localStorage
                  </Typography>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-8">
        <CardContainer>
          <CardTitle title="Quick Start" className="mt-2 mb-2">
            <div className="w-full space-y-6">
              <Typography
                tag="p"
                className="text-base sm:text-lg text-muted-foreground"
              >
                Get up and running with Tucutable in minutes:
              </Typography>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Typography
                        tag="span"
                        className="text-sm font-bold text-white"
                      >
                        1
                      </Typography>
                    </div>
                    <Typography tag="h4" className="font-semibold text-heading">
                      Install the package
                    </Typography>
                  </div>
                  <CodeBlock
                    language="bash"
                    code={`npm install @e-burgos/tucutable
# or
pnpm add @e-burgos/tucutable
# or
yarn add @e-burgos/tucutable`}
                  />
                </div>

                {/* Step 2 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Typography
                        tag="span"
                        className="text-sm font-bold text-white"
                      >
                        2
                      </Typography>
                    </div>
                    <Typography tag="h4" className="font-semibold text-heading">
                      Import the styles
                    </Typography>
                  </div>
                  <CodeBlock
                    language="css"
                    code={`/* In your main CSS file */
@import 'tailwindcss';
@import '@e-burgos/tucutable/styles';`}
                  />
                  <Alert variant="info" dismissible={false}>
                    <Typography
                      tag="p"
                      className="text-sm text-muted-foreground"
                    >
                      Tucutable ships with a complete Tailwind CSS v4 setup. No
                      additional Tailwind CSS installation required.
                    </Typography>
                  </Alert>
                </div>

                {/* Step 3 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Typography
                        tag="span"
                        className="text-sm font-bold text-white"
                      >
                        3
                      </Typography>
                    </div>
                    <Typography tag="h4" className="font-semibold text-heading">
                      Define your columns
                    </Typography>
                  </div>
                  <CodeBlock
                    language="tsx"
                    code={`import type { ColumnDef } from '@e-burgos/tucutable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id',    header: 'ID'    },
  { accessorKey: 'name',  header: 'Name'  },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role',  header: 'Role'  },
];`}
                  />
                </div>

                {/* Step 4 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Typography
                        tag="span"
                        className="text-sm font-bold text-white"
                      >
                        4
                      </Typography>
                    </div>
                    <Typography tag="h4" className="font-semibold text-heading">
                      Render the DataTable
                    </Typography>
                  </div>
                  <CodeBlock
                    language="tsx"
                    code={`import { DataTable } from '@e-burgos/tucutable';

export function UsersTable() {
  return (
    <DataTable
      tableId="users-table"
      data={users}
      columns={columns}
      pagination={{
        showPagination: true,
        defaultPageSize: 10,
        showRowsPerPage: true,
      }}
    />
  );
}`}
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Live Demo */}
      <section className="space-y-4">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Live Demo
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A fully functional table with 30 rows. Try sorting columns, changing
            page size, or toggling column visibility from the toolbar.
          </Typography>
        </div>

        <CardContainer>
          <CardTitle title="Users Table" className="mt-2 mb-2">
            <DataTable
              tableId="intro-live-demo"
              data={MOCK_USERS}
              columns={columns}
              pagination={{
                showPagination: true,
                pageSize: 5,
              }}
              headerOptions={{
                enableHideColumns: true,
              }}
            />
          </CardTitle>
        </CardContainer>
      </section>

      {/* What's Next */}
      <section className="space-y-6">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            What's Next?
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Explore all the features Tucutable has to offer
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: (
                <LucideIcons.Columns className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Column Guide',
              description:
                'ColumnDef, sorting, resizing, pinning, drag & drop, visibility, and helper columns',
              path: '/tucutable/column-guide',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: (
                <LucideIcons.FileText className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Pagination',
              description:
                'Client-side, server-side, and manual pagination patterns with real examples',
              path: '/tucutable/pagination',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: (
                <LucideIcons.Rows className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Row Features',
              description:
                'Row actions, multi-select, checkboxes, expandable rows, and nested sub-tables',
              path: '/tucutable/row-features',
              color: 'from-green-500 to-teal-500',
            },
            {
              icon: (
                <LucideIcons.Settings className="w-8 h-8 text-white filter drop-shadow-sm" />
              ),
              title: 'Advanced Usage',
              description:
                'Context, Zustand store, custom providers, cache management, and drag-and-drop',
              path: '/tucutable/advanced-usage',
              color: 'from-orange-500 to-red-500',
            },
          ].map((page) => (
            <AnchorLink to={page.path} key={page.path}>
              <CardContainer className="cursor-pointer hover:shadow-large hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="flex items-start gap-4 p-2">
                  <div
                    className={`p-3 rounded-xl bg-linear-to-br ${page.color} shrink-0`}
                  >
                    {page.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Typography tag="h4" className="font-semibold mb-1">
                      {page.title}
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      {page.description}
                    </Typography>
                  </div>
                  <LucideIcons.ArrowRight className="w-5 h-5 text-muted-foreground self-center shrink-0" />
                </div>
              </CardContainer>
            </AnchorLink>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Introduction;
