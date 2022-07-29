import { v4 } from "uuid";

interface IBadgeNft {
  uri: string;
  uuid: string;
  name: string;
}

class BadgeNft implements IBadgeNft {
  uri: string;
  uuid: string;
  name: string;
  constructor(uri: string, uuid: string, name: string) {
    this.uri = uri;
    this.uuid = uuid;
    this.name = name;
  }
}

export default BadgeNft;
