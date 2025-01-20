const passwordForAllUsers = 'secret_sauce';
const usernameValid = 'standard_user'; 

export interface UserCredential {
    username : string,
    password : string
}

export const validCredential : UserCredential = {
    username : usernameValid,
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

export const invalidUsersCredentials : Record<string, UserCredential>  = {
    missingUsername: {
        username : '',
        password : passwordForAllUsers
    },
    missingPassword : {
        username : usernameValid,
        password : ''
    },
    invalidUser : {
        username : 'example123',
        password : 'example123'
    },
    invalidUsername : {
        username : 'example123',
        password : passwordForAllUsers
    },
    invalidPassword : {
        username : usernameValid,
        password : 'example123'
    },
    specialCharactersUsername : {
        username : '"#$"#$',
        password : passwordForAllUsers
    }
}