const axios = require("axios");
const _ = require("lodash");
const currencyIds = require("./currencyIds.json");

const cmcHeaders = {
    "X-CMC_PRO_API_KEY": process.env.CMC_API_TOKEN
}

const convertURL = `https://pro-api.coinmarketcap.com/v1/tools/price-conversion`

exports.handleCurrencyConverterRequest = async (amount, originCurrency, targetCurrency) => {
    if (!_.toInteger(amount)) return "Wrong amount, try again!";
    if (!_.has(currencyIds, originCurrency) || !_.has(currencyIds, targetCurrency)) return "Wrong currency, try again! List of available currency: `-currency help`";

    const originId = _.get(currencyIds, originCurrency);
    const targetId = _.get(currencyIds, targetCurrency);

    const params = {
        amount: amount,
        id: originId,
        convert_id: targetId,
    }

    const convert = await axios
        .get(convertURL, {
            "headers": cmcHeaders,
            "params": params
        })
        .then(result => {
            const price = _.round(result.data.data.quote[targetId].price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${originCurrency.toUpperCase()} = ${price} ${targetCurrency.toUpperCase()}`;
        })
        .catch(err => {
            console.log(err)
            return err;
        })

    return convert
}