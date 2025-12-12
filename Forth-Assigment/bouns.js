/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    strs.sort()
    let x= strs[0];
    let y = strs[strs.length-1];
    console.log(strs)
    let answer = '';
    for(let i=0;i<x.length;i++){
        if(x[i]===y[i]){
            answer+=x[i];
        }else{
            break;
        }
    }
    return answer;
};

console.log( longestCommonPrefix(['aaab','ab','aaa']))