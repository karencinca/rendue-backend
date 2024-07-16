import { users } from './users.routes';
import { properties } from './properties.routes';
import { tenants } from './tenants.routes';
import { rentals } from './rentals.routes';

import { app } from '../server';

export async function routes() {
    app.register(users, {
        prefix: '/users'
    })
    
    app.register(properties, {
        prefix: '/properties'
    })
    
    app.register(tenants, {
        prefix: '/tenants'
    })
    
    app.register(rentals, {
        prefix: '/rentals'
    })
}
