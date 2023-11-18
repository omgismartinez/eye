import { type UserRole, type NavigationRoute } from '@/types'
import {
  BadgeCheck,
  BarChart4,
  FilePlus2,
  Settings,
  Users,
  FileStack
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
      icon: BarChart4,
      children: [
        {
          name: 'Nuevo Diagnóstico',
          path: '/new',
          permissions: ['ADMIN', 'DOCTOR'],
          icon: FilePlus2
        },
        {
          name: 'Todos los Diagnósticos',
          path: '/all',
          permissions: ['ADMIN', 'DOCTOR', 'PATIENT'],
          icon: FileStack
        }
      ]
    },
    {
      name: 'Administrar Pacientes',
      path: '/patients',
      icon: Users,
      permissions: ['ADMIN', 'DOCTOR']
    },
    {
      name: 'Términos y Condiciones',
      path: '/terms',
      icon: BadgeCheck
    }
  ],
  bottom: [
    {
      name: 'Configuración',
      path: '/settings',
      icon: Settings,
      permissions: ['ADMIN', 'DOCTOR', 'PATIENT']
    }
  ]
}
