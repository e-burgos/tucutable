import {
  CardContainer,
  Button,
  Badge,
  Typography,
  LucideIcons,
  AnchorLink,
  CardTitle,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';
import HeroPage from '../../components/HeroPage';
import TucuTableLogo from '../../assets/images/table-icon.png';
import { DOCUMENTATION_URL, EXAMPLES_DOCS_URL } from '../../utils/constants';

export function Introduction() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        description="A modern, comprehensive React data table component library built with TypeScript, Tailwind CSS v4, and TanStack Table. Features advanced column management, drag-and-drop reordering, state persistence, and production-ready functionality. Designed for developers who need powerful, customizable data tables with sophisticated features."
        githubButton
        getStartedButton
        backgroundAnimation
        icon={
          <img
            src={TucuTableLogo}
            className="w-48 h-48 text-white filter drop-shadow-sm"
          />
        }
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
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
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
                    className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
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
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
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
                      'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-200 dark:from-blue-400/20 dark:to-cyan-400/20 dark:text-blue-300 dark:border-blue-700',
                  },
                  {
                    name: 'TypeScript',
                    description:
                      'Full type safety and excellent developer experience',
                    icon: '📘',
                    color:
                      'bg-gradient-to-br from-indigo-500/10 to-blue-500/10 text-indigo-700 border-indigo-200 dark:from-indigo-400/20 dark:to-blue-400/20 dark:text-indigo-300 dark:border-indigo-700',
                  },
                  {
                    name: 'TanStack Table',
                    description:
                      'Powerful headless table library for flexible data table functionality',
                    icon: '📊',
                    color:
                      'bg-gradient-to-br from-cyan-500/10 to-teal-500/10 text-cyan-700 border-cyan-200 dark:from-cyan-400/20 dark:to-teal-400/20 dark:text-cyan-300 dark:border-cyan-700',
                  },
                  {
                    name: 'Tailwind CSS v4',
                    description:
                      'Latest version with custom theme variables and utility classes',
                    icon: '🎨',
                    color:
                      'bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-200 dark:from-purple-400/20 dark:to-pink-400/20 dark:text-purple-300 dark:border-purple-700',
                  },
                  {
                    name: 'Zustand',
                    description: 'Lightweight state management for persistence',
                    icon: '🗄️',
                    color:
                      'bg-gradient-to-br from-emerald-500/10 to-green-500/10 text-emerald-700 border-emerald-200 dark:from-emerald-400/20 dark:to-green-400/20 dark:text-emerald-300 dark:border-emerald-700',
                  },
                  {
                    name: '@dnd-kit',
                    description:
                      'Modern drag and drop toolkit for column reordering',
                    icon: '🔄',
                    color:
                      'bg-gradient-to-br from-orange-500/10 to-red-500/10 text-orange-700 border-orange-200 dark:from-orange-400/20 dark:to-red-400/20 dark:text-orange-300 dark:border-orange-700',
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
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
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
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
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
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                        {item.icon}
                      </div>
                      <div>
                        <Typography tag="h4" className="font-medium text-sm">
                          {item.feature}
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-xs text-gray-500 dark:text-gray-400"
                        >
                          {item.desc}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200 dark:border-purple-700">
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
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Advanced column control and customization:
                </Typography>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <LucideIcons.GripVertical className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Drag & Drop Reordering
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        Reorder columns via drag and drop with @dnd-kit
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <LucideIcons.Move className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Column Resizing
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        Resize columns with min/max constraints and persistence
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <LucideIcons.Pin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Column Pinning
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        Pin columns to left or right for better data visibility
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                      <LucideIcons.Eye className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <Typography tag="h4" className="font-medium text-sm">
                        Visibility Toggle
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        Show/hide columns dynamically with persistent state
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-200 dark:border-blue-700">
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
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300"
              >
                Get up and running with Tucutable in minutes:
              </Typography>

              <div className="space-y-6">
                {/* Installation */}
                <div className="space-y-3">
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    1. Installation
                  </Typography>
                  <CodeBlock
                    language="bash"
                    code={`npm install @e-burgos/tucutable
# or
pnpm install @e-burgos/tucutable`}
                  />
                </div>

                {/* Import Styles */}
                <div className="space-y-3">
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    2. Import Styles
                  </Typography>
                  <CodeBlock
                    language="css"
                    code={`/* In your main CSS file */
@import '@e-burgos/tucutable/styles';`}
                  />
                  <Alert variant="info" dismissible={false}>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Tucutable includes a complete Tailwind CSS v4 setup. No
                      additional Tailwind CSS installation required.
                    </Typography>
                  </Alert>
                </div>

                {/* Basic Usage */}
                <div className="space-y-3">
                  <Typography
                    tag="h4"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    3. Basic Usage
                  </Typography>
                  <CodeBlock
                    language="tsx"
                    code={`import { DataTable, TanstackTable } from '@e-burgos/tucutable';

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: TanstackTable.ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

function MyTable() {
  return (
    <DataTable
      tableId="users-table"
      data={data}
      columns={columns}
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

      {/* Feature Categories */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Feature Overview
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore the comprehensive features and capabilities of Tucutable
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              icon: (
                <LucideIcons.Table className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Data Display',
              description: 'Render tabular data with customizable columns',
              count: 'Core',
              bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.ArrowUpDown className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Sorting',
              description: 'Single and multi-column sorting with persistence',
              count: 'Advanced',
              bgColor:
                'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Filter className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Filtering',
              description: 'Column-level and global search functionality',
              count: 'Advanced',
              bgColor:
                'bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.FileText className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Pagination',
              description: 'Client-side, server-side, and manual pagination',
              count: 'Core',
              bgColor:
                'bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.GripVertical className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Column Management',
              description: 'Reorder, resize, pin, and toggle visibility',
              count: 'Advanced',
              bgColor: 'bg-gradient-to-br from-red-500 to-pink-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.CheckSquare className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Row Features',
              description: 'Selection, actions, expandable rows, nested tables',
              count: 'Advanced',
              bgColor:
                'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Download className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Export',
              description: 'Export data with formatting and headers',
              count: 'Core',
              bgColor:
                'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg',
            },
            {
              icon: (
                <LucideIcons.Settings className="w-6 h-6 text-white filter drop-shadow-sm" />
              ),
              title: 'Customization',
              description:
                'Extensive props, styling, and configuration options',
              count: 'Core',
              bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg',
            },
          ].map((category, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-full space-y-4 text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-xl ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                >
                  {category.icon}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Typography tag="h4" className="font-semibold">
                      {category.title}
                    </Typography>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    {category.description}
                  </Typography>
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <CardContainer>
          <CardTitle
            title="What's Next?"
            className="mt-2 mb-2 dark:border-current"
          >
            <div className="flex items-start gap-4">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Ready to dive deeper? Explore our comprehensive documentation
                  to learn more about:
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">
                        Complete component API with 26+ props and detailed
                        examples
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">
                        Advanced column management with drag & drop, resizing,
                        and pinning
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">
                        State persistence with Zustand and localStorage
                        integration
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <LucideIcons.Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">
                        Customization options including theming, styling, and
                        behavior configuration
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap sm:flex-row gap-3 pt-2">
                  <Button size="medium">
                    <AnchorLink to={DOCUMENTATION_URL} target="_blank">
                      <div className="flex justify-center items-center ">
                        <LucideIcons.BookOpen className="w-4 h-4 mr-2" />
                        Browse Documentation
                      </div>
                    </AnchorLink>
                  </Button>
                  <Button variant="ghost" size="medium">
                    <AnchorLink to={`${EXAMPLES_DOCS_URL}`} target="_blank">
                      <div className="flex justify-center items-center">
                        <LucideIcons.Code className="w-4 h-4 mr-2" />
                        View Examples
                      </div>
                    </AnchorLink>
                  </Button>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
