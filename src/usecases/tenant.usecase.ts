import { Tenant, TenantCreate, TenantRepository, TenantUpdate } from "../interfaces/tenant.interface";
import TenantRepositoryPrisma from "../repositories/tenant.repository";

class TenantUseCase {
    private tenantRepository: TenantRepository
    constructor() {
        this.tenantRepository = new TenantRepositoryPrisma()
    }

    async create({ name, email, userId }: TenantCreate): Promise<Tenant> {
        const tenantExists = await this.tenantRepository.findByEmail(email)
        if (tenantExists) {
            throw new Error('You already have a tenant with this email')
        }
        const tenant = await this.tenantRepository.create({ name, email, userId})
        return tenant
    }

    async findAll(): Promise<Tenant[]> {
        const tenants = await this.tenantRepository.findAll()
        return tenants
    }

    async findByEmail(email: string): Promise<Tenant | null> {
        const tenant = await this.tenantRepository.findByEmail(email)
        if (!tenant) {
            throw new Error('User not find')
        }
        return tenant
    }

    async findById(id: string): Promise<Tenant | null> {
        const tenant = await this.tenantRepository.findById(id)
        if (!tenant) {
            throw new Error('User not find')
        }
        return tenant
    }

    async update(id: string, data: TenantUpdate): Promise<Tenant> {
        const { name, email } = data 
        const tenant = await this.tenantRepository.update(id, {
            name,
            email
        })
        return tenant
    }

    async delete(id: string): Promise<void> {
        const tenant = await this.tenantRepository.delete(id)
    }
}

export default TenantUseCase