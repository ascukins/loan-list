import { Customer, PersonalLoan } from '../models/loan';

const pickRandomly = (arr: any[]) => {
  if (Array.isArray(arr) && arr.length) {
    const choice = Math.floor(Math.random() * arr.length);
    return arr[choice];
  }
  return null;
};

const randomArray = <T extends { id?: string }>(
  approximateLength: number,
  getItem: () => T
): T[] => {
  const length = Math.round(
    approximateLength / 2 + Math.random() * approximateLength
  );
  const array: T[] = [];
  for (let i = 0; i < length; i++) {
    const item = getItem();
    if (item.id) {
      const foundIndex = array.findIndex((e) => e.id === item.id);
      if (foundIndex >= 0) {
        array[foundIndex] = item;
        continue;
      }
    }
    array.push(item);
  }
  return array;
};

function randomAddress(): string {
  const street = pickRandomly([
    'Brivibas iela',
    'Agatan',
    'Beehive street',
    'Mazkupenas iela',
    'Calle Nevada',
    'Soi Nanai',
    'Bangla road',
  ]);
  const city = pickRandomly([
    'Riga',
    'New-York',
    'Reno',
    'Paris',
    'Ventspils',
    'Moscow',
    'Bangkok',
  ]);
  const zip = String(Math.floor(Math.random() * 1000000));
  const state = pickRandomly(['Grkalnas pagasts', 'LA', 'NY', 'CA', 'TX']);
  const country = pickRandomly([
    'USA',
    'France',
    'Italy',
    'Latvia',
    'Thailand',
  ]);
  return `${
    1 + Math.floor(Math.random() * 300)
  } ${street}, ${city}, ${state}, ${zip}, ${country}`;
}

function randomCustomer(): Customer {
  const names = [
    'John',
    'Doe',
    'Patrick',
    'Linda',
    'Bill',
    'Peter',
    'Ivan',
    'Jackson',
    'Barbara',
    'Ieva',
    'Norton',
    'Donald',
  ];
  const customer: Customer = {
    name: pickRandomly(names) + ' ' + pickRandomly(names),
    address: randomAddress(),
    annualNetIncome: 20000 + Math.floor(Math.random() * 150) * 1000,
  };
  return customer;
}

function randomPersonalLoan(): PersonalLoan {
  const customer = randomCustomer();
  const loan: PersonalLoan = {
    id: String(Math.floor(Math.random() * 999999)).padStart(6, '0'),
    customer,
    termMonths: 12 + Math.floor(Math.random() * (96 - 12)),
    annualPercentageRate:
      Math.round((1.5 + Math.random() * (3.99 - 1.5)) * 100) / 100,
  };
  return loan;
}

export const generateMockLoanArray = (): PersonalLoan[] => {
  const loans = randomArray(30, randomPersonalLoan);
  return loans;
};
