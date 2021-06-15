import Admin from "../../components/Admin";
import { GetServerSidePropsContext } from 'next'
import { ValidateAccessPolicy } from "../../util/auth";


export const accessPolicy = "admin_default"
export default function DefaultPage(props: { access: boolean }) {
    return (
        <Admin breadcrumb={{ page1: "Default", page2: "" }}
            login={{
                access: props.access,
                accessPolicy
            }}
        >
            <div>hola2</div>
        </Admin>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const access = await ValidateAccessPolicy(context, accessPolicy)
    if (access === false)
        return {
            props: {
                access
            }
        }
    return {
        props: {
            access: true
        }
    }
}

