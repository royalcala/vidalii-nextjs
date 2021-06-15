import mongoose from 'mongoose'

export const Definition: mongoose.SchemaDefinition = {
    firstname: {
        type: String,
        required: [true, "Firstname required"]
    },
    lastname: {
        type: String,
        required: [true, "lastname required"]
    },
    password: {
        type: String,
        required: [true, "password required"]
    },
    admin: Boolean,
    groups: [String]
}

export const Schema = new mongoose.Schema(Definition)
