
function naturalMergeSort(arr) {
    while (true) {
        let runs = findRuns(arr);
        
        // Nếu chỉ có một dãy con, mảng đã được sắp xếp
        if (runs.length === 1) {
            break;
        }
        
        // Trộn các dãy con
        for (let i = 0; i < runs.length - 1; i += 2) {
            if (i + 1 < runs.length) {
                merge(arr, runs[i], runs[i + 1]);
            }
        }
    }
    return arr;
}

function findRuns(arr) {
    let runs = [];
    let start = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            runs.push({ start: start, end: i - 1 });
            start = i;
        }
    }
    runs.push({ start: start, end: arr.length - 1 });
    return runs;
}

function merge(arr, run1, run2) {
    let temp = [];
    let i = run1.start;
    let j = run2.start;
    
    while (i <= run1.end && j <= run2.end) {
        if (arr[i] <= arr[j]) {
            temp.push(arr[i]);
            i++;
        } else {
            temp.push(arr[j]);
            j++;
        }
    }
    
    // Sao chép phần còn lại của run1 (nếu có)
    while (i <= run1.end) {
        temp.push(arr[i]);
        i++;
    }
    
    // Sao chép phần còn lại của run2 (nếu có)
    while (j <= run2.end) {
        temp.push(arr[j]);
        j++;
    }
    
    // Sao chép temp vào arr
    for (let k = run1.start; k <= run2.end; k++) {
        arr[k] = temp[k - run1.start];
    }
}

// Ví dụ sử dụng
let arr = [34, 25, 12, 22, 11, 90, 64];
console.log("Mảng trước khi sắp xếp:", arr);
naturalMergeSort(arr);
console.log("Mảng sau khi sắp xếp:", arr);
