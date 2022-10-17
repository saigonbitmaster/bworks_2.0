const project_id = process.env.BLOCKFROST_PROJECT_ID;
const blockfrost_url = process.env.BLOCKFROST_URL;
const axios = require('axios');
async function checkWallet(address, value) {
    let result = { amount: 0, isEnough: false };
    await axios({
        url: `${blockfrost_url}/${address}`,
        method: 'GET',
        headers: {
            project_id: project_id,
        },
    })
        .then((response) => {
        result.amount =
            response.data.amount.map((item) => item.unit == 'lovelace' ? item : null)[0].quantity / 1000000;
        result.isEnough = result.amount >= value;
    })
        .catch((error) => error);
    return result;
}
module.exports = { checkWallet };
//# sourceMappingURL=getUserLanguage.js.map