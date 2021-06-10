import mongoose from 'mongoose'
const validateEmail = function (email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
export const Definition: mongoose.SchemaDefinition = {
    firstname: {
        type: String,
        required: [true, "Firstname required"]
    },
    lastname: {
        type: String,
        required: [true, "lastname required"]
    },
    email: {
        type: String,
        required: [true, "email required"],
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, "password required"]
    },
    groups: [String]
}

export const Schema = new mongoose.Schema(Definition)
export default mongoose.models.Users || mongoose.model('Users', Schema)
//export default User //mongoose.model('Users', Schema)

// UserSchema.pre("save", async function () {
//     try {
//       const User = this.constructor;
//       const userExists = await User.find({
//         userName: this.get("userName"),
//       })
//         .lean()
//         .exec();
//       if (userExists.length > 0) {
//         throw new Error(errorHandler.errors.REGISTER_USERNAME_EXISTS);
//       }
//     } catch (err) {
//       throw new Error(errorHandler.errors.REGISTER_USERNAME_EXISTS);
//     }
//   });
// const PetSchema = new mongoose.Schema({
//     name: {
//       /* The name of this pet */

//       type: String,
//       required: [true, 'Please provide a name for this pet.'],
//       maxlength: [20, 'Name cannot be more than 60 characters'],
//     },
//     owner_name: {
//       /* The owner of this pet */

//       type: String,
//       required: [true, "Please provide the pet owner's name"],
//       maxlength: [20, "Owner's Name cannot be more than 60 characters"],
//     },
//     species: {
//       /* The species of your pet */

//       type: String,
//       required: [true, 'Please specify the species of your pet.'],
//       maxlength: [30, 'Species specified cannot be more than 40 characters'],
//     },
//     age: {
//       /* Pet's age, if applicable */

//       type: Number,
//     },
//     poddy_trained: {
//       /* Boolean poddy_trained value, if applicable */

//       type: Boolean,
//     },
//     diet: {
//       /* List of dietary needs, if applicable */

//       type: Array,
//     },
//     image_url: {
//       /* Url to pet image */

//       required: [true, 'Please provide an image url for this pet.'],
//       type: String,
//     },
//     likes: {
//       /* List of things your pet likes to do */

//       type: Array,
//     },
//     dislikes: {
//       /* List of things your pet does not like to do */

//       type: Array,
//     },
//   })
