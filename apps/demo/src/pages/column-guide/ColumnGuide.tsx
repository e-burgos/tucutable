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
    id: 'basic-columns',
    label: 'Basic Columns',
    component: lazy(
      () => import('./column-guide-sections/BasicColumnsSection'),
    ),
  },
  {
    id: 'column-features',
    label: 'Column Features',
    component: lazy(
      () => import('./column-guide-sections/ColumnFeaturesSection'),
    ),
  },
  {
    id: 'special-columns',
    label: 'Special Columns',
    component: lazy(
      () => import('./column-guide-sections/SpecialColumnsSection'),
    ),
  },
  {
    id: 'convert-columns',
    label: 'Convert & Config',
    component: lazy(
      () => import('./column-guide-sections/ConvertColumnsSection'),
    ),
  },
];

export function ColumnGuide() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="Column Guide"
          description="Define and customize columns using TanStack Table ColumnDef format with tucutable-specific extensions. Covers accessors, custom renderers, feature toggles, built-in helper columns, and migration utilities."
          customButton={{
            label: 'View on GitHub',
            link: GITHUB_URL,
            target: '_blank',
            variant: 'solid',
            icon: <LucideIcons.Github className="w-4 h-4 mr-2" />,
          }}
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand opacity-80 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <LucideIcons.Columns2 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default ColumnGuide;
