import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/dashboard/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/dashboard/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/dashboard/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/dashboard/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/dashboard/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/dashboard/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
