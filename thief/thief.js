document.getElementById('ps-btn').addEventListener('click', function() {
    // 取得四個 input 的值
    var passA = document.getElementById('pass-a').value.trim();
    var passB = document.getElementById('pass-b').value.trim();
    var passC = document.getElementById('pass-c').value.trim();
    var passD = document.getElementById('pass-d').value.trim();

    // 檢查每個 input 是否只有一個數字
    if (!isValidNumber(passA) || !isValidNumber(passB) || !isValidNumber(passC) || !isValidNumber(passD)) {
        alert("密碼內容有錯，請檢查");
        return;
    }

    // 將四個數字組成字串
    var password = passA + passB + passC + passD;

    // 發送 POST 請求
    fetch('http://localhost:8080/api/unlock_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: password })
    })
    .then(response => response.text())
    .then(url => {
        if (!url || url === 'null') {
            alert("密碼錯誤");
        } else {
			// 導頁
//            window.location.href = url;

			// 清空輸入框內容
			document.getElementById('pass-a').value = '';
			document.getElementById('pass-b').value = '';
			document.getElementById('pass-c').value = '';
			document.getElementById('pass-d').value = '';

			// 在新標籤頁中打開 URL
			window.open(url, '_blank');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("發生錯誤，請告知婚宴聯絡人");
    });
});

// 檢查 input 的值是否是一個數字且只有一個字元
function isValidNumber(value) {
    return value.length === 1 && /^[0-9]$/.test(value);
}
