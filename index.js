function isPrime(num) {
  for (let i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function generateNumber() {
  let isFound = false;
  let candidate = getRandom(2000, 10000);

  while (!isFound) {
    if (isPrime(candidate) && candidate % 4 == 3) {
      isFound = true;
    } else {
      candidate++;
    }
  }
  return candidate;
}

function gcd(firstNum, secondNum) {
  if (!secondNum) {
    return firstNum;
  }
  return gcd(secondNum, firstNum % secondNum);
}

function getRelativelyPrimeNumber(relative) {
  let number = generateNumber();
  while (gcd(number, relative) !== 1) {
    number = generateNumber();
  }
  return number;
}

function getNextNumber(x, N) {
  return Math.pow(x, 2) % N;
}

function singleBitTest(bits) {
  const count = (bits.match(/1/g) || []).length;
  const result = 9725 < count && count < 10275;
  if (result) {
    console.log('singleBitTest passed: ' + count + ' same bits \n');
  } else {
    console.log('singleBitTest failed: ' + count + ' same bits \n');
  }
}

function seriesTest(bits) {
  const result = [];
  console.log('series test: ');
  const one = (bits.match(/010/g) || bits.match(/101/g) || []).length;
  result.push({
    seriesLength: 1,
    passed: one > 2315 && one < 2685,
    counter: one,
  });

  const two = (bits.match(/0110/g) || bits.match(/1001/g) || []).length;
  result.push({
    seriesLength: 2,
    passed: two > 1114 && two < 1386,
    counter: two,
  });

  const three = (bits.match(/01110/g) || bits.match(/10001/g) || []).length;
  result.push({
    seriesLength: 3,
    passed: three > 527 && three < 723,
    counter: three,
  });

  const four = (bits.match(/011110/g) || bits.match(/100001/g) || []).length;
  result.push({
    seriesLength: 4,
    passed: four > 240 && four < 384,
    counter: four,
  });

  const five = (bits.match(/0111110/g) || bits.match(/1000001/g) || []).length;
  result.push({
    seriesLength: 5,
    passed: five > 103 && five < 209,
    counter: five,
  });

  const six = (bits.match(/01{6,}0/g) || bits.match(/10{6,}1/g) || []).length;
  result.push({
    seriesLength: 6,
    passed: six > 103 && five < 209,
    counter: six,
  });

  console.table(result);
}

function longSeriesTest(bits) {
  const result = bits.match(/01{26,}0/g) || bits.match(/10{26,}1/g) || [].length;
  if (!result) {
    console.log('long series test passed: ' + result + ' series');
  } else {
    console.log('long series test failed: ' + result + ' series');
  }
}

function pokerTest(bits) {
  const segments = bits.match(/.{1,4}/g);
  const counters = {};
  segments.forEach((seg) => {
    const digitNumber = parseInt(seg, 2);
    if (!counters[digitNumber]) counters[digitNumber] = 0;
    counters[digitNumber]++;
  });
  const countersArr = Object.keys(counters).map((key) => counters[key]);
  const sum = countersArr.reduce((a, b) => a + Math.pow(b, 2), 0);
  const result = (16 / 5000) * sum - 5000;
  if (result > 2.16 && result < 46.17) {
    console.log('poker test passed, x = ' + result.toFixed(2));
  } else {
    console.log('poker test failed, x = ' + result.toFixed(2));
  }
}

(function main() {
  const bitsArr = [];
  const p = generateNumber();
  const q = generateNumber();
  const N = p * q;
  let x = getRelativelyPrimeNumber(N);
  for (let i = 0; i < 20000; i++) {
    x = getNextNumber(x, N);
    bitsArr.push(x.toString(2).substr(-1));
  }
  const result = bitsArr.join('');
  singleBitTest(result);
  seriesTest(result);
  longSeriesTest(result);
  pokerTest(result);
})();
