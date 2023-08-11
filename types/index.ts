export type Status = 'no dr' | 'leve' | 'moderada' | 'severa' | 'proliferativa'

export type Diagnostic = {
    id: string
    patient: Patient
    prediction: Status
    date: string
}

export type Patient = {
    id: string
    name: string
    prediction: Status
    image: string
    birthdate: Date
    phone: number
    email: string
    age: number
    gender: 'M' | 'F'
    address: string
    occupation: string
}