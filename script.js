const html = document.querySelector('html');
const input = document.querySelector('.array-input');
const submitbtn = document.querySelector('.submit-btn');
const oriarray = document.querySelector('#ori-array');

let arr = []

function takeInput(e) 
{
    if(e == 'Enter') 
    {
        arr = input.value;

        if (arr.length === 0) 
        {
            generateWarning('Mảng không được rỗng');
            return;
        }
    

        arr = arr.split(' ').map(Number);

        if (arr.includes(NaN))
        {
            generateWarning('Mảng có chứa ký tự không phải số và khoảng trắng');
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
    }
}

function generateWarning(message) 
{
    let warning = document.createElement('div');
    warning.classList.add('warning');
    warning.textContent = "Warning: " + message;
    warning.style.color = 'red';
    warning.style.fontWeight = 'bold';
    let descRegion = document.querySelector('.desc-region');
    descRegion.appendChild(warning);

    setTimeout(() => {
        warning.remove();
    }, 5000);
}

html.addEventListener('keydown', (e) => takeInput(e.key));

submitbtn.addEventListener('click', () => takeInput('Enter'));


