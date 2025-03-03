const input = document.querySelector('.array-input');
const submitbtn = document.querySelector('.submit-btn');
const oriarray = document.querySelector('#ori-array');
const pseudo = document.querySelector('#pseudo');
const runsRegion = document.querySelector('#runs-region');

let arr = [];

submitbtn.addEventListener('click', takeInput);
input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        takeInput();
    }
});

function takeInput() {
    arr = input.value.trim();

    if (arr.length === 0) {
        alert('Mảng không được rỗng');
        return;
    }

    arr = arr.split(' ').map(Number);

    if (arr.some(isNaN)) {
        alert('Mảng có chứa ký tự không phải số hoặc khoảng trắng không hợp lệ');
        return;
    }

    console.log(arr);

    input.value = '';

    oriarray.innerHTML = ''; // Reset output
    oriarray.style.opacity = 1;

    let arrayholder = document.createElement('div');
    arrayholder.classList.add('array-holder');
    oriarray.appendChild(arrayholder);

    for (let num of arr) {
        let arrayItem = document.createElement('div');
        arrayItem.classList.add('array-item');
        arrayItem.textContent = num;
        arrayholder.appendChild(arrayItem);
    }

    let inputRegion = document.querySelector('.input-region');
    let parent = inputRegion.parentNode;
    let descRegion = document.querySelector('.desc-region');
    parent.removeChild(inputRegion);
    parent.removeChild(descRegion);

    addSteps('NMS');
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
        stage = 2;
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

