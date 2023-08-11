import { Diagnostic, Status } from '@/types'

export const predictions: { label: string, value: Status }[] = [
    {
        label: 'No dr',
        value: 'no dr',
    },
    {
        label: 'Leve',
        value: 'leve',
    },
    {
        label: 'Moderada',
        value: 'moderada',
    },
    {
        label: 'Severa',
        value: 'severa',
    },
    {
        label: 'Proliferativa',
        value: 'proliferativa',
    },
]

export const feikData: Diagnostic[] = [
    {
        id: '1',
        patient: {
            id: '1',
            name: 'Alvaro Martinez Martinez',
            prediction: 'no dr',
            image: 'https://avatars.dicebear.com/api/open-peeps/1.svg',
            birthdate: new Date('5/6/2000'),
            phone: 2721234567,
            email: 'martinez@example.com',
            age: 23,
            gender: 'M',
            address: 'Calle 123',
            occupation: 'Estudiante',
        },
        prediction: 'no dr',
        date: '5/6/2023, 2:41:24 p. m.'
    },
    {
        id: '2',
        patient: {
            id: '2',
            name: 'Eduardo Perez Gonzalez',
            prediction: 'leve',
            image: 'https://avatars.dicebear.com/api/open-peeps/2.svg',
            birthdate: new Date('12/8/2000'),
            phone: 9876543210,
            email: 'eperez@example.com',
            age: 23,
            gender: 'M',
            address: 'Calle 123',
            occupation: 'Estudiante',
        },
        prediction: 'leve',
        date: '15/6/2023, 4:41:24 p. m.'
    },
    {
        id: '3',
        patient: {
            id: '3',
            name: 'Miriam Rodriguez Ortiz',
            prediction: 'moderada',
            image: 'https://avatars.dicebear.com/api/open-peeps/3.svg',
            birthdate: new Date('12/3/2002'),
            phone: 7284612340,
            email: 'mrod@example.com',
            age: 21,
            gender: 'F',
            address: 'Calle 123',
            occupation: 'Estudiante',
        },
        prediction: 'moderada',
        date: '9/6/2023, 9:01:24 a. m.'
    },
    {
        id: '4',
        patient: {
            id: '4',
            name: 'Maria Perez Alvarado',
            prediction: 'severa',
            image: 'https://avatars.dicebear.com/api/open-peeps/12.svg',
            birthdate: new Date('5/6/1975'),
            phone: 1234567890,
            email: 'merez@example.com',
            age: 48,
            gender: 'F',
            address: 'Calle 123',
            occupation: 'Ama de casa',
        },
        prediction: 'severa',
        date: '11/6/2023, 7:21:24 a. m.'
    },
    {
        id: '5',
        patient: {
            id: '728ed52f',
            name: 'Juan Perez Estrada',
            prediction: 'proliferativa',
            image: 'https://avatars.dicebear.com/api/open-peeps/10.svg',
            birthdate: new Date('1/1/1956'),
            phone: 1234567890,
            email: 'jperez@example.com',
            age: 86,
            gender: 'M',
            address: 'Calle Circunvalación, #123, Col. Centro, C.P. 94300, Orizaba, Veracruz.',
            occupation: 'Transportista',
        },
        prediction: 'proliferativa',
        date: '1/6/2023, 5:21:24 p. m.'
    },
]