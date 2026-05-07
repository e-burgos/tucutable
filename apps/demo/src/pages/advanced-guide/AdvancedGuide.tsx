import { lazy } from 'react';
import {
  LucideIcons,
  HeroCard,
  DynamicSectionsPage,
  type SectionConfig,
} from '@e-burgos/tucu-ui';
import { GITHUB_URL } from '../../utils/constants';

const sections: SectionConfig[] = [
  {
    id: 'context-hooks',
    label: 'Context & Hooks',
    component: lazy(() => import('./advanced-sections/ContextHooksSection')),
  },
  {
    id: 'store',
    label: 'Zustand Store',
    component: lazy(() => import('./advanced-sections/StoreSection')),
  },
  {
    id: 'cache',
    label: 'Cache Management',
    component: lazy(() => import('./advanced-sections/CacheSection')),
  },
  {
    id: 'export',
    label: 'Export & Report',
    component: lazy(() => import('./advanced-sections/ExportSection')),
  },
];

export function AdvancedGuide() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="Advanced Guide"
          description="Access table internals via useDataTableContext, manage persistent Zustand store state, reset localStorage cache on schema changes, and collect structured report data for export."
          customButton={{
            label: 'View on GitHub',
            link: GITHUB_URL,
            target: '_blank',
            variant: 'solid',
            icon: <LucideIcons.Github className="w-4 h-4 mr-2" />,
          }}
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand opacity-80 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <LucideIcons.Cpu className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default AdvancedGuide;
