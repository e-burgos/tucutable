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
    id: 'loading-states',
    label: 'Loading States',
    component: lazy(() => import('./states-ux-sections/LoadingStatesSection')),
  },
  {
    id: 'state-messages',
    label: 'State Messages',
    component: lazy(() => import('./states-ux-sections/StateMessagesSection')),
  },
  {
    id: 'visual-options',
    label: 'Visual Options',
    component: lazy(() => import('./states-ux-sections/VisualOptionsSection')),
  },
];

export function StatesUxGuide() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="States & UX Guide"
          description="Control loading spinners, error states, empty states, fetching indicators, and custom messages. Configure visual density with compact mode, borders, footer, and header visibility."
          customButton={{
            label: 'View on GitHub',
            link: GITHUB_URL,
            target: '_blank',
            variant: 'solid',
            icon: <LucideIcons.Github className="w-4 h-4 mr-2" />,
          }}
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand opacity-80 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <LucideIcons.Activity className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default StatesUxGuide;
