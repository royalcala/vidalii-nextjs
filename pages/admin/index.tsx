import Admin from "../../components/Admin";
import { GetServerSidePropsContext } from 'next'
// import { initialDocs, Props } from "./utils/initialDocs";
import Users from '../../models/users'
export default function DefaultPage(props: Props) {
    // if (props.restricted)
    //     return props.restricted
    return (
        <Admin breadcrumb={{ page1: "Default", page2: "" }} login={true} >
            <div>hola2</div>
        </Admin>
    )
}

// export const getServerSideProps = initialDocs(Users, 1)
