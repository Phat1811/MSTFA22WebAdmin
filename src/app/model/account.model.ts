export interface Account {
    id: number,
    createdDate: string,
    createdBy?: number,
    fullname: string,
    gender: string,
    birthday: string,
    email: string,
    phone: string,
    avatarImageLink: string,
    address: string,
    roleId: number,
    description?: string,
    status: boolean
}