const controlKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
export const restrictAlphabets = (
  e: KeyboardEvent,
  ref: any,
  isMobile?: boolean | undefined
) => {
  const mobile = isMobile == undefined ? false : isMobile;
  const startDigit = ['6', '7', '8', '9'];

  const inputValue = ref.current.value;

  const isDigit = /^[0-9]$/.test(e.key);

  let predictedValue = inputValue;
  if (isDigit) {
    predictedValue += e.key;
  } else if (e.key === 'Backspace' && inputValue?.length > 0) {
    predictedValue = inputValue.slice(0, -1);
  }

  if (
    (!isDigit && !controlKeys.includes(e.key)) ||
    (mobile == true &&
      predictedValue?.length === 1 &&
      !startDigit.includes(predictedValue[0]))
  ) {
    e.preventDefault();
  }
};

export const restrictDigits = (e: KeyboardEvent) => {
  var char = e.key;
  if (/^[a-zA-Z\s]$/.test(char) || controlKeys.includes(e.code)) {
    return true;
  }
  return e.preventDefault();
};

export const handleLimitLength = (
  e: KeyboardEvent,
  ref: any,
  limit: number
) => {
  const inputValue = ref.current.value;
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  if (e.key === 'Backspace') {
    // Allow backspace
    return;
  }

  if (digits.includes(e.key)) {
    if (inputValue.length >= limit) {
      // Prevent further input if limit is reached
      e.preventDefault();
    }
  } else {
    // Prevent non-digit input
    e.preventDefault();
  }
};

export const handleCopyPaste = (event: any) => {
  event.preventDefault();
};

export const restrictSpecialCharacters = (e: KeyboardEvent) => {
  const specialCharRegex = /^[^!`~@#$%^&*()+=_\-[\]';,./{}|\\":<>?]*$/;
  if (!specialCharRegex.test(e.key) && !controlKeys.includes(e.key)) {
    e.preventDefault();
  }
};

export const restrictSomeSpecialCharacters = (e: KeyboardEvent) => {
  const specialCharRegex = /^[^!`~@#$%^&*()+=_\[\]';{}|\\":<>?]*$/;

  if (!specialCharRegex.test(e.key) && !controlKeys.includes(e.key)) {
    e.preventDefault();
  }
};

export const restrictDropdown = (e: KeyboardEvent) => {
  const specialCharRegex = /^[^!`~@#$%^&*()+=_\-[\]';,./{}|\\":<>?0-9]*$/;
  const controlKeys = [
    'Backspace',
    'Tab',
    'Enter',
    'Escape',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ];

  if (!specialCharRegex.test(e.key) && !controlKeys.includes(e.key)) {
    e.preventDefault();
  }
};

export const restrictProfessionDropdown = (e: KeyboardEvent) => {
  const specialCharRegex = /^[^!`~@#$%^*()+=_\-[\]';,.{}|\\":<>?0-9]*$/;
  const controlKeys = [
    'Backspace',
    'Tab',
    'Enter',
    'Escape',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ];

  if (!specialCharRegex.test(e.key) && !controlKeys.includes(e.key)) {
    e.preventDefault();
  }
};

export const restrictAlphabetDropdown = (e: KeyboardEvent) => {
  const specialCharRegex = /^[^!~@#$%^&*()+=_\-[\]';,./{}|\\":<>?a-zA-Z]*$/;
  const controlKeys = [
    'Backspace',
    'Tab',
    'Enter',
    'Escape',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ];

  if (!specialCharRegex.test(e.key) && !controlKeys.includes(e.key)) {
    e.preventDefault();
  }
};

export const mask = (first: number, last: number, element: any) => {
  const visibleStart = element.slice(0, first);
  const visibleEnd = element.slice(last);

  const maskedMiddle = 'X'.repeat(last - first);

  const maskedElement = `${visibleStart}${maskedMiddle}${visibleEnd}`;

  return maskedElement;
};
