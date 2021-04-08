
export const contains = (user, query) => {
    if(user.email.includes(query)) {
        return true;
    }

    return false;
}
