import { clearResults, displayOriginalArray, displayRuns, MinHeap } from './utils.js';

let runs = [];
let minHeap = new MinHeap();

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function processMultiwayBalanceMergeSort(array) 
{
    let playBtn = document.querySelector('.play-btn');

    const runSize = 4;
    
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
                    runs = createFixedSizeRuns(array, runSize);
                    const runsRegion = document.getElementById('runs-region');
                    runsRegion.style.opacity = '1';
                    displayRuns(runs);
                    steps[0].classList.replace('unfocus', 'focus');
                    stage++;
                    break;
                case 3:       
                    steps[1].classList.replace('unfocus', 'focus');
                    steps[0].classList.replace('focus', 'unfocus');

                    let runHolders = document.querySelectorAll('.run-holder');

                    runs.forEach((run, index) => {
                      run.sort((a, b) => a - b);
                    });

                    runHolders.forEach((holder, index) => {
                        holder.animate([
                        {boxShadow: '0px 0px 0px rgba(76, 175, 80, 0.8)'},
                        {boxShadow: '0px 0px 20px rgba(76, 175, 80, 0.8)',
                        backgroundColor: 'rgba(76, 175, 80, 0.6)'},
                        {boxShadow: '0px 0px 0px rgba(76, 175, 80, 0.8)',
                        backgroundColor: 'var(--background-color)'}
                        ], {
                            duration: 600,
                            easing: 'ease-in'
                        });
                    });

                    await delay(300);

                    runHolders.forEach((holder, index) => {
                      const items = holder.querySelectorAll('.run-item'); // lấy các item con
                      items.forEach((item, itemIndex) => {
                        item.textContent = runs[index][itemIndex];
                      });
                    });
                    stage++;
                    break;
                case 4:
                    const heapRegion = document.getElementById('heap-region');
                    heapRegion.style.opacity = '1';

                    // Create heap header
                    const heapHeader = document.createElement('h3');
                    heapHeader.textContent = 'Min-Heap';
                    heapHeader.className = 'heap-header';
                    heapRegion.appendChild(heapHeader);
                    
                    // Create result header                
                    steps[2].classList.replace('unfocus', 'focus');
                    steps[1].classList.replace('focus', 'unfocus');
                    
                    stage++;
                case 5:
                    runs.forEach((run, index) => 
                    {
                        minHeap.push({value: run[0], runIndex: index, itemIndex: 0});
                        const item = document.createElement('div');
                        item.className = 'heap-item';
                        item.textContent = `Phần tử nhỏ nhất run ${index + 1}: ${run[0]}`;
                        heapRegion.appendChild(item);
                    });
                    let resultRegion = document.getElementById('result-region');
                    resultRegion.style.opacity = '1';
                    const resultHeader = document.createElement('h3');
                    resultHeader.textContent = 'Kết quả';
                    resultHeader.className = 'result-header';
                    resultRegion.appendChild(resultHeader);
                    stage++;
                    break;
                case 6:
                    if(minHeap.isEmpty())
                    {
                        stage++;
                        break;
                    }
                    playBtn.style.display = 'none';
                    await simulateMultiwayMerging(runs);
                    playBtn.style.display = 'inline-block';
                    break;
            }
        });
    }
}

function createFixedSizeRuns(array, runSize) 
{
    const runs = [];
    
    for (let i = 0; i < array.length; i += runSize) {
        const run = array.slice(i, i + runSize);
        runs.push(run);
    }
    
    return runs;
}

// Function to simulate multiway merging for Multiway Balance Merge Sort
async function simulateMultiwayMerging(runs) 
{
    let minElement = minHeap.pop();
    let runHolders = document.querySelectorAll('.run-holder');
    let heapItems = document.querySelectorAll('.heap-item');

    heapItems[minElement.runIndex].animate([
        {boxShadow: '0px 0px 0px rgba(76, 175, 80, 0.8)'},
        {boxShadow: '0px 0px 20px rgba(76, 175, 80, 0.8)',
        backgroundColor: 'rgba(76, 175, 80, 0.6)'},
        {boxShadow: '0px 0px 0px rgba(76, 175, 80, 0.8)',
        backgroundColor: 'var(--background-color)'}
    ], {
        duration: 600,
        easing: 'ease-in'
    });

    runHolders[minElement.runIndex].animate([
        {boxShadow: '0px 0px 0px rgba(76, 175, 80, 0.8)'},
        {boxShadow: '0px 0px 20px rgba(76, 175, 80, 0.8)',
        backgroundColor: 'rgba(76, 175, 80, 0.6)'},
        {boxShadow: '0px 0px 0px rgba(76, 175, 80, 0.8)',
        backgroundColor: 'var(--background-color)'}
    ], {
        duration: 600,
        easing: 'ease-in'
    });

    if (minElement.itemIndex + 1 < runs[minElement.runIndex].length)
    {
        minHeap.push({
            value: runs[minElement.runIndex][minElement.itemIndex + 1],
            runIndex: minElement.runIndex,
            itemIndex: minElement.itemIndex + 1
        });

        await delay(600);

        runHolders[minElement.runIndex].querySelectorAll('.run-item')[minElement.itemIndex + 1].animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)', backgroundColor: 'rgba(76, 175, 80, 1)' },
            { transform: 'scale(1)' }
        ], {
            duration: 600,
            easing: 'ease-in'
        });

        heapItems[minElement.runIndex].textContent = `Phần tử nhỏ nhất run ${minElement.runIndex + 1}: ${runs[minElement.runIndex][minElement.itemIndex + 1]}`;

        heapItems[minElement.runIndex].animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)', backgroundColor: 'rgba(76, 175, 80, 1)' },
            { transform: 'scale(1)' }
        ], {
            duration: 600,
            easing: 'ease-in'
        });
    }
    else if(minElement.itemIndex + 1 === runs[minElement.runIndex].length)
    {
        heapItems[minElement.runIndex].textContent = `Phần tử nhỏ nhất run ${minElement.runIndex + 1}: null`;
        heapItems[minElement.runIndex].animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)', backgroundColor: 'rgba(76, 175, 80, 0.5)' },
            { transform: 'scale(1)' }
        ], {
            duration: 600,
            easing: 'ease-in'
        });
    }

    await delay(600);

    let resultRegion = document.getElementById('result-region');
    let resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.textContent = minElement.value;
    resultRegion.appendChild(resultItem);

}

export { processMultiwayBalanceMergeSort};
