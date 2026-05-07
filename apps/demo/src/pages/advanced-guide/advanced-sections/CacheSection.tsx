import {
  Typography,
  CardContainer,
  CardTitle,
  CodeBlock,
  Alert,
} from '@e-burgos/tucu-ui';

const codeBasicCache = `import { useResetCacheVersion } from '@e-burgos/tucutable';

function MyTable() {
  // Returns true if the cache was reset, false if version matched
  const wasReset = useResetCacheVersion('users-table', {
    version: 2,  // Increment this when column schema changes
    onSuccess: () => console.log('Cache cleared — schema updated'),
    onError: (error) => console.error('Cache reset failed:', error),
  });

  return (
    <DataTable
      tableId="users-table"
      data={data}
      columns={columns}
    />
  );
}`;

const codeHowItWorks = `// How useResetCacheVersion works internally:
// 1. Reads stored version from Zustand store: 'datatable-cache-versions'
// 2. Compares options.version with stored version
// 3. If different:
//    - Clears localStorage.removeItem('{tableId}-datatable')
//    - Updates the stored version to options.version
//    - Calls options.onSuccess()
//    - Returns true
// 4. If same:
//    - No-op
//    - Returns false

// The cache version store key: 'datatable-cache-versions'
// The table store key: '{tableId}-datatable'`;

const codeWhenToUse = `// Bump the version when any of these change:
// - A column is added or removed
// - An accessorKey is changed
// - Column types change significantly
// - Default sort/pagination changes

// Version 1: original columns
const columns_v1 = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

// Version 2: added 'role' column
const columns_v2 = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },  // NEW
];

function UsersTableV2() {
  useResetCacheVersion('users-table', { version: 2 });
  return <DataTable tableId="users-table" data={data} columns={columns_v2} />;
}`;

const codeManualClear = `// For debugging or testing, manually clear a table's cache:

// Option 1: Using the store directly
import { useDataTableStore } from '@e-burgos/tucutable';

const { resetStoreData } = useDataTableStore('my-table-id');
resetStoreData();

// Option 2: Direct localStorage manipulation
localStorage.removeItem('my-table-id-datatable');
window.location.reload(); // Optional: hard refresh`;

function CacheSection() {
  return (
    <div className="space-y-8">
      <div>
        <Typography tag="h2" className="text-2xl font-bold mb-2">
          Cache Management
        </Typography>
        <Typography tag="p" className="text-muted">
          Tucutable persists table state (sort, filters, column order,
          visibility, sizes) to localStorage. When your column schema changes,
          use <code>useResetCacheVersion</code> to invalidate stale persisted
          state automatically.
        </Typography>
      </div>

      {/* Basic Usage */}
      <CardContainer>
        <CardTitle title="useResetCacheVersion">
          <div className="px-4 pb-4 space-y-4">
            <Alert>
              <Typography tag="p" className="text-sm">
                Call <code>useResetCacheVersion</code> in the same component
                as (or a parent of) the <code>DataTable</code>. It must run
                before the table mounts to prevent stale state from being
                applied.
              </Typography>
            </Alert>
            <CodeBlock language="tsx" code={codeBasicCache} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* How it works */}
      <CardContainer>
        <CardTitle title="How It Works">
          <div className="px-4 pb-4 space-y-4">
            <CodeBlock language="tsx" code={codeHowItWorks} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* When to bump */}
      <CardContainer>
        <CardTitle title="When to Bump the Version">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              Increment <code>version</code> whenever the column schema
              changes in a way that would make old persisted state invalid
              or confusing.
            </Typography>
            <CodeBlock language="tsx" code={codeWhenToUse} />
          </div>
        </CardTitle>
      </CardContainer>

      {/* Manual Clear */}
      <CardContainer>
        <CardTitle title="Manual Cache Clear">
          <div className="px-4 pb-4 space-y-4">
            <Typography tag="p" className="text-sm text-muted">
              For debugging or "Reset layout" features, clear the cache
              programmatically without version bumping.
            </Typography>
            <CodeBlock language="tsx" code={codeManualClear} />
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
}

export default CacheSection;
