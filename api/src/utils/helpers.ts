import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { v4 as uuid4 } from 'uuid';
import { createHash, createSign } from 'crypto';

dotenv.config();












export const encryptPassword = (password: string) => {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const hashPassword = (password: any): any => {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
        bcrypt
            .hash(password, saltRounds)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

export const checkUnicode = (string: string) => {
    return /[^\x00-\x7F]/.test(string);
}

export const generateTrxRef = () => {
    return uuid4();
}

export const generateRandomString = (len: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}


export const paymentHeader = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
    },
};


export const getFilename = (file: any) => {
    const date = new Date();
    return `${date.getTime()}-${file.originalname}`;
};

export const enum SMSSTATUS {
    PENDING = "Pending",
    APPPROVED = "Approved",
    REJECTED = "Rejected"
}

export interface PeriodTypes {
    today: number,
    this_month: number,
    this_year: number
}
export const today = () => {
    const today = new Date();
    return today.setHours(0, 0, 0, 0);
}

export const thisMonth = () => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    return startOfMonth
}

export const thisYear = () => {
    const startOfYear = new Date();
    startOfYear.setMonth(0, 1);
    startOfYear.setHours(0, 0, 0, 0);

    return startOfYear;
}




//   export function calculatePenalty(
//     paymentEndDate: any,
//     waitingDays: any,
//     rateType: any,
//     occurrence: any,
//     penaltyValue: any,
//     amount: any
//   ): number {

//     if (!paymentEndDate || paymentEndDate == "undefined" || waitingDays == null || waitingDays == "undefined" || rateType == null || rateType == "undefined" || !occurrence || occurrence == "undefined" || penaltyValue == null || penaltyValue == "undefined") {
//       return 0
//     }

//     const currentDate = new Date();
//     let endDate=paymentEndDate
//     const daysDifference = Math.floor((currentDate.getTime() - new Date(endDate)?.getTime()) / (1000 * 60 * 60 * 24));

//     if (daysDifference <= waitingDays) {
//       return 0;
//     }

//     let penalty = 0;

//     switch (occurrence) {
//       case PenalityOccurrence.DAILY:
//         penalty = (daysDifference - waitingDays) * penaltyValue;
//         if (rateType === PenalityRateType.PERCENT) {
//           penalty = (penaltyValue / 100) * (daysDifference - waitingDays) * amount;
//         }
//         break;
//       case PenalityOccurrence.MONTHLY:
//         penalty = Math.ceil((daysDifference - waitingDays) / 30) * penaltyValue;
//         if (rateType === PenalityRateType.PERCENT) {
//           penalty = (penaltyValue / 100) * Math.ceil((daysDifference - waitingDays) / 30) * amount;
//         }
//         break;

//       default:
//         throw new Error(`Unsupported occurrence: ${occurrence}`);
//     }
//     return Number(penalty.toFixed(2));
//   }

export function getLastDateOfMonth(date: Date): Date {
    const lastDay = new Date(date);
    lastDay.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());

    lastDay.setHours(0, 0, 0, 0);
    return lastDay;
}


export function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
    console.log("year", year, "month", month, new Date(year, month + 1, 1).getDate())
    return new Date(year, month, 1);
}

export function generateStringA(obj: any) {
    const sortedKeys = Object.keys(obj).sort();

    const keyValuePairs = sortedKeys.map(key => `${key}=${obj[key]}`);

    return keyValuePairs.join('&');
}


export function encryptRSA(plain_text: string) {
    const sign = createSign('SHA256');
    sign.update(plain_text);
    sign.end();
    const signature = sign.sign(process.env.TELEBIRR_PUBLIC_KEY);
    return signature;
}


export function sha256(plain_text: string) {
    const hash = createHash('sha256');

    hash.update(plain_text);
    return hash.digest('hex');
}

export function calculateByteLength(jsonObj: any) {
    const jsonString = JSON.stringify(jsonObj);
    const byteLength = new Blob([jsonString]).size;
    return byteLength;
}