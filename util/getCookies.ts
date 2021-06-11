import { GetServerSidePropsContext } from "next";
// import cookie from 'cookie';
export const AUTH = 'AUTH'
export function getCookies(req: GetServerSidePropsContext['req']) {
    // const cookies = cookie.parse(req.headers.cookie || '')
    return {
        "AUTH": req.cookies?.[AUTH]
    }
}