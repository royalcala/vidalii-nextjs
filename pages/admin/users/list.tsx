import { GetServerSidePropsContext } from 'next';
import Users, { Definition as UserDefinition } from "../../../models/users"
import dbConnect from '../../../util/mongodb'
import Admin from '../../../components/Admin'
import List from '../../../components/List'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function UsersList(props: { total: number, users: any[] }) {
    return (
        <Admin breadcrumb={{ page1: "Users", page2: "List Users" }}>
            <List
                totalRows={props.total}
                initialDocs={props.users}
                head={[
                    { label: "firstname", query: (value) => '' }
                ]}
                row={(user: any, index) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            <TableCell key="firstname" >
                                {user.firstname}
                            </TableCell>
                        </TableRow>
                    )
                }
                }
            />
        </Admin>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    await dbConnect()
    const users = await Users.find().limit(25)
    // .skip((page - 1) * limit)
    // .exec();
    console.log(users)
    const total = await Users.countDocuments();
    // .limit(1)
    // .skip((page - 1) * limit)
    // .exec();
    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
            total
        }
    }
}
