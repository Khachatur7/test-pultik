interface LastButtonType {
    time: string;
    dbName: string;
    sku: string;
    yandex: {
        price: string;
        stock: string;
    };
    avito: {
        price: string;
        stock: string;
    };
    ozon: {
        price: string;
        stock: string;
    };
    wb: {
        price: string;
        stock: string;
    };
    megamarket: {
        price: string;
        stock: string;
    },
    yaE: {
        price: string,
        stock: string
    }
}

export default LastButtonType;