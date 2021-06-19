import { apiFindMany } from '../../../../util/getData'
import {Users} from'../../../../entities/admin/Users'


export const accessPolicy = "api_admin_users_list"
export default apiFindMany(Users, accessPolicy)
