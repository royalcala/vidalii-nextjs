import dbConnect from '../../../util/mongodb'
import Users from '../../../models/users'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
export default function EditUser(props: { user: object }) {
    // const router = useRouter()
    // const { editId } = router.query
    // return <p>EditId: {router.query}</p>
    return <div>Edit user</div>
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    await dbConnect()
    const user = await Users.findById(context.query._id)
    return {
        props: {
            user:JSON.parse(JSON.stringify(user))
        }
    }
}