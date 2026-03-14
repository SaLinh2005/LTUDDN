import { createBrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import WorkflowBuilderPage from './pages/WorkflowBuilderPage';
import LoginPage from './pages/LoginPage';
import AuditLogPage from './pages/AuditLogPage';
import TemplatesPage from './pages/TemplatesPage';
import CreateTemplatePage from './pages/CreateTemplatePage';
import AutomationPage from './pages/AutomationPage';
import SettingsPage from './pages/SettingsPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/automation',
    element: (
      <ProtectedRoute>
        <AutomationPage />
      </ProtectedRoute>
    ),
  },
 {
    path: '/builder',
    element: <ProtectedRoute><WorkflowBuilderPage /></ProtectedRoute>,
  },
  {
    path: '/audit-log',
    element: (
      <ProtectedRoute>
        <AuditLogPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/templates',
    element: (
      <ProtectedRoute>
        <TemplatesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/templates/create',
    element: (
      <ProtectedRoute>
        <CreateTemplatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
]);