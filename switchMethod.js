function loadScript(scriptName) {
    // Xóa script cũ nếu có
    let oldScript = document.getElementById("dynamic-script");
    if (oldScript) {
        oldScript.remove();
    }

    // Tạo script mới
    let script = document.createElement("script");
    script.src = scriptName;
    script.type = "module"; 
    script.defer = true; 
    script.id = "dynamic-script";

    // Thêm script vào body
    document.body.appendChild(script);
}

let header2 = document.querySelector('h2');
let chose = 0;
let inputField = document.querySelector('input');
inputField.disabled = true;
let submitbtn = document.querySelector('.submit-btn');
submitbtn.disabled = true;

// Gán sự kiện cho các nút bấm
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".nav-btn:nth-child(3)").addEventListener("click", function () 
    {
        loadScript("script1.js"); // Chuyển sang Natural Merge Sort
        header2.textContent = 'Đã chọn Natural Merge Sort'
        chose = 1;
        inputField.disabled = false;
        submitbtn.disabled = false;
        inputField.placeholder = 'Nhập mảng';

    });

    document.querySelector(".nav-btn:nth-child(4)").addEventListener("click", function () {
        loadScript("script.js"); // Chuyển sang Multiway Balance Merge Sort
        header2.textContent = 'Đã chọn Multiway Balance Merge Sort'
        chose = 1;
        inputField.disabled = false;
        submitbtn.disabled = false;
        inputField.placeholder = 'Nhập mảng';
    });
});





