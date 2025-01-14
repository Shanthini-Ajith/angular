export interface RegisterInterface {
    fname: string,
    lname: string,
    address: string,
    dob: string | null | undefined,
    mobileno: string,
    register_no: string,
    roles : string,
    email: string,
    password: string
}

export interface CognitoSignup {
    username: string,
    email: string,
    password: string,
    name: string  
}
export interface ConfirmCognitoSignup {
    username: string,
    password: string,
    code: string
}

export interface Signin {
    username: string,
    password: string
}

export interface PermissioData {
    email: string,
    weeks: string,
    industry: string,
    organizationName: string,
    organizationWebsite:string,
    contactName:string,
    contactEmail: string,
    technology: string
}