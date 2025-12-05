/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let element;
    let count =0;
    for(let i=0;i<nums.length;i++){
        if(count == 0){
            count =1;
            element = nums[i]
        }
        else if(nums[i]== element){
            count++;
        }
        else{
            count--;
        }
    }
    return element
};