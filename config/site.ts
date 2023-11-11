import {
  BadgeCheck,
  BarChart4,
  FilePlus2,
  Settings,
  Users,
  FileStack
} from 'lucide-react'

export const sidebarNav = {
  top: [
    {
      name: 'Administrar Diagnósticos',
      path: '/diagnostics',
      icon: BarChart4,
      children: [
        {
          name: 'Nuevo Diagnóstico',
          path: '/new',
          permissions: ['Admin', 'Doctor'],
          icon: FilePlus2
        },
        {
          name: 'Todos los Diagnósticos',
          path: '/all',
          permissions: ['Admin', 'Doctor', 'Paciente'],
          icon: FileStack
        }
      ]
    },
    {
      name: 'Administrar Pacientes',
      path: '/patients',
      icon: Users,
      permissions: ['Admin', 'Doctor']
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
      permissions: ['Admin', 'Doctor', 'Paciente']
    }
  ]
}
