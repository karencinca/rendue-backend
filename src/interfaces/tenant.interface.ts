export interface Tenant {
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    userId: string
}

export interface TenantCreate {
    name: string,
    email: string,
    userId: string
}

export interface TenantUpdate {
    name?: string,
    email?: string,
}

export interface Tenants {
    findAll(): Tenant[]
}

export interface TenantRepository {
    create(data: TenantCreate): Promise<Tenant>
    findAll(): Promise<Tenant[]>
    findByEmail(email: string): Promise<Tenant | null>
    findById(id: string): Promise<Tenant | null>
    update(id: string, data: TenantUpdate): Promise<Tenant>
    delete(id: string): Promise<void>
}