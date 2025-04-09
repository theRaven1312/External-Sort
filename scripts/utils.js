function clearResults() 
{
    document.getElementById('ori-array').innerHTML = '';
    document.getElementById('runs-region').innerHTML = '';
    document.getElementById('heap-region').innerHTML = '';
    document.getElementById('result-region').innerHTML = '';
}

// Function to display the original array
function displayOriginalArray(array) 
{
    const oriArrayDiv = document.getElementById('ori-array');
    
    // Create header
    const header = document.createElement('h3');
    header.textContent = 'Mảng ban đầu';
    header.className = 'ori-header';
    oriArrayDiv.appendChild(header);
    
    // Create container for array items
    const arrayHolder = document.createElement('div');
    arrayHolder.className = 'array-holder';
    
    // Add each array item with animation delay
    array.forEach((num, index) => {
        const item = document.createElement('div');
        item.className = 'array-item';
        item.textContent = num;
        item.style.animationDelay = `${index * 50}ms`;
        
        // Add animation class
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.animation = `fadeIn 0.5s ease forwards ${index * 50}ms`;
        }, 10);
        
        arrayHolder.appendChild(item);
    });
    
    oriArrayDiv.appendChild(arrayHolder);
}

function displayRuns(runs) 
{
    const runsRegion = document.getElementById('runs-region');
    
    // Create header
    const header = document.createElement('h3');
    header.textContent = 'Các Runs';
    header.className = 'runs-header';
    runsRegion.appendChild(header);
    
    // Display each run with animation delay
    runs.forEach((run, runIndex) => {
        const runHolder = document.createElement('div');
        runHolder.className = 'run-holder';
        runHolder.style.animationDelay = `${runIndex * 200}ms`;
        
        // Add each item in the run
        run.forEach((num, itemIndex) => {
            const item = document.createElement('div');
            item.className = 'run-item';
            item.textContent = num;
            item.style.animationDelay = `${runIndex * 200 + itemIndex * 50}ms`;
            runHolder.appendChild(item);
        });
        
        runsRegion.appendChild(runHolder);
    });
}

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
  

export {clearResults, displayOriginalArray, displayRuns, MinHeap};
