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
    id: 'client-pagination',
    label: 'Client-Side',
    component: lazy(
      () => import('./pagination-sections/ClientPaginationSection'),
    ),
  },
  {
    id: 'server-pagination',
    label: 'Server-Side',
    component: lazy(
      () => import('./pagination-sections/ServerPaginationSection'),
    ),
  },
  {
    id: 'manual-pagination',
    label: 'Manual',
    component: lazy(
      () => import('./pagination-sections/ManualPaginationSection'),
    ),
  },
  {
    id: 'pagination-config',
    label: 'Config Reference',
    component: lazy(
      () => import('./pagination-sections/PaginationConfigSection'),
    ),
  },
];

export function PaginationGuide() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="Pagination Guide"
          description="Three pagination modes in one API: client-side automatic pagination, server-side with external state management, and fully manual control. Every mode respects the same IPaginationOptions interface."
          customButton={{
            label: 'View on GitHub',
            link: GITHUB_URL,
            target: '_blank',
            variant: 'solid',
            icon: <LucideIcons.Github className="w-4 h-4 mr-2" />,
          }}
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand opacity-80 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <LucideIcons.LayoutList className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default PaginationGuide;
