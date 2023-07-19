import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: 'admin@email.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: "Ivan",
        email: 'ivan@admin',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: "Joe Doe",
        email: 'Joe@email.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    },
    {
        name: "Ben Dover",
        email: 'ben@email.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false
    },
]

export default users