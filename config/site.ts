<<<<<<< HEAD
import { type NavigationRoute } from '@/types'
=======
import { type UserRole, type NavigationRoute } from '@/types'
>>>>>>> 4f9e9bb18e1155d34d7dd282f2f3c2a74c1081a5
import {
  BadgeCheck,
  BarChart4,
  FilePlus2,
  Settings,
  Users,
  FileStack
} from 'lucide-react'

<<<<<<< HEAD
=======
export const PROTECTED_ROUTES = {
  '*': ['ADMIN'],
  '/new': ['DOCTOR'],
  '/all': ['DOCTOR', 'PATIENT'],
  '/patients': ['DOCTOR'],
  '/settings': ['DOCTOR', 'PATIENT'],
  '/terms': ['DOCTOR', 'PATIENT']
} satisfies Record<string, UserRole[]>

>>>>>>> 4f9e9bb18e1155d34d7dd282f2f3c2a74c1081a5
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
