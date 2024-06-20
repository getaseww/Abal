import axios from 'axios'
import { MAIN_API_URL } from '../constants/constants';
import { SelectProps } from 'antd';
import { t } from 'i18next';
import { PenalityOccurrence, PenalityRateType } from '../enums/enums';

export const monthFormat = 'YYYY/MM';

export const retrieveData = async (endpoint: string, headers?: any) => {
  const response = await axios.get(MAIN_API_URL + endpoint, { headers });
  return response.data.data;
}

export const postData = async (endpoint: string, data: any, headers?: any) => {
  const response = await axios.post(MAIN_API_URL + endpoint, data, { headers: headers });
  if (response.data.data != undefined) {
    return response.data.data
  };
  return response.data
}

export const postDataReturnAll = async (endpoint: string, data: any, headers?: any) => {
  const response = await axios.post(MAIN_API_URL + endpoint, data, { headers: headers });
  if (response.data.data != undefined) {
    return response.data
  };
  return response.data
}

export const putData = async (endpoint: string, data: any, headers?: any) => {
  const response = await axios.put(MAIN_API_URL + endpoint, data, { headers: headers });
  return response.data.data;
}

export const deleteData = async (endpoint: string, headers?: any) => {
  const response = await axios.delete(MAIN_API_URL + endpoint, { headers });
  return response.data.data;
}


export const setToLocalStorage = (name: string, data: any) => {
  localStorage.setItem(
    name,
    JSON.stringify({
      email: data?.email,
      full_name: data?.full_name,
      id: data?.id,
      role: data?.role,
    })
  );

  localStorage.setItem("token", data?.token);
  localStorage.setItem("user_id", data?.id);
};




export const getLocalStorageItem = (name: string): any => {
  const temp: any = localStorage.getItem(name);
  if (temp) return JSON.parse(temp);
  else
    return {
      full_name: "",
      id: 1,
      phone_number: "",
      email: "",
      role: ""
    };
};


export const searchProp: SelectProps = {
  showSearch: true,
  optionFilterProp: "children",
  filterOption: (input: any, option: any) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  className: "w-100",
};

export const validateEmail = (email: any) => {

  // custom email regex
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email.length === 0) {
    return 'Email is required';
  }

  if (!regex.test(email)) {
    return 'Invalid email format';
  }

  // other custom validations...

  return "";
}


export const validatePhoneNumber = (_: any, value: any) => {
  // Define your regex pattern for validation
  const phoneNumberRegex = /^09\d{8}$/;

  // Check if the value matches the regex pattern
  if (!value || value.match(phoneNumberRegex)) {
    return Promise.resolve();
  }

  // If the value doesn't match, reject with an error message
  return Promise.reject(t('invalid_phone_number_format_message'));
};

export const validateDates = (start_date: any, end_date: any) => {

  const timestamp1 = Date.parse(start_date);
  const timestamp2 = Date.parse(end_date);

  if (isNaN(timestamp1) || isNaN(timestamp2)) {
    return t('invalid_date_format');
  } else if (timestamp1 > timestamp2) {
    return t('start_date_end_date_error');
  } else {
    return "";
  }
}


export const formatNumber = (number: any) => {
  if (!number) return 0;
  var options = { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 };
  return number.toLocaleString('en-US', options);
}

export const checkUnicode = (string: string) => {
  return /[^\x00-\x7F]/.test(string);
}

