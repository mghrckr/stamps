function generateFooBarArray() {
    const result = [];
    for (let i = 100; i >= 1; i--) {
      if (isPrime(i)) {
        continue; 
      }
  
      let output = '';
      if (i % 3 === 0) {
        output += 'Foo';
      }
      if (i % 5 === 0) {
        output += 'Bar';
      }
      if (output === '') {
        output = i;
      }
  
      result.push(output);
    }
    return result;
  }
  
  function isPrime(number) {
    if (number <= 1) {
      return false;
    }
    if (number <= 3) {
      return true;
    }
    if (number % 2 === 0 || number % 3 === 0) {
      return false;
    }
    let i = 5;
    while (i * i <= number) {
      if (number % i === 0 || number % (i + 2) === 0) {
        return false;
      }
      i += 6;
    }
    return true;
  }
  
  const fooBarArray = generateFooBarArray();
  console.log(fooBarArray.join(', '));
  