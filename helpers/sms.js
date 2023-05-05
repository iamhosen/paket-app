import { toEnglishNumberInString } from './number'

export const parseBlu = (sms) => {
    let amount = 0
    let date = null
    let type = null

    //amount
    const amountRegex = /[0-9.,]+/;
    const amountMatch = sms.match(amountRegex);
    if (amountMatch) {
        amount = parseFloat(amountMatch[0].replaceAll(',', ''));
    }

    //type
    if (sms.includes('واریز پول')) {
        type = 'deposit';
    } else if (sms.includes('برداشت پول')) {
        type = 'withdraw';
        amount = -amount;
    }

    //date
    let bluTime = sms.split('\n')[4];
    let bluDate = sms.split('\n')[5];

    bluTime = toEnglishNumberInString(bluTime);
    bluDate = toEnglishNumberInString(bluDate).split('.').join('/');

    date = `${bluDate} ${bluTime}:00`;

    return {
        amount,
        date,
        type
    }
}

export const parseSaman = (sms) => {
    let amount = 0
    let date = null
    let type = null

    if (sms.includes('از')) {
        type = 'deposit';
        amount = sms.split(' ')[3].split(',').join('')
    } else if (sms.includes('به')) {
        const regex = /مبلغ\s+(\d[\d,]*)\s*ريال/;
        const match = sms.match(regex);
        amount = match[1].split(',').join('') * -1;
        type = 'withdraw';
    }

    date = `${sms.split('\n')[4]} ${sms.split('\n')[5]}`;

    return {
        amount,
        date,
        type
    }

}

export const parsePasargad = (sms) => {
    let amount = 0
    let date = null
    let type = null

    const regex = /مبلغ:\s*(.*?)\s*ريال/;
    const match = sms.match(regex);
    amount = match[1].split(',').join('');

    if (sms.includes('واریز')) {
        type = 'deposit';
    } else if (sms.includes('برداشت')) {
        type = 'withdraw';
        amount = -amount;
    }

    let d = sms.split('\n').at(-1).split('_');
    date = `14${d[0]} ${d[1]}:00`;

    return {
        amount,
        date,
        type
    }
}

export const parseSaderat = (sms) => {
    let amount = 0
    let date = null
    let type = null

    if (sms.split('\n')[1].includes(':')) {
        type = 'withdraw';
        amount = -sms.split('\n')[1].split(':').at(-1).split(',').join('').slice(0, -1);
    } else {
        type = 'deposit';
        amount = sms.split('\n')[1].split(',').join('').slice(0, -1);
    }

    let d = sms.split('\n').at(-1).split('-');
    date = `1402/${d[0].slice(0, 2)}/${d[0].slice(2)} ${d[1]}:00`;

    return {
        amount,
        date,
        type
    }
}