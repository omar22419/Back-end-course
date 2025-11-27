/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function(arr, k) {
   let low =0;
   let high = arr.length-1;
   while(low<=high){
    let mid = Math.floor((low+high)/2);
    let missing = arr[mid]-(mid+1);

    if(missing <k){
        low = mid +1;
    }else{
        high = mid -1;
    }
   } 

   if(high!== -1){
    let missingValues = arr[high]-(high +1);
    return arr[high]+(k-missingValues);
   }
   return k;
};