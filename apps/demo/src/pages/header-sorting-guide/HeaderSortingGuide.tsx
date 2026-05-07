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
    id: 'header-options',
    label: 'Header Options',
    component: lazy(
      () => import('./header-sorting-sections/HeaderOptionsSection'),
    ),
  },
  {
    id: 'sorting',
    label: 'Sorting',
    component: lazy(() => import('./header-sorting-sections/SortingSection')),
  },
  {
    id: 'column-controls',
    label: 'Column Controls',
    component: lazy(
      () => import('./header-sorting-sections/ColumnControlsSection'),
    ),
  },
];

export function HeaderSortingGuide() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="Header & Sorting Guide"
          description="Configure the table header toolbar with column visibility toggles, pinning controls, resize handles, and drag-to-reorder. Add client-side or server-side sorting with multi-column support."
          customButton={{
            label: 'View on GitHub',
            link: GITHUB_URL,
            target: '_blank',
            variant: 'solid',
            icon: <LucideIcons.Github className="w-4 h-4 mr-2" />,
          }}
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand opacity-80 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <LucideIcons.ArrowUpDown className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default HeaderSortingGuide;
