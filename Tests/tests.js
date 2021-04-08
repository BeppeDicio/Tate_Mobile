/*
    Implementazione dei test attualmente non presente. Andrebbero elaborati i seguenti test:

    ** API CALL **
    Testare che siano gestite le eccezioni che le api possano sollevare per vari motivi:
        - Url non corretta
        - Connessione assente
        - Problemi con il service API
        - In questo caso non c'è ma se l'utente avesse potuto inserire dei dati di ricerca o di interazione con le
        richieste api, ad esempio parametri di ricerca, allora sarebbero dovuti essere implementati test sulla parte
        di controllo dei dati, assicurandosi che l'app filtri errori di compilazione della richiesta così da evitare
        di far fallire delle chiamate.

    ** Filtri **
    Test che controllino la correttezza dei filtri, qui è consigliabile mockare il Json di risposta api e provare i vari
    filtri, controllando che funzionino correttamente

    ** UI **
    Test UI sul corretto funzionamento dei vari bottoni

    ** Ordinamento metodi di pagamento **
    Dato che usiamo un algoritmo per l'ordinamento delle carte permettendo così di visualizzare la carta di default per
    prima, un test ci permette di verificare la correttezza dell'implementazione.

    ** Dati **
    Avendo una forte dipendenza dai dati provenenti da un API, sarebbe appropriato fare dei test in caso di errori
    del formato dato derivato dalle API, è assolutamente indispensabile che gli errori di formattazione del dato non
    facciano saltare il funzionamento dell'applicazione. Alcuni casi critici: Nome utente assente o null, più di una
    carda impostata come pagamento default, il campo pagamento default invece di essere un bool è un numero o una stringa
    o addirittura null e così via.

 */
