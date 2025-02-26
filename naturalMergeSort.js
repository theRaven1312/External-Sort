class MinHeap {
    constructor() 
    {
        this.heap = [];
    }

    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    swap(i, j) 
    {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    push(value) 
    {
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() 
    {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return root;
    }

    heapifyUp() 
    {
        let index = this.heap.length - 1;
        while (index > 0 && this.heap[index].value < this.heap[this.getParentIndex(index)].value) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    }

    heapifyDown() 
    {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.getRightChildIndex(index) < this.heap.length &&
                this.heap[this.getRightChildIndex(index)].value < this.heap[smallerChildIndex].value) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index].value < this.heap[smallerChildIndex].value) break;
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    isEmpty() 
    {
        return this.heap.length === 0;
    }
}

function findRuns(arr)
{
    let runs = [];
    let run = [arr[0]];
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i] < arr[i + 1])
        {
            run.push(arr[i + 1]);
        }
        else
        {
            runs.push(run);
            run = [arr[i + 1]];
        }
    }
    return runs;
}

function mergeRuns(runs) 
{
    let minHeap = new MinHeap();
    let result = [];

    // Đưa phần tử đầu tiên của mỗi run vào heap
    for (let i = 0; i < runs.length; i++) 
    {
        if (runs[i].length > 0) 
        {
            minHeap.push({ value: runs[i][0], runIndex: i, pos: 0 });
        }
    }

    // Xử lý từng phần tử nhỏ nhất trong heap
    while (!minHeap.isEmpty()) 
    {
        console.log('Min-Heap:');
        for(let i = 0; i < minHeap.heap.length; i++)
        {
            console.log(minHeap.heap[i].value);
        }
        console.log('---------------------');
        let { value, runIndex, pos } = minHeap.pop();
        result.push(value);
        
        console.log('Result:');
        for(let i = 0; i < result.length; i++)
        {
            console.log(result[i]);
        }
        console.log('---------------------');

        // Nếu run đó còn phần tử, chèn tiếp vào heap
        if (pos + 1 < runs[runIndex].length) 
        {
            minHeap.push({ value: runs[runIndex][pos + 1], runIndex, pos: pos + 1 });
        }
    }

    return result;
}

function naturalMergeSort(arr) 
{
    let runs = findRuns(arr);

    if (runs.length === 1) return runs[0];

    return mergeRuns(runs);
}

let arr = [1, 3, 7, 5, 4, 6, 9, 8, 2];
let runs = findRuns(arr);
console.log('Runs:', runs);
let sortedArr = naturalMergeSort(arr);
console.log('Sorted:', sortedArr);
