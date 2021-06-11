import Admin from "../../components/Admin";
import { GetServerSidePropsContext } from 'next'

export default function DefaultPage() {
    // if (props.restricted)
    //     return props.restricted
    return (
        <Admin breadcrumb={{ page1: "Default", page2: "" }} login={true} >
            <div>hola2</div>
        </Admin>
    )
}

export function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {}
    }
}

