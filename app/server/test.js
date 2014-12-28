var testArray = [1,2,3,4,5,6];

for(i=0; i<testArray.length; i++) {
  var newArray = [];
  if(i % 3 === 3) {
    newArray.push(testArray[i]);
  }
}

console.log(newArray);