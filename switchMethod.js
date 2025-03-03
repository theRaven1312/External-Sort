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

// Gán sự kiện cho các nút bấm
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".nav-btn:nth-child(3)").addEventListener("click", function () {
        loadScript("script1.js"); // Chuyển sang Natural Merge Sort

    });

    document.querySelector(".nav-btn:nth-child(4)").addEventListener("click", function () {
        loadScript("script.js"); // Chuyển sang Multiway Balance Merge Sort

    });
});
