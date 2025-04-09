import { clearResults, displayOriginalArray, displayRuns } from './utils.js';

let i = 0;
let runs = [];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function processNaturalMergeSort(array)
{
    let playBtn = document.querySelector('.play-btn');

    let stage = 1;

    if(playBtn)
    {
        playBtn.addEventListener('click', async () =>
        {
            console.log('play button clicked');
            let steps = document.querySelectorAll('.step');
            switch (stage)
            {
                case 1:
                    const oriArray = document.querySelector('#ori-array');
                    oriArray.style.opacity = '1';
                    displayOriginalArray(array);
                    stage++;
                    break;
                case 2:
                    runs = findNaturalRuns(array);
                    const runsRegion = document.getElementById('runs-region');
                    runsRegion.style.opacity = '1';
                    displayRuns(runs);
                    steps[0].classList.replace('unfocus', 'focus');
                    stage++;
                    break;
                case 3:
                    const heapRegion = document.getElementById('heap-region');
                    heapRegion.style.opacity = '1';

                    const heapHeader = document.createElement('h3');
                    heapHeader.textContent = 'Buffer';
                    heapHeader.className = 'heap-header';
                    heapRegion.appendChild(heapHeader);
                    // Create result header                
                    steps[1].classList.replace('unfocus', 'focus');
                    steps[0].classList.replace('focus', 'unfocus');
                    stage++;
                    break;
                case 4:
                    if (runs.length == 1) 
                    {
                        stage++;
                        const resultRegion = document.getElementById('result-region');
                        resultRegion.style.opacity = '1';
                        const resultHeader = document.createElement('h3');
                        resultHeader.textContent = 'Kết quả';
                        resultHeader.className = 'result-header';
                        resultRegion.appendChild(resultHeader);
                        runs[0].forEach(item => {
                            const itemDiv = document.createElement('div');
                            itemDiv.className = 'result-item';
                            itemDiv.textContent = item;
                            resultRegion.appendChild(itemDiv);
                        });
                    }
                    
                    playBtn.style.display = 'none';

                    await simulateMerging(runs);

                    playBtn.style.display = 'inline-block';
                    i++;
                    break;

            }
        });
    }

    // // Find natural runs in the array
    // const runs = findNaturalRuns(array);
    
    // // Display runs
    // displayRuns(runs);
    
    // // Simulate merging process
    // simulateMerging(runs);
}

function findNaturalRuns(array) 
{
    const runs = [];
    let currentRun = [array[0]];
    
    for (let i = 1; i < array.length; i++) {
        if (array[i] >= array[i-1]) {
            // Current element continues the run
            currentRun.push(array[i]);
        } else {
            // Current element starts a new run
            runs.push([...currentRun]);
            currentRun = [array[i]];
        }
    }
    
    // Add the last run
    if (currentRun.length > 0) {
        runs.push(currentRun);
    }
    
    return runs;
}

async function simulateMerging(runs) {

    if(i >= runs.length) { i = 0; }

    let runsholders = document.querySelectorAll('.run-holder');
    let heapRegion = document.getElementById('heap-region');

    let bufferRuns = [];

    if (i + 1 < runs.length) 
        {
        // Bước 1: highlight 2 run
        runsholders[i].animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], {
            duration: 500, easing: 'ease-in-out'
        });
        runsholders[i].style.backgroundColor = 'rgba(76, 175, 80, 0.8)';
        runsholders[i].style.boxShadow = '0px 0px 20px rgba(76, 175, 80, 0.8)';


        runsholders[i + 1].animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], {
            duration: 500, easing: 'ease-in-out'
        });
        runsholders[i + 1].style.backgroundColor = 'rgba(76, 175, 80, 0.8)';
        runsholders[i].style.boxShadow = '0px 0px 20px rgba(76, 175, 80, 0.8)';


        await delay(500); // Đợi animation xong

        // Bước 2: tạo heap-holder
        let heapHolder = document.createElement('div');
        heapHolder.className = 'heap-holder';

        runs[i].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'heap-item';
            itemDiv.textContent = item;
            heapHolder.appendChild(itemDiv);
        });

        runs[i + 1].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'heap-item';
            itemDiv.textContent = item;
            heapHolder.appendChild(itemDiv);
        });

        bufferRuns = [...runs[i], ...runs[i + 1]];
        heapRegion.appendChild(heapHolder);

        await delay(400); // Tiếp tục

        // Bước 3: animate heap
        let heapItems = heapRegion.querySelectorAll('.heap-item');
        heapItems.forEach((item, index) => {
            item.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.2)', boxShadow: '0px 0px 20px rgba(76, 175, 80, 0.8)'},
                { transform: 'scale(1)', boxShadow: 'none'}
            ], { duration: 600, easing: 'ease-in-out' });});




        // Bước 4: sắp xếp và hiển thị lại heap
        bufferRuns.sort((a, b) => a - b);

        heapItems.forEach((item, index) => {
            item.textContent = bufferRuns[index];
        });

        await delay(800);

        // Bước 5: xoá run cũ, chèn run mới
        let runsRegion = document.getElementById('runs-region');
        let runHolders = document.querySelectorAll('.run-holder');

        runHolders[i].remove();
        runHolders[i + 1].remove();

        let newRunHolder = document.createElement('div');
        newRunHolder.className = 'run-holder';

        bufferRuns.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'run-item';
            itemDiv.textContent = item;
            newRunHolder.appendChild(itemDiv);
        });

        runsRegion.insertBefore(newRunHolder, runHolders[i+2]); // Cẩn thận index

        runs.splice(i, 2, bufferRuns);

        newRunHolder.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)', backgroundColor: 'var(--primary-color)', color: 'white' },
            { transform: 'scale(1)', backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }
        ], { duration: 400, easing: 'ease-in-out' });

        await delay(600);

        heapRegion.querySelector('.heap-holder').remove();

    }
}

export { processNaturalMergeSort };
