import type { UserRole, NavigationRoute } from '@/types'
import {
  BadgeCheckIcon,
  BarChart4Icon,
  FilePlus2Icon,
  FileStackIcon,
  SettingsIcon,
  UsersIcon
} from 'lucide-react'

export const PROTECTED_ROUTES = {
  '*': ['ADMIN'],
  '/new': ['DOCTOR'],
  '/all': ['DOCTOR', 'PATIENT'],
  '/patients': ['DOCTOR'],
  '/settings': ['DOCTOR', 'PATIENT'],
  '/terms': ['DOCTOR', 'PATIENT']
} satisfies Record<string, UserRole[]>

export const Navigation: NavigationRoute = {
  top: [
    {
      name: 'Administrar Diagnósticos',
      path: '/diagnostics',
      icon: BarChart4Icon,
      children: [
        {
          name: 'Nuevo Diagnóstico',
          path: '/new',
          permissions: ['ADMIN', 'DOCTOR'],
          icon: FilePlus2Icon
        },
        {
          name: 'Todos los Diagnósticos',
          path: '/all',
          permissions: ['ADMIN', 'DOCTOR', 'PATIENT'],
          icon: FileStackIcon
        }
      ]
    },
    {
      name: 'Administrar Pacientes',
      path: '/patients',
      icon: UsersIcon,
      permissions: ['ADMIN', 'DOCTOR']
    },
    {
      name: 'Términos y Condiciones',
      path: '/terms',
      icon: BadgeCheckIcon
    }
  ],
  bottom: [
    {
      name: 'Configuración',
      path: '/settings',
      icon: SettingsIcon,
      permissions: ['ADMIN', 'DOCTOR', 'PATIENT']
    }
  ]
}
