//1.Convert the string "123" to a number and add 7. (0.5 Grade)
// • Output Example: 130

let str = '123';
let answer = Number(str) + 7;
console.log(answer)

////////////////////////////////////////////////////////////

// 2. Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade)


let input=0;
if(!input){
    console.log('Invalid');
}

////////////////////////////////////////////////////////////

// 3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade)

for(let i=1;i<=10;i++){
    if(i%2==0){
        continue;
    }
    else{
        console.log(i);        
    }
}

////////////////////////////////////////////////////////////

// 4. Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)

let array = [1,2,3,4,5].filter(value =>{
    return value%2==0;
});
console.log(array);

////////////////////////////////////////////////////////////

//  5. Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)

let array1 =[1,2,3];
let array2 =[4,5,6];

const mergeArray =[...array1,...array2];
console.log(mergeArray);


////////////////////////////////////////////////////////////

// 6. Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday). (0.5 Grade)

let day = 2;
switch (day) {
    case 1:
        console.log('Sunday');
        break;
    case 2:
        console.log('Monday');
        break;
    case 3:
        console.log('Tuesday');
        break;
    case 4:
        console.log('Wednesday');
        break;
    case 5:
        console.log('Thursday');
        break;
    case 6:
        console.log('Friday');
        break;
    case 7:
        console.log('Saturday');
        break;
    default:
        console.log('Invalid day');
        break;
}

////////////////////////////////////////////////////////////

// 7. Create an array of strings and return their lengths using map method (0.5 Grade)

let arrayMap = ['a','ab','abc'].map(value=>{
    return value.length
});
console.log(arrayMap);

// 8. Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade)

function check (number){
    if(number%3==0&&number%5==0){
        console.log('Divisible by both')
    }
}
let number =15;
check(15);

////////////////////////////////////////////////////////////

// 9. Write a function using arrow syntax to return the square of a number (0.5 Grade)

const power = (number)=>{
    return number * number;
}
console.log(power(5));

////////////////////////////////////////////////////////////

// 10.Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)

let obj ={
    name:'John',
    age:25,
}

const {name,age} = obj;
console.log(`${name} is ${age} years old`);

////////////////////////////////////////////////////////////

// 11.Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade)

function sum (...numbers){
    let summation =0
    for (let i = 0; i < numbers.length; i++) {
        summation += numbers[i];
    }
    return summation ;
}
console.log(sum(1,2,3,4,5))


////////////////////////////////////////////////////////////

// 12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)

function delayPromiseMessage(){
    return new Promise(resolve =>{
        setTimeout(()=>{
            resolve('Success');
        },3000);
    });
}

delayPromiseMessage().then(message=> {console.log(message)});


////////////////////////////////////////////////////////////

// 13. Write a function to find the largest number in an array. (0.5 Grade)

function largestNumber(numbers){
    let large= -1000000;
    for(let i=0;i<numbers.length;i++){
        if(numbers[i]>large){
            large = numbers[i];
        }
    }
    return large;
}

let largestArray=[1,3,7,2,4];
console.log(largestNumber(largestArray))

////////////////////////////////////////////////////////////

// 14. Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)

function objectKeys(obj){
    return Object.keys(obj)
}

let userOBJ = {
    name:'John',
    age:30
}
console.log(objectKeys(userOBJ))

////////////////////////////////////////////////////////////

// 15. Write a function that splits a string into an array of words based on spaces. (0.5 Grade)

function splitsWords(str){
    return str.split(' ');
}

let text = "The quick brown fox";
console.log(splitsWords(text)) 

