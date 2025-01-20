export interface CheckoutCredential {
    firstName : string,
    lastName : string,
    postalCode : string
}

const validCheckoutCrendetial : CheckoutCredential =  {
     firstName : 'Jeremias',
     lastName : 'Omonte',
     postalCode : '123'
}

export const checkoutCredentials : Record<string, CheckoutCredential> = {
    missingFirstName : {
        firstName : '',
        lastName : validCheckoutCrendetial.lastName,
        postalCode : validCheckoutCrendetial.postalCode
    },
    missingLastName : {
        firstName : validCheckoutCrendetial.firstName,
        lastName : '',
        postalCode : validCheckoutCrendetial.postalCode
    },
    missingPostalCode : {
        firstName : validCheckoutCrendetial.firstName,
        lastName : validCheckoutCrendetial.lastName,
        postalCode : ''
    },
    allMissingInput : {
        firstName : '',
        lastName : '',
        postalCode : ''
    },
    specialCharacterFirstName : {
        firstName : '"#$"#$',
        lastName : validCheckoutCrendetial.lastName,
        postalCode : validCheckoutCrendetial.postalCode
    },
    specialCharacterLastName : {
        firstName : validCheckoutCrendetial.firstName,
        lastName : '$#"',
        postalCode : validCheckoutCrendetial.postalCode
    },
    specialCharacterPostalCode : {
        firstName : validCheckoutCrendetial.firstName,
        lastName : validCheckoutCrendetial.lastName,
        postalCode : ''
    }
}