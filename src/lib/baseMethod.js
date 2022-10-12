/**
 * Kiểm tra xem dữ liệu đầu vào có null không
 * @param {string} value 
 * @returns : nếu mà rỗng thì trả về false ngược lại trả về true
 * Author: NVHThai (10/10/2020)  
 */
function checkValidEmpty(value) {
    if (value == null || value.trim() == "") {
        return false;
    }
    else {
        return true
    }
}

/**
 * Chuyển các dạng int float.. thành string
 * @param {int, float. . .} value : gía trị số truyền vào
 * @returns : Giá trị là chuỗi
 * Author: NVHThai (10/10/2020)  
 */
function forMartDataToString(value) {
    if (value != null) {
        return value.toString(10);
    }
}

/**
 * Hàm lấy ngày tháng năm hiện tại
 * @returns : về chuỗi năm tháng ngày
 * Author: NVHThai (10/10/2020)  
 */
function getCurrentDate() {
    let curDate = new Date();
    let day = curDate.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = curDate.getMonth() + 1;
    month = month < 10 ? `0${month}` : day;
    let fullYear = curDate.getFullYear();
    return `${fullYear}-${month-1}-${day}`;
}

/**
* Hàm lấy năm hiện tại
* @returns : năm hiện tại
* Author: NVHThai (10/10/2020)  
*/
function getCurrentFullYear() {
    let curDate = new Date();
    let fullYear = curDate.getFullYear();
    return fullYear;
}

/**
* Hàm chỉ cho nhập số
* @param {$event} e 
* @returns : cho nhập số là true
* Author: NVHThai (10/10/2020)  
*/
function inputOnlyNumber(e) {
    if (
        (e.keyCode > 9 && e.keyCode < 37) ||
        (e.keyCode > 40 && e.keyCode < 46) ||
        e.keyCode == 47 ||
        (e.keyCode > 57 && e.keyCode < 96) ||
        (e.keyCode > 105 && e.keyCode < 111) ||
        e.keyCode < 7 ||
        (e.keyCode > 111 && e.keyCode < 187) ||
        e.keyCode > 189
    ) {
        return true
    }
    return false;
}


export default {
    checkValidEmpty, forMartDataToString, getCurrentDate, getCurrentFullYear, inputOnlyNumber,
}
