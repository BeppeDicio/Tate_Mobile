export const fetchUsersPage = (page = 1) => {
    return fetch(`https://mz37bp4toc.execute-api.eu-west-1.amazonaws.com/challenge/users?page=${page}`)
}

/*
    Nell'altro app che ho fatto in React Native usavo Axios come libreria per le chiamate api. Con più tempo o sapendolo a monte
    avrei forse preferito usare direttamente Axios.
 */
