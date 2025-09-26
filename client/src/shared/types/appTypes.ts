//

export interface IUserData {
    id: number
    name: string
    email: string
    avatarUrl: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    dateOfBirth: string | null
    country: string | null
    city: string | null
    timezone: string | null
    language: string | null
    isActive: boolean
    isEmailVerified: boolean
    lastLoginAt: string | null
    lastActivityAt: string | null
    twoFactorSecret: string | null
    twoFactorEnabled: boolean
    preferences: unknown | null
    metadata: unknown | null
    createdAt: string
    updatedAt: string
    roles: string[]
}

export interface IListRoles {
    id: number;
    nameRu: string;
    nameEn: string;
    permissions: string; // можно позже сделать массивом через split(',')
    priority: number;
    color: string;
    description: string;
    createdAt: string; // или Date, если конвертировать при получении
    updatedAt: string; // или Date
}

export interface IAppStore {
    userData?: IUserData,
    auth: boolean,
    listRoles: IListRoles[],
    statics: any,
    enums: any
}