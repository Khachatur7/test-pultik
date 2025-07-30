
const dataFilterHandler = (elId: string) => {

    const idItems = [
        "lC9ljn9kgGiuvjsm",
        "lh9yjn9kgGiuvjsm", // 3060
        "lh9msn9kgGiuvjsm", // Garage
        "lg9qcx2kjGiuvjkm", // Multi 
    ];

    return idItems.indexOf(elId) !== -1;

}

export default dataFilterHandler;