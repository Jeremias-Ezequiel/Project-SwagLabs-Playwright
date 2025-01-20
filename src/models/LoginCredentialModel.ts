const passwordForAllUsers = 'secret_sauce'; 

export interface UserCredential {
    username : string,
    password : string
}

export const validCredential : UserCredential = {
    username : 'standard_user',
    password :  passwordForAllUsers
}

export const validUsersCredentials : Array<UserCredential> = [
    {
        username : 'standard_user',
        password : passwordForAllUsers
    },
    {
        username : 'locked_out_user',
        password : passwordForAllUsers
    },
    {
        username : 'problem_user',
        password : passwordForAllUsers
    },
    {
        username : 'performance_glitch_user',
        password : passwordForAllUsers
    },
    {
        username : 'error_user',
        password : passwordForAllUsers
    },
    {
        username : 'visual_user',
        password : passwordForAllUsers
    },
]