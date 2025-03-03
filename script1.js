import { MinHeap } from "./multiwayBalanceMergeSort.js";

const html = document.querySelector('html');
const input = document.querySelector('.array-input');
const submitbtn = document.querySelector('.submit-btn');
const oriarray = document.querySelector('#ori-array');
const pseudo = document.querySelector('#pseudo');
const runsRegion = document.querySelector('#runs-region');
const heapRegion = document.querySelector('#heap-region');
const resultRegion = document.querySelector('#result-region');

let arr = []

function takeInput(e) 
{
    if(e == 'Enter') 
    {
        arr = input.value;

        if (arr.length === 0) 
        {
           alert('Mảng không được rỗng');
            return;
        }
        arr = arr.split(' ').map(Number);

        if (arr.includes(NaN))
        {
            alert('Mảng có chứa ký tự không phải số và khoảng trắng');
            return;
        }
        
        console.log(arr);
        input.value = null;
        oriarray.style.opacity = 1;

        //Tiêu đề "Array"
        let oriarrayheader = document.createElement('h2');
        oriarrayheader.textContent = "Array";
        oriarrayheader.classList.add('ori-header');
        oriarray.appendChild(oriarrayheader);


        //Hiển thị mảng
        let arrayholder = document.createElement('div')
        arrayholder.classList.add('array-holder');
        oriarray.appendChild(arrayholder);

        for(let i = 0; i < arr.length; i++) {
            let arrayItem = document.createElement('div');
            arrayItem.classList.add('array-item');
            arrayItem.textContent = arr[i];
            arrayholder.appendChild(arrayItem);
        }

        //Xóa vùng nhập
        let inputRegion = document.querySelector('.input-region');
        let parent = inputRegion.parentNode;
        let descRegion = document.querySelector('.desc-region');
        parent.removeChild(inputRegion);
        parent.removeChild(descRegion);

        addSteps('NMS');
    }
}

function addSteps(method) {
    if (method === 'NMS') {
        let title = document.createElement('h1');
        title.textContent = 'Natural Merge Sort';
        pseudo.appendChild(title);

        let step1 = document.createElement('div');
        step1.classList.add('step');
        step1.textContent = 'Step 1: Identify subsequences with increasing runs';
        pseudo.appendChild(step1);

        let step2 = document.createElement('div');
        step2.classList.add('step');
        step2.textContent = 'Step 2: Merge runs using min heap';
        pseudo.appendChild(step2);
    }

    addPlayButton();
}

function addPlayButton() {
    let playbtn = document.createElement('button');
    playbtn.classList.add('play-btn');
    pseudo.appendChild(playbtn);
    playbtn.addEventListener('click', () => play());
}

let stage = 0;

function play() {
    let step1 = document.querySelector('.step:nth-child(2)');
    let step2 = document.querySelector('.step:nth-child(3)');

    if (stage === 0) {

        let runsHeader = document.createElement('h2');
        runsHeader.classList.add('runs-header');
        runsHeader.textContent = 'Runs';
        runsRegion.appendChild(runsHeader);
        
        step1.style.color = 'green';
        step1.style.scale = '1.2';
        step1.style.fontWeight = 'bold';
        stage++;
        runsRegion.style.opacity = 1;

        findRuns(arr);
        
    } else if (stage === 1) {
        
        step1.style.color = 'gray';
        step1.style.transform = 'scale(1)';
        step1.style.fontWeight = 'normal';

        step2.style.transform = 'scale(1.2)';
        step2.style.fontWeight = 'bold';
        step2.style.color = 'green';
        stage ++;

    //Biểu diễn Heap
        heapRegion.style.opacity = 1;
    //Thêm tiêu đề
        let heapHeader = document.createElement('h2');
        heapHeader.classList.add('heap-header');
        heapHeader.textContent = 'Min-Heap';
        heapRegion.appendChild(heapHeader);

        addHeap(runs);

        resultRegion.style.opacity = 1;

        let resultHeader = document.createElement('h2');
        resultHeader.classList.add('result-header');
        resultHeader.textContent = 'Sorted Array';
        resultRegion.appendChild(resultHeader);
    }
        else if(stage >= 1 && !minHeap.isEmpty())
    {
        sortWithHeap();
    }
        
}


let runs = [];

function findRuns(arr)
{
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

    console.log(runs);

    for(let i = 0; i < runs.length; i++)
    {
        let runholder = document.createElement('div');
        runholder.classList.add('run-holder');
        runsRegion.appendChild(runholder);
  
        for(let j = 0; j < runs[i].length; j++)
        {
            let runItem = document.createElement('div');
            runItem.classList.add('run-item');
            runItem.textContent = runs[i][j];
            runholder.appendChild(runItem);
        }
    }

}

let minHeap = new MinHeap();

function addHeap()
{
    //Thêm phần tử đầu vào heap
    for (let i = 0; i < runs.length; i++) 
    {
        if (runs[i].length > 0) 
        {
            minHeap.push({ value: runs[i][0], runIndex: i, pos: 0 });
            //Xóa phần tử đó
            runs[i].splice(0, 1);
        }
    }

    console.log(runs);

    //Biểu diễn Heap
    for(let i = 0; i < minHeap.heap.length; i++)
    {
        let heapItem = document.createElement('div');
        heapItem.classList.add('heap-item');
        heapItem.textContent = minHeap.heap[i].value;
        heapRegion.appendChild(heapItem);
        
    }

    //Cập nhật lại các runs

    let runHolders = document.querySelectorAll('.run-holder');
    for(let i = 0; i < runHolders.length; i++)
    {
        const firstRunItem = runHolders[i].querySelector('.run-item'); // Chọn phần tử đầu tiên
        if (firstRunItem) 
        {
            firstRunItem.remove(); // Xóa phần tử
        }
    }
}

let resultArray = [];

function sortWithHeap()
{
    let minElement = minHeap.pop();
    resultArray.push(minElement.value);

    let resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    resultItem.textContent = minElement.value;
    resultRegion.appendChild(resultItem);
   

    if (runs[minElement.runIndex].length > 0) 
    {
        minHeap.push({ value: runs[minElement.runIndex][0], runIndex: minElement.runIndex, pos: 0 });
        runs[minElement.runIndex].splice(0, 1);
    }
    
    let heapItems = document.querySelectorAll('.heap-item');
    heapItems.forEach(item => item.remove());

    for (let i = 0; i < minHeap.heap.length; i++) {
        let heapItem = document.createElement('div');
        heapItem.classList.add('heap-item');
        heapItem.textContent = minHeap.heap[i].value;
        heapRegion.appendChild(heapItem);
    }

    let runHolders = document.querySelectorAll('.run-holder');
    let firstRunItem = runHolders[minElement.runIndex].querySelector('.run-item');
    if (firstRunItem) 
    {
        firstRunItem.remove();
        if(runs[minElement.runIndex].length == 0)
        {
            runHolders[minElement.runIndex].style.display = 'none';
        }
    }
}


let playbtn = document.querySelector('.play-btn');

html.addEventListener('keydown', (e) => takeInput(e.key));

submitbtn.addEventListener('click', () => takeInput('Enter'));
