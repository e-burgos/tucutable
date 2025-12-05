import { useMemo } from 'react';
import { LucideIcons, type AppRoutesMenuItem } from '@e-burgos/tucu-ui';
import { Introduction } from '../pages/introduction';
import { ThemingGuide } from '../pages/ThemingGuide';

export const useMenuItems = () => {
  const menuItems: AppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: 'Introduction',
        href: '/',
        icon: <LucideIcons.Home />,
        component: <Introduction />,
      },
      {
        name: 'Theming',
        href: '/theming-guide',
        icon: <LucideIcons.Paintbrush />,
        component: <ThemingGuide />,
      },
    ],
    []
  );

  return { menuItems };
};
