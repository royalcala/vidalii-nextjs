

const groups: {
    [key: string]: {
        admin: {
            [key: string]: string
        },
        api: {
            [key: string]: string
        }
    }
} = {}

groups.users = {
    admin: {
        edit: "admin.users.edit",
        list: "admin.users.list",
        new: "admin.users.new"
    },
    api: {
        edit: "api.users.edit",
        list: "api.users.list",
        new: "api.users.new"
    }
}

export default groups
