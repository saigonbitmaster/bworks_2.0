import { inspectAddress } from "cardano-addresses";

let addr =
  "addr1gqtnpvdhqrtpd4g424fcaq7k0ufuzyadt7djygf8qdyzevuph3wczvf2dwyx5u";

const abc = (addr) =>
  inspectAddress(addr)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));



export default abc;  