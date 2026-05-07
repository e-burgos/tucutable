import {
  Typography,
  CardContainer,
  CardTitle,
  BasicTable,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const cssVarsData = [
  {
    variable: '--color-table-primary',
    description: 'Primary accent color (sort arrows, active states).',
  },
  {
    variable: '--color-table-primary-text',
    description: 'Text color on primary-colored elements.',
  },
  {
    variable: '--color-table-secondary-text',
    description: 'Secondary/muted text color.',
  },
  {
    variable: '--color-table-box-bg',
    description: 'Background of the table container.',
  },
  {
    variable: '--color-table-header-bg',
    description: 'Background color of the header row.',
  },
  {
    variable: '--color-table-row-expanded-bg',
    description: 'Background of expanded sub-component rows.',
  },
  {
    variable: '--color-table-divider',
    description: 'Border/divider color between rows and columns.',
  },
];

const cssVarsColumns = [
  { key: 'variable', label: 'CSS Variable' },
  { key: 'description', label: 'Description' },
];

const codeModeOverride = `// Override mode for a single table
// 'dark' or 'light' — independent of the app ThemeProvider
<DataTable
  tableId="dark-island"
  data={data}
  columns={columns}
  mode="dark"
/>`;

const codeCssVars = `/* In your global CSS or component stylesheet
   Override tucutable CSS variables to match your brand */
:root {
  --color-table-primary: #6366f1;          /* indigo */
  --color-table-primary-text: #ffffff;
  --color-table-secondary-text: #6b7280;
  --color-table-box-bg: #ffffff;
  --color-table-header-bg: #f9fafb;
  --color-table-row-expanded-bg: #eff6ff;
  --color-table-divider: #e5e7eb;
}

/* Dark mode overrides */
.dark {
  --color-table-box-bg: #1f2937;
  --color-table-header-bg: #111827;
  --color-table-divider: #374151;
  --color-table-secondary-text: #9ca3af;
}`;

const codeTailwindInt = `/* Integrate tucutable with your Tailwind config (tailwind.config.ts)
   Map your design tokens to tucutable CSS vars */
@layer base {
  :root {
    --color-table-primary: theme(colors.violet.600);
    --color-table-header-bg: theme(colors.slate.50);
    --color-table-divider: theme(colors.slate.200);
    --color-table-box-bg: theme(colors.white);
  }
  .dark {
    --color-table-primary: theme(colors.violet.400);
    --color-table-header-bg: theme(colors.slate.800);
    --color-table-divider: theme(colors.slate.700);
    --color-table-box-bg: theme(colors.slate.900);
  }
}`;

const codeImport = `// CSS import (required) — tucutable styles come from the package
// In your main.tsx or App.tsx:
import '@e-burgos/tucutable/styles';

// Or in your global CSS:
// @import '@e-burgos/tucutable/styles';`;

function ThemingSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Theming & Mode
        </Typography>
        <Typography tag="p" className="text-muted">
          Tucutable integrates with your app's Tailwind / CSS theme via CSS
          custom properties. Override the <code>--color-table-*</code> variables
          globally or scope them to specific selectors. Use the{' '}
          <code>mode</code> prop for per-table light/dark override.
        </Typography>
      </div>

      {/* CSS Import */}
      <CardContainer>
        <CardTitle title="Required CSS Import">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                Always import tucutable styles before using any table. Without
                this, the table will render unstyled.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeImport} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Mode Override */}
      <CardContainer>
        <CardTitle title="Per-Table Mode Override">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              The <code>mode</code> prop overrides the app-level theme mode for
              this specific table instance. Other tables remain unaffected.
            </Typography>
            <CodeBlock language="tsx" code={codeModeOverride} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* CSS Variables */}
      <CardContainer>
        <CardTitle title="CSS Variables Reference">
          <div className="px-4 pb-4 space-y-4">
            <BasicTable
              columns={cssVarsColumns.map((col) => ({
                ...col,
                render: (value: unknown, row: Record<string, unknown>) => {
                  if (col.key === 'variable') {
                    return (
                      <code className="text-xs bg-muted/10 px-1 py-0.5 rounded">
                        {String(value)}
                      </code>
                    );
                  }
                  return (
                    <span className="text-sm">
                      {String(row['description'] ?? value)}
                    </span>
                  );
                },
              }))}
              data={cssVarsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

      {/* CSS Override */}
      <CardContainer>
        <CardTitle title="Override CSS Variables">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Override variables in your global CSS to match your brand colors.
              Add dark mode overrides inside a <code>.dark</code> selector.
            </Typography>
            <CodeBlock language="css" code={codeCssVars} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Tailwind Integration */}
      <CardContainer>
        <CardTitle title="Tailwind Integration">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Map tucutable variables to Tailwind design tokens using{' '}
              <code>theme()</code> for automatic sync when you update your
              Tailwind config.
            </Typography>
            <CodeBlock language="css" code={codeTailwindInt} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default ThemingSection;
