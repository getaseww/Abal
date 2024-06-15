import axios from "axios"

export const SendBulkMessage = (phone_numbers: string[], message: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const body = {
            to: phone_numbers,
            message: message,
            from: process.env.AFRO_MESSAGE_IDENTIFIER_ID,
            sender: process.env.AFRO_MESSAGE_NAME,
        };

        const headers = {
            Authorization: `Bearer ${process.env.AFRO_MESSAGE_TOKEN}`,
        };

        axios.post('https://api.afromessage.com/api/bulk_send', body, { headers })
            .then(result => {
                console.log("Ack" + result.status + JSON.stringify(result.data))
                resolve(result.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const SendMessage = (phone_number: string, message: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const body = {
            to: phone_number,
            message: message,
            from: process.env.AFRO_MESSAGE_IDENTIFIER_ID,
            sender: process.env.AFRO_MESSAGE_NAME,
        };

        const headers = {
            Authorization: `Bearer ${process.env.AFRO_MESSAGE_TOKEN}`,
        };

        axios.post('https://api.afromessage.com/api/send', body, { headers })
        .then(result => {
            resolve(result.data);
        })
        .catch((error) => {
            reject(error);
        });

    })
}