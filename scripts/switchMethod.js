import { processNaturalMergeSort} from './scriptNatural.js';
import { processMultiwayBalanceMergeSort } from './scriptMultiway.js';

document.addEventListener('DOMContentLoaded', function() 
{
    const navButtons = document.querySelectorAll('.nav-btn');
    const submitBtn = document.getElementById('submit-btn');
    const arrayInput = document.querySelector('.array-input');
    const gridItems = document.querySelectorAll('.grid-item');
    const siteTitle = document.getElementById('site-title');
    let currentAlgorithm = 'Natural Merge Sort'; // Default algorithm
    
    // Set up placeholder example
    const exampleArray = "23 87 15 67 34 92 5 77 11 42 98 1 35 63 82 49 74 25 31 59";
    arrayInput.placeholder = exampleArray;
    
    siteTitle.addEventListener('click', () => window.location.reload());

    // Highlight the first algorithm button as active
    navButtons[0].classList.add('active');

    // Add click event to nav buttons
    navButtons.forEach(button => 
    {
        button.addEventListener('click', function() 
        {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current algorithm
            currentAlgorithm = this.querySelector('p').textContent;
            
            // Update the h2 title
            document.querySelector('.input-region h2').textContent = `Chọn thuật toán: ${currentAlgorithm}`;
            
            // Animation effect
            button.animate([
                { transform: 'scale(0.8)' },
                { transform: 'scale(1.1)' },
                { transform: 'scale(1)' }
            ], {
                duration: 500,
                easing: 'ease-out'});
        });
    });
    
    // Add submit button functionality
    submitBtn.addEventListener('click', function() 
    {
        const inputValue = arrayInput.value.trim() || exampleArray;
        const array = inputValue.split(/\s+/).map(Number);
         
        if (array.some(isNaN)) 
        {
            alert('Vui lòng nhập chỉ số nguyên, được phân cách bởi dấu cách.');
            return;
        }
        else
        {
            let inputRegion = document.querySelector('.input-region');
            inputRegion.remove();
            let descRegion = document.querySelector('.desc-region');
            descRegion.remove();
            let h2 = document.createElement('h2');
            h2.textContent = currentAlgorithm;
            let pseudo = document.querySelector('#pseudo');
            pseudo.appendChild(h2);
        }
        
        // Process the array according to the selected algorithm
        if (currentAlgorithm === 'Natural Merge Sort')
        {
            let remv = document.querySelector('#mbms-btn');
            remv.remove();
            let pseudo = document.querySelector('#pseudo');
            let steps = ['Bước 1: Chia mảng thành các run', 'Bước 2: Trộn các run lại với nhau'];
            for(let i = 0; i < steps.length; i++)
                {
                    let step = document.createElement('p');
                    step.textContent = steps[i];
                    step.className = 'step';
                    step.classList.add('unfocus');
                    pseudo.appendChild(step);
                }
                
                let playbtn = document.createElement('div');
                playbtn.className = 'play-btn';
                pseudo.appendChild(playbtn);

                processNaturalMergeSort(array);
        } 
        else 
        {
            let remv = document.querySelector('#nms-btn');
            remv.remove();
            let pseudo = document.querySelector('#pseudo');
            let steps = ['Bước 1: Chia mảng thành các run', 'Bước 2: Sắp xếp các runs', 'Bước 3: Trộn các runs với nhau sử dụng Min Heap'];
            for(let i = 0; i < steps.length; i++)
                {
                    let step = document.createElement('p');
                    step.textContent = steps[i];
                    step.className = 'step';
                    step.classList.add('unfocus');
                    pseudo.appendChild(step);
                }
                
                let playbtn = document.createElement('button');
                playbtn.className = 'play-btn';
                pseudo.appendChild(playbtn);

                processMultiwayBalanceMergeSort(array);
        }
    });

    // Add keyboard shortcut for submission (Enter key in input field)
    arrayInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            submitBtn.click();
        }
    });
    
    // Add some initial animations to make the UI more engaging
    function initialAnimations() {
        // Animate the title
        const siteTitle = document.getElementById('site-title');
        siteTitle.animate([
            { transform: 'scale(0.9)' },
            { transform: 'scale(1.1)' },
            { transform: 'scale(1)' }
        ], {
            duration: 1000,
            easing: 'ease-in-out'
        });
        
        // Animate the input region
        const inputRegion = document.querySelector('.input-region');
        inputRegion.style.opacity = '0';
        setTimeout(() => {
            inputRegion.style.transition = 'opacity 1s ease-in-out';
            inputRegion.style.opacity = '1';
        }, 300);
        
        // Animate the description region
        const descRegion = document.querySelector('.desc-region');
        descRegion.style.opacity = '0';
        setTimeout(() => {
            descRegion.style.transition = 'opacity 1s ease-in-out';
            descRegion.style.opacity = '1';
        }, 600);
    }
    
    // Run initial animations
    initialAnimations();
    
    // Add a loading indicator when processing large arrays
    function showLoadingIndicator() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = '<div class="spinner"></div><p>Đang xử lý...</p>';
        document.body.appendChild(loader);
        
        return {
            remove: function() {
                document.body.removeChild(loader);
            }
        };
    }
});
