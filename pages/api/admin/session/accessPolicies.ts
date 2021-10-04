import { NextApiRequest, NextApiResponse } from 'next';
import glob from 'glob'
import { Project } from "ts-morph";

export type AccessPolicies = {
    api:string[],
    admin:string[]
}
export function getAccessPolicies() {
    const project = new Project();
    project.addSourceFilesAtPaths('pages/api/**/*.{tsx,js,ts}');
    const api = glob.sync('pages/api/**/*.{tsx,js,ts}').map(
        (path) => {
            // console.log(path)
            const sourceFile = project.getSourceFile(path);
            // console.log('test: ', sourceFile.getVariableDeclaration('groupAccess')?.getName() || null)          
            return sourceFile?.getVariableDeclaration('accessPolicy')?.getInitializer()?.getText()
        }
    ).filter(group => group !== undefined)
    .map(name => name?.replaceAll('"',""))
    .map(name => name?.replaceAll("'",""))
    const project2 = new Project();
    
    project2.addSourceFilesAtPaths('pages/admin/**/*.{tsx,js,ts}');
    const admin = glob.sync('pages/admin/**/*.{tsx,js,ts}').map(
        (path) => {
            const sourceFile = project2.getSourceFile(path);
            return sourceFile?.getVariableDeclaration('accessPolicy')?.getInitializer()?.getText()
        }
    ).filter(group => group !== undefined)
    .map(name => name?.replaceAll('"',""))
    .map(name => name?.replaceAll("'",""))
    .sort()
    return {
        api, admin
    }
}

export default async function accessPolicies(req: NextApiRequest, res: NextApiResponse) {
    const { api, admin } = getAccessPolicies()
    res.json({ api, admin })
}