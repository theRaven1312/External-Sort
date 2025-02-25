//Tạo hàm divideRuns(input, runSize) để chia mảng input thành các dãy con có kích thước runSize.
function divideRuns(input, runSize) 
{
  const runs = [];
  let run = [];
  for (let i = 0; i < input.length; i++) 
    {
      run.push(input[i]);
      if (run.length === runSize) 
      {
        runs.push(run);
        run = [];
      }
  }
  if (run.length > 0) 
  {
    runs.push(run);
  }
  return runs;
}

//Tạo hàm quickSort(arr) để sắp xếp runs bằng thuật toán quick sort.
function quickSort(arr) 
{
  if (arr.length <= 1) 
  {
    return arr;
  }
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) 
  {
    if (arr[i] < pivot) 
    {
      left.push(arr[i]);
    } 
    else 
    {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

//Tạo một minHeap để truy xuất phần tử nhỏ nhất của các runs
class MinHeap 
{
  constructor() 
  {
      this.heap = [];
  }

  // Lấy chỉ số cha của một phần tử
  parent(index) 
  {
      return Math.floor((index - 1) / 2);
  }

  // Lấy chỉ số con trái
  leftChild(index) 
  {
      return 2 * index + 1;
  }

  // Lấy chỉ số con phải
  rightChild(index) 
  {
      return 2 * index + 2;
  }

  // Thêm một phần tử vào heap
  insert(value) 
  {
      this.heap.push(value);
      this.heapifyUp();
  }

  // Đưa phần tử vừa chèn lên đúng vị trí
  heapifyUp() 
  {
      let index = this.heap.length - 1;
      while (index > 0 && this.heap[index] < this.heap[this.parent(index)]) {
          [this.heap[index], this.heap[this.parent(index)]] = 
          [this.heap[this.parent(index)], this.heap[index]];
          index = this.parent(index);
      }
  }

  // Lấy phần tử nhỏ nhất (root) và xóa nó khỏi heap
  extractMin() 
  {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();

      let min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown(0);
      return min;
  }

  // Đưa phần tử gốc xuống đúng vị trí sau khi xóa phần tử nhỏ nhất
  heapifyDown(index) 
  {
      let left = this.leftChild(index);
      let right = this.rightChild(index);
      let smallest = index;

      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
          smallest = left;
      }
      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
          smallest = right;
      }
      if (smallest !== index) {
          [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
          this.heapifyDown(smallest);
      }
  }
  // Kiểm tra kích thước của heap
  size() {
      return this.heap.length;
  }

  // Kiểm tra heap có rỗng không
  isEmpty() {
      return this.heap.length === 0;
  }
}


function merge(runs)
{

}

