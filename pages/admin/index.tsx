import Admin from "../../components/Admin";
import { GetServerSidePropsContext } from 'next'

export default function DefaultPage(props: any) {
    return (
        <Admin breadcrumb={{ page1: "Default", page2: "" }} login={true} >
            <div>hola2</div>
        </Admin>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    console.log("******running in server2")
    return {
        props: {}
    }
}
