const html = document.querySelector('html');
const input = document.querySelector('.array-input');
const submitbtn = document.querySelector('.submit-btn');
const oriarray = document.querySelector('#ori-array');
const pseudo = document.querySelector('#pseudo');
const runsRegion = document.querySelector('#runs-region');

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

        let arrayholder = document.createElement('div')
        arrayholder.classList.add('array-holder');
        oriarray.appendChild(arrayholder);

        for(let i = 0; i < arr.length; i++) {
            let arrayItem = document.createElement('div');
            arrayItem.classList.add('array-item');
            arrayItem.textContent = arr[i];
            arrayholder.appendChild(arrayItem);
        }
        let inputRegion = document.querySelector('.input-region');
        let parent = inputRegion.parentNode;
        let descRegion = document.querySelector('.desc-region');
        parent.removeChild(inputRegion);
        parent.removeChild(descRegion);

        addSteps('MBMS');
    }
}


function addSteps(method)
{
    if(method == 'MBMS')
    {
        let title = document.createElement('h1');
        title.textContent = 'Multiway Balance Merge Sort';
        pseudo.appendChild(title);
        let step1 = document.createElement('div');
        step1.classList.add('step');
        step1.textContent = 'Steps 1: Divide the array into runs with maximum length of maxMemorySize';
        pseudo.appendChild(step1);

        let step2 = document.createElement('div');
        step2.classList.add('step');
        step2.textContent = 'Steps 2: Sort each run using quick sort';
        pseudo.appendChild(step2);

        let step3 = document.createElement('div');
        step3.classList.add('step');
        step3.textContent = 'Steps 3: Merge runs using min heap';
        pseudo.appendChild(step3);
    }

    addPlayButton();
}

function addPlayButton()
{

    let playbtn = document.createElement('button');
    playbtn.classList.add('play-btn');
    pseudo.appendChild(playbtn);
    playbtn.addEventListener('click', () => play());
}

let stage = 0;

function play()
{
    let step1 = document.querySelector('.step:nth-child(2)');
    let step2 = document.querySelector('.step:nth-child(3)');
    let step3 = document.querySelector('.step:nth-child(4)');

    if(stage == 0)
    {
        step1.style.color = 'green';
        step1.style.scale = '1.2';
        step1.style.fontWeight = 'bold';
        stage++;
        runsRegion.style.opacity = 1;

        divideRuns(arr, 4);
    }
    else if(stage == 1)
    {
        step1.style.color = 'gray';
        step1.style.scale = '1';
        step1.style.fontWeight = 'normal';

        step2.style.scale = '1.2';
        step2.style.fontWeight = 'bold';
        step2.style.color = 'green';
        stage = 2;

        sortRuns(runs);
    }
    else if(stage == 2)
    {
        step2.style.color = 'gray';
        step2.style.scale = '1';
        step2.style.fontWeight = 'normal';

        step3.style.scale = '1.2';
        step3.style.fontWeight = 'bold';
        step3.style.color = 'green';
        stage = 3;
    }
}
//
let runs = []

function divideRuns(arr, maxMemory)
{
  let count = 0;
  let run = [];
  for(let i = 0; i < arr.length; i++)
  {
      if(count === maxMemory)
      {
          runs.push(run);
          run = [];
          count = 0;
      }
      run.push(arr[i]);
      count++;
  }
  if(run.length > 0)
  {
      runs.push(run);
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

function quickSort(arr)
{
  if(arr.length <= 1)
  {
      return arr;
  }
  let pivot = arr[0];
  let left = [];
  let right = [];
  for(let i = 1; i < arr.length; i++)
  {
      if(arr[i] < pivot)
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

function sortRuns(runs)
{
    for(let i = 0; i < runs.length; i++)
    {
        runs[i] = quickSort(runs[i])
    }
    console.log(runs);

    let runHolders = document.querySelectorAll('.run-holder');
    for(let i = 0; i < runs.length; i++)
    {
        let runItems = runHolders[i].querySelectorAll('.run-item');
        for(let j = 0; j < runs[i].length; j++)
        {
            runItems[j].textContent = runs[i][j];
        }
    }
}

let playbtn = document.querySelector('.play-btn');

html.addEventListener('keydown', (e) => takeInput(e.key));

submitbtn.addEventListener('click', () => takeInput('Enter'));


