import { useMemo } from 'react';
import { LucideIcons, StandaloneAppRoutesMenuItem } from '@e-burgos/tucu-ui';
import { Introduction } from '../pages/introduction';
import { BasicUsage } from '../pages/basic-usage/index';
import { ColumnGuide } from '../pages/column-guide/ColumnGuide';
import { PaginationGuide } from '../pages/pagination-guide/PaginationGuide';
import { RowFeaturesGuide } from '../pages/row-features-guide/RowFeaturesGuide';
import { HeaderSortingGuide } from '../pages/header-sorting-guide/HeaderSortingGuide';
import { StatesUxGuide } from '../pages/states-ux-guide/StatesUxGuide';
import { StylingGuide } from '../pages/styling-guide/StylingGuide';
import { AdvancedGuide } from '../pages/advanced-guide/AdvancedGuide';
import { ApiReferencePage } from '../pages/api-reference/ApiReferencePage';

export const APP_PATHS = {
  GET_STARTED: {
    path: '/',
    name: 'Get Started',
    icon: <LucideIcons.Home />,
    component: <Introduction />,
    isPublic: true,
    dropdownItems: [
      {
        path: '/basic-usage',
        name: 'Basic Usage',
        icon: <LucideIcons.Table />,
        component: <BasicUsage />,
        enableNestedRoutes: true,
      },
      {
        path: '/api-reference',
        name: 'API Reference',
        icon: <LucideIcons.BookOpen />,
        component: <ApiReferencePage />,
        enableNestedRoutes: true,
      },
    ],
  },
  TUCUTABLE: {
    path: '/tucutable',
    name: 'Tucutable',
    dropdownItems: [
      {
        name: 'Column Guide',
        path: '/tucutable/column-guide',
        icon: <LucideIcons.Columns2 />,
        component: <ColumnGuide />,
        enableNestedRoutes: true,
      },
      {
        name: 'Pagination',
        path: '/tucutable/pagination',
        icon: <LucideIcons.LayoutList />,
        component: <PaginationGuide />,
        enableNestedRoutes: true,
      },
      {
        name: 'Row Features',
        path: '/tucutable/row-features',
        icon: <LucideIcons.Rows3 />,
        component: <RowFeaturesGuide />,
        enableNestedRoutes: true,
      },
      {
        name: 'Header & Sorting',
        path: '/tucutable/header-sorting',
        icon: <LucideIcons.ArrowUpDown />,
        component: <HeaderSortingGuide />,
        enableNestedRoutes: true,
      },
      {
        name: 'States & UX',
        path: '/tucutable/states-ux',
        icon: <LucideIcons.Activity />,
        component: <StatesUxGuide />,
        enableNestedRoutes: true,
      },
      {
        name: 'Styling',
        path: '/tucutable/styling',
        icon: <LucideIcons.Paintbrush />,
        component: <StylingGuide />,
        enableNestedRoutes: true,
      },
      {
        name: 'Advanced',
        path: '/tucutable/advanced',
        icon: <LucideIcons.Cpu />,
        component: <AdvancedGuide />,
        enableNestedRoutes: true,
      },
    ],
  },
};

export const useMenuItems = () => {
  const menuItems: StandaloneAppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: APP_PATHS.GET_STARTED.name,
        path: APP_PATHS.GET_STARTED.path,
        icon: <LucideIcons.Home />,
        component: <Introduction />,
        dropdownItems: [...APP_PATHS.GET_STARTED.dropdownItems],
      },
      {
        name: APP_PATHS.TUCUTABLE.name,
        path: APP_PATHS.TUCUTABLE.path,
        icon: <LucideIcons.TableProperties />,
        component: <ColumnGuide />,
        enableNestedRoutes: true,
        dropdownItems: [...APP_PATHS.TUCUTABLE.dropdownItems],
      },
    ],
    [],
  );

  return { menuItems };
};
