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
    id: 'playground',
    label: 'Live Playground',
    component: lazy(() => import('./api-reference-sections/PlaygroundSection')),
  },
  {
    id: 'datatable-props',
    label: 'DataTable Props',
    component: lazy(
      () => import('./api-reference-sections/DataTablePropsSection'),
    ),
  },
  {
    id: 'types',
    label: 'Types Reference',
    component: lazy(() => import('./api-reference-sections/TypesSection')),
  },
];

export function ApiReferencePage() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="API Reference"
          description="Complete reference for DataTable props, types, and interfaces. Use the live playground to experiment with every prop in real time."
          customButton={{
            label: 'View on GitHub',
            link: GITHUB_URL,
            target: '_blank',
            variant: 'solid',
            icon: <LucideIcons.Github className="w-4 h-4 mr-2" />,
          }}
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand opacity-80 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <LucideIcons.BookOpen className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default ApiReferencePage;
