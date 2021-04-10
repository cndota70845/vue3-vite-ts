<template>
    <div>
        <p>
            输入：{{l1}},{{l2}}
        </p>
        <p>
           输出：{{addTwoNumbers(l1,l2)}} 
        </p>
    </div>
</template>

<script>
export default {
    name: 'LeetCode',
    setup () {
        // var nums = [3,2,4], target = 6;

        // var twoSum = function(nums, target) {
        //     for (let i = 0; i < nums.length; i++) {
        //         for (let k = nums.length -1; k > i; k--) {
        //             if (nums[i] + nums[k] == target) {
        //                 return [i,k];
        //             }
        //         }
        //     }
        // }

        // var twoSum = function(nums, target) {
        //     var map = new Map;
        //     nums.forEach((element,index) => {
        //         map.set(element,index);
        //     });
        //     for (let i = 0; i < nums.length; i ++) {
        //         if (map.has(target - nums[i])) {
        //             let index = map.get(target - nums[i]);
        //             if (index != i) {
        //                 return [i,index];
        //             }
        //         }
        //     };
        // }

        function ListNode(val, next) {
            this.val = (val===undefined ? 0 : val)
            this.next = (next===undefined ? null : next)
        }

        function reverseArr (target,index) {
            if (index < target.length) {
                return {
                    val:target[index++],
                    next:index==target.length?null:reverseArr(target,index)
                }
            }
        }

        // var l1 = new ListNode(2,new ListNode(4,new ListNode(3))), l2 = new ListNode(5,new ListNode(6,new ListNode(4)));
        // var l1 = new ListNode(0), l2 = new ListNode(0);
        var index = 0;
        var arr = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
        var l1 = reverseArr(arr,index), 
            l2 = new ListNode(5,new ListNode(6,new ListNode(4,new ListNode(9))));

        var addTwoNumbers = function(l1, l2) {
            // var arr1 = [];
            // var arr2 = [];
            // function transArr (target,response) {
            //     if (target.val || target.val===0) {
            //         response.push(target.val);
            //         if (target.next === null) {
            //             return;
            //         }
            //         else{
            //             transArr(target.next,response);
            //         }
            //     }
            // }

            // function reverseArr (target,index) {
            //     if (index < target.length) {
            //         return {
            //             val:target[index++],
            //             next:index==target.length?null:reverseArr(target,index)
            //         }
            //     }
            // }

            // transArr(l1,arr1);
            // transArr(l2,arr2);
            // arr1.reverse();
            // arr2.reverse();
            // var arr3 = String(parseInt((arr1.toString()).replace(new RegExp(",","gm"),'')) + parseInt((arr2.toString()).replace(new RegExp(",","gm"),'')));
            // console.log(Number((arr1.toString()).replace(new RegExp(",","gm"),'')),arr2,arr3);
            // var l3 = arr3.split('').map(Number);
            // l3.reverse();
            // var index = 0;
            // return reverseArr(l3,index);

            let head = null, tail = null;
            let carry = 0;
            while (l1 || l2) {
                const n1 = l1 ? l1.val : 0;
                const n2 = l2 ? l2.val : 0;
                const sum = n1 + n2 + carry;
                if (!head) {
                    head = tail = new ListNode(sum % 10);
                } else {
                    tail.next = new ListNode(sum % 10);
                    tail = tail.next;
                }
                carry = Math.floor(sum / 10);
                if (l1) {
                    l1 = l1.next;
                }
                if (l2) {
                    l2 = l2.next;
                }
            }
            if (carry > 0) {
                tail.next = new ListNode(carry);
            }
            return head;
        };

        return {
            l1,
            l2,
            addTwoNumbers
        }
    }
}
</script>

<style>

</style>