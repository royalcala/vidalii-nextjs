import { GetServerSidePropsContext } from 'next';
import Users from "../../../models/users"
import { ValidateAccessPolicy } from '../../../util/auth'
import dbConnect from '../../../util/db'
import Admin from '../../../components/Admin'
import List from '../../../components/List'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { findMany, PropsFindMany } from '../../../util/getData';

export const accessPolicy = 'admin_users_list'
export default function UsersList(props: PropsFindMany) {
    return (
        <Admin breadcrumb={{ page1: "Users", page2: "List Users" }}
            login={{
                access: props.access,
                accessPolicy
            }}
        >
            <List
                options={true}
                api="/api/admin/users/list"
                totalRows={props.total}
                initialDocs={props.data}
                head={[
                    { label: "firstname", filter: (value) => ({ firstname: value }) },
                    { label: "lastname", filter: (value) => ({ lastname: value }) },
                    { label: "email", filter: (value) => ({ email: value }) }
                ]}
                row={(user: any, index) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            <TableCell key="lastname" >
                                <a target="_blank" href={"/admin/users/edit?_id=" + user._id}>
                                    <OpenInNewIcon />
                                </a>
                            </TableCell>
                            <TableCell key="firstname" >
                                <div>

                                    {user.firstname}

                                </div>

                            </TableCell>
                            <TableCell key="lastname" >
                                {user.lastname}
                            </TableCell>
                            <TableCell key="email" >
                                {user.email}
                            </TableCell>
                        </TableRow>
                    )
                }
                }
            />
        </Admin>
    )
}

export const getServerSideProps = findMany(Users, 25, accessPolicy)
