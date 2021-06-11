import { GetServerSidePropsContext } from "next";
import cookie from 'cookie';
export const AUTH = 'AUTH'
export function getCookies(context: GetServerSidePropsContext) {
    const cookies = cookie.parse(context.req.headers.cookie || '')
    return {
        "AUTH": cookies[AUTH]
    }
}