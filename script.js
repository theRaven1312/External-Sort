import { divideRuns, quickSort } from './multiwayBalanceMergeSort.js';

let arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 13, 21, 34, 55];
let maxMemory = 4;

let runs = divideRuns(arr, maxMemory);

let sortedRuns = runs.map(run => quickSort(run));

console.log(sortedRuns);

let flexbox = document.getElementById('flexbox');

sortedRuns.forEach(run => 
{
    let div = document.createElement('div');
    div.className = 'run';

    run.forEach(value => 
    {
        let p = document.createElement('p');
        p.textContent = value;
        div.appendChild(p);
    });
    flexbox.appendChild(div);
}
)