export const getRandomHexColor = () => {
  const generateRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

  let randomColor;
  let hexColor;

  // Function to check if the color is too light (closer to white) or too dark (closer to black)
  const isColorExcluded = (color:any) => {
    const rgb = parseInt(color, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Calculate the luminance (perceived brightness) of the color
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Exclude colors that are too light or too dark
    return luminance < 0.2 || luminance > 0.8;
  };

  // Generate a random color, check if it should be excluded, and regenerate if necessary
  do {
    randomColor = generateRandomColor();
  } while (isColorExcluded(randomColor));

  // Ensure the color has 6 digits by padding with zeros if necessary
  hexColor = '#' + '0'.repeat(6 - randomColor.length) + randomColor;

  return hexColor;
};

export const generateRandomString = (len: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export const floors = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", '17', "18", '19', "20"]
export const bed_rooms = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]


export function calculatePenalty(
  paymentEndDate: any,
  waitingDays: any,
  rateType: any,
  occurrence: any,
  penaltyValue: any,
  amount: any
): number {


  // console.log("all argument data", paymentEndDate, waitingDays, rateType, occurrence, penaltyValue, amount)


  if (!paymentEndDate || paymentEndDate == "undefined" || waitingDays == null || waitingDays == "undefined" || rateType == null || rateType == "undefined" || !occurrence || occurrence == "undefined" || penaltyValue == null || penaltyValue == "undefined") {
    return 0
  }

  const currentDate = new Date();
  const daysDifference = Math.floor((currentDate.getTime() - new Date(paymentEndDate)?.getTime()) / (1000 * 60 * 60 * 24));

  // console.log("day differences", daysDifference)
  if (daysDifference <= waitingDays) {
    return 0;
  }

  let penalty = 0;

  switch (occurrence) {
    case PenalityOccurrence.DAILY:
      penalty = (daysDifference - waitingDays) * penaltyValue;
      if (rateType === PenalityRateType.PERCENT) {
        penalty = (penaltyValue / 100) * (daysDifference - waitingDays) * amount;
      }
      break;
    case PenalityOccurrence.MONTHLY:
      penalty = Math.ceil((daysDifference - waitingDays) / 30) * penaltyValue;
      if (rateType === PenalityRateType.PERCENT) {
        penalty = (penaltyValue / 100) * Math.ceil((daysDifference - waitingDays) / 30) * amount;
      }
      break;

    default:
      throw new Error(`Unsupported occurrence: ${occurrence}`);
  }
  return Number(penalty.toFixed(2));
}

export const getDaysDifference = (start_date: Date) => {
  const currentDate = new Date();
  const daysDifference = Math.ceil((currentDate.getTime() - new Date(start_date)?.getTime()) / (1000 * 60 * 60 * 24));
  return daysDifference;
}


export function convertToWords(number: number) {
  // Arrays to store the textual representation of numbers
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  // Function to convert the ones, tens, and hundreds places
  function convertChunk(chunk:any) {
    let result = '';
    const hundreds = Math.floor(chunk / 100);
    const remainder = chunk % 100;

    if (hundreds > 0) {
      result += ones[hundreds] + ' hundred';
      if (remainder > 0) {
        result += ' and ';
      }
    }

    if (remainder > 0) {
      if (remainder < 10) {
        result += ones[remainder];
      } else if (remainder < 20) {
        result += teens[remainder - 10];
      } else {
        const tensDigit = Math.floor(remainder / 10);
        const onesDigit = remainder % 10;
        result += tens[tensDigit];
        if (onesDigit > 0) {
          result += '-' + ones[onesDigit];
        }
      }
    }

    return result;
  }

  // Handling zero as a special case
  if (number === 0) {
    return 'zero';
  }

  // Splitting the number into chunks of three digits
  const chunks = [];
  while (number > 0) {
    chunks.push(number % 1000);
    number = Math.floor(number / 1000);
  }

  // Converting each chunk and combining the results
  const wordsChunks = chunks.map((chunk, index) => {
    const words = convertChunk(chunk);
    if (words && index > 0) {
      return words + ' ' + ['thousand', 'million', 'billion'][index - 1];
    }
    return words;
  });

  return wordsChunks.reverse().join(' ');
}

// const validateInputs = (value: any,) => {
//   if (paymentDetails?.length == 0) {
//       toast.error(`${t('payment_no_payment_details_error')}`)
//       return false;
//   }
//   for (const paymentDetail of paymentDetails) {
//       const paymentTypeStartDate = paymentTypeDataFiltered.find(
//           (item: any) => item?.id === paymentDetail.subscription_id
//       )?.start_date;
//       const paymentDate = new Date(paymentTypeStartDate).setDate(1)
//       if (paymentTypeStartDate && new Date(paymentDate).setHours(0, 0, 0, 0) >
//           new Date(selectedFromDate).setHours(0, 0, 0, 0)) {
//           toast.error(`${t('subscription_date_less_than_from_date')}`);
//           return false;
//       }
//   }
//   return true;

// };