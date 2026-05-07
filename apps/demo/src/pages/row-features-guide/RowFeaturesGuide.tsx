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
    id: 'row-actions',
    label: 'Row Actions',
    component: lazy(() => import('./row-features-sections/RowActionsSection')),
  },
  {
    id: 'row-selection',
    label: 'Row Selection',
    component: lazy(
      () => import('./row-features-sections/RowSelectionSection'),
    ),
  },
  {
    id: 'expandable-rows',
    label: 'Expandable Rows',
    component: lazy(
      () => import('./row-features-sections/ExpandableRowsSection'),
    ),
  },
  {
    id: 'row-click',
    label: 'Row Click',
    component: lazy(() => import('./row-features-sections/RowClickSection')),
  },
];

export function RowFeaturesGuide() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="Row Features Guide"
          description="Powerful row-level interactions: contextual action menus, single and multi-row selection, expandable detail panels with sub-tables, and row click callbacks — all declaratively configured via props."
          customButton={{
            label: 'View on GitHub',
            link: GITHUB_URL,
            target: '_blank',
            variant: 'solid',
            icon: <LucideIcons.Github className="w-4 h-4 mr-2" />,
          }}
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand opacity-80 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <LucideIcons.Rows3 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default RowFeaturesGuide;
