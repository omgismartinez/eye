export type Status = 'no dr' | 'leve' | 'moderado' | 'severo' | 'proliferativo'

export type Diagnostic = {
    id: string
    patient: Patient
    prediction: 'no dr' | 'leve' | 'moderado' | 'severo' | 'proliferativo'
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