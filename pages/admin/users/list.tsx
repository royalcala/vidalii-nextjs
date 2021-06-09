import { GetServerSidePropsContext } from 'next';
import Users from "../../../models/users"
import { initialDocs } from '../../../util/api.list'
import Admin from '../../../components/Admin'
import List from '../../../components/List'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function UsersList(props: { total: number, data: any[] }) {
    return (
        <Admin breadcrumb={{ page1: "Users", page2: "List Users" }}>
            <List
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
                            <TableCell key="firstname" >
                                {user.firstname}
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

export const getServerSideProps = initialDocs(Users)
