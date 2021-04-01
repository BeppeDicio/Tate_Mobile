export const fetchUsersPage = (page = 1) => {
    return fetch(`https://mz37bp4toc.execute-api.eu-west-1.amazonaws.com/challenge/users?page=${page}`)
}
