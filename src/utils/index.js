export function firebaseErrorMessages(errorCode) {
    switch (errorCode) {
        case 'auth/network-request-failed':
            return "Connect to the internet to continue"
    }
}