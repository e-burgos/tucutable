import { lazy } from 'react';
import {
  HeroCard,
  LucideIcons,
  DynamicSectionsPage,
  type SectionConfig,
} from '@e-burgos/tucu-ui';
import TucuTableLogo from '../../assets/images/table-icon.png';
import { GITHUB_URL } from '../../utils/constants';

const sections: SectionConfig[] = [
  {
    id: 'overview',
    label: 'Overview',
    component: lazy(() => import('./sections/OverviewSection')),
  },
  {
    id: 'live-demo',
    label: 'Live Demo',
    component: lazy(() => import('./sections/LiveDemoSection')),
  },
  {
    id: 'code-examples',
    label: 'Implementation',
    component: lazy(() => import('./sections/CodeExamplesSection')),
  },
];

export function BasicUsage() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="Basic Usage"
          description="Learn how to use Tucutable with real-world data. This example demonstrates server-side pagination, sorting, filtering, and expandable rows using the Star Wars API."
          customButton={{
            label: 'View on GitHub',
            link: GITHUB_URL,
            target: '_blank',
            variant: 'solid',
            icon: <LucideIcons.Github className="w-4 h-4 mr-2" />,
          }}
          icon={
            <img
              alt="Tucutable logo"
              src={TucuTableLogo}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 filter drop-shadow-sm"
            />
          }
        />
      }
    />
  );
}

export default BasicUsage;
