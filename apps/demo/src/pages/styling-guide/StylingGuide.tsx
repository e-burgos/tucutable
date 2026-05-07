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
    id: 'sx-styles',
    label: 'sx Prop',
    component: lazy(() => import('./styling-sections/SxStylesSection')),
  },
  {
    id: 'theming',
    label: 'Theming & Mode',
    component: lazy(() => import('./styling-sections/ThemingSection')),
  },
  {
    id: 'layout-options',
    label: 'Layout Options',
    component: lazy(() => import('./styling-sections/LayoutOptionsSection')),
  },
];

export function StylingGuide() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="Styling Guide"
          description="Customize every part of the table with the sx prop — wrapper, container, header, rows, cells, and pagination. Override the color mode independently or use CSS variables for deep theme integration."
          customButton={{
            label: 'View on GitHub',
            link: GITHUB_URL,
            target: '_blank',
            variant: 'solid',
            icon: <LucideIcons.Github className="w-4 h-4 mr-2" />,
          }}
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand opacity-80 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <LucideIcons.Paintbrush className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default StylingGuide;
