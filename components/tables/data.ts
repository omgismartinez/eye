import { type Status } from '@/types'

export const predictions: Array<{ label: string, value: Status }> = [
  {
    label: 'No dr',
    value: 'NO_DR'
  },
  {
    label: 'Leve',
    value: 'MILD'
  },
  {
    label: 'Moderada',
    value: 'MODERATE'
  },
  {
    label: 'Severa',
    value: 'SEVERE'
  },
  {
    label: 'Proliferativa',
    value: 'PROLIFERATIVE'
  }
]

export const filters = {
  prediction: [
    { value: 'NO_DR', label: 'No dr' },
    { value: 'MILD', label: 'Leve' },
    { value: 'MODERATE', label: 'Moderada' },
    { value: 'SEVERE', label: 'Severa' },
    { value: 'PROLIFERATIVE', label: 'Proliferativa' }
  ],
  gender: [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' }
  ]
}

export const feikData = [
  {
    id: '1',
    patient: {
      id: '1',
      name: 'Alvaro Martinez Martinez',
      prediction: 'NO_DR',
      image: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=1&face=smileBig',
      birthdate: new Date('5/6/2000'),
      phone: 2721234567,
      email: 'martinez@example.com',
      age: 23,
      gender: 'M',
      address: 'Calle 123',
      occupation: 'Estudiante'
    },
    prediction: 'NO_DR',
    date: '5/6/2023, 2:41:24 p. m.'
  },
  {
    id: '2',
    patient: {
      id: '2',
      name: 'Eduardo Perez Gonzalez',
      prediction: 'MILD',
      image: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=2&face=smileBig',
      birthdate: new Date('12/8/2000'),
      phone: 9876543210,
      email: 'eperez@example.com',
      age: 23,
      gender: 'M',
      address: 'Calle 123',
      occupation: 'Estudiante'
    },
    prediction: 'MILD',
    date: '15/6/2023, 4:41:24 p. m.'
  },
  {
    id: '3',
    patient: {
      id: '3',
      name: 'Miriam Rodriguez Ortiz',
      prediction: 'MODERATE',
      image: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=3&face=smileBig',
      birthdate: new Date('12/3/2002'),
      phone: 7284612340,
      email: 'mrod@example.com',
      age: 21,
      gender: 'F',
      address: 'Calle 123',
      occupation: 'Estudiante'
    },
    prediction: 'MODERATE',
    date: '9/6/2023, 9:01:24 a. m.'
  },
  {
    id: '4',
    patient: {
      id: '4',
      name: 'Maria Perez Alvarado',
      prediction: 'SEVERE',
      image: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=12&face=smileBig',
      birthdate: new Date('5/6/1975'),
      phone: 1234567890,
      email: 'merez@example.com',
      age: 48,
      gender: 'F',
      address: 'Calle 123',
      occupation: 'Ama de casa'
    },
    prediction: 'SEVERE',
    date: '11/6/2023, 7:21:24 a. m.'
  },
  {
    id: '5',
    patient: {
      id: '728ed52f',
      name: 'Juan Perez Estrada',
      prediction: 'PROLIFERATIVE',
      image: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=10&face=smileBig',
      birthdate: new Date('1/1/1956'),
      phone: 1234567890,
      email: 'jperez@example.com',
      age: 86,
      gender: 'M',
      address: 'Calle Circunvalación, #123, Col. Centro, C.P. 94300, Orizaba, Veracruz.',
      occupation: 'Transportista'
    },
    prediction: 'PROLIFERATIVE',
    date: '1/6/2023, 5:21:24 p. m.'
  }
]
