export default data;
declare function data(): {
    webserver: {
        host: string;
        port: number;
    };
    dao: {
        source: string;
        json: {
            file: string;
        };
        mongodb: {};
    };
};
