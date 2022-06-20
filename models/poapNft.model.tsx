import { v4 } from "uuid";

interface IPoapNft {
    uri: string;
    uuid: string;
    name: string;
}

class PoapNft implements IPoapNft {
    uri: string;
    uuid: string;
    name: string;
    constructor(uri: string, uuid: string, name: string) {
        this.uri = uri;
        this.uuid = uuid;
        this.name = name;
    }
}

export default PoapNft;
