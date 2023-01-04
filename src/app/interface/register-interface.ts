export interface RegisterInterface {
    fname: string,
    lname: string,
    address: string,
    dob: string | null | undefined,
    mobileno: string,
    register_no: string,
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
