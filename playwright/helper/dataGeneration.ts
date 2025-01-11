import { faker } from '@faker-js/faker';

export const randomEmail = () => {
    return faker.internet.email()
}

export const randomPassword = () => {
    return faker.internet.password({ length: 8 })
}

export const randomName = () => {
    return faker.internet.displayName()
}