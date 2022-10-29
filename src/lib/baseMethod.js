/**
 * Kiểm tra xem dữ liệu đầu vào có null không
 * @param {string} value 
 * @returns : nếu mà rỗng thì trả về false ngược lại trả về true
 * Author: NVHThai (10/10/2020)  
 */
function checkValidEmpty(value) {
    if (value == null) {
        return false;
    }
    else if(value.trim() == ""){
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
    month = month < 10 ? `0${month}` : month;
    let fullYear = curDate.getFullYear();
    return `${fullYear}-${month}-${day}`;
}

function formartDate(dateSrc) {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
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

/**
 * Hàm sử lý dấu chấm thành dấu phẩy vd 6.67 thành 6,67
 * Author: NVHThai (03/10/2022)
 */
function formartRate(number) {
    try {
        if (number != null) {
            let arrayStrig = number.toString(10).split(".");
            if (arrayStrig[1] != null) {
                return arrayStrig[0] + "," + arrayStrig[1];
            } else {
                return arrayStrig[0];
            }
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Hàm sử lý dấu phẩy thành dấu chấm vd 6,67 thành 6.67
 * Author: NVHThai (03/10/2022)
 */
function formartRateToNumber(number) {
    try {
        if (number != null) {
            let arrayStrig = number.toString(10).split(",");
            if (arrayStrig[1] != null) {
                return arrayStrig[0] + "." + arrayStrig[1];
            } else {
                return arrayStrig[0];
            }
        }
    } catch (error) {
        console.log(error);
    }
}

/**
* Hàm formart số có dấu .
* Author: NVHTHai (12/09/2022)
* @param {int} number
*/
function formartNumber(number) {
    try {
        if (number && !isNaN(number)) {
            return number.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
        } else {
            return number;
        }
    } catch (error) {
        console.log(error);
    }
}

/**
* Hàm formart chuỗi thành kiểu float
* Author: NVHTHai (12/09/2022)
* @param {float} numberFloat
*/
function handleDataToNumberTypeFloat(numberFloat) {
    try {
        if (typeof numberFloat == "number") {
            return parseFloat(numberFloat);
        } else {
            return parseFloat(numberFloat.replace(/[^0-9]/g, ""));
        }
    } catch (error) {
        console.log(error);
    }
}

/**
* Hàm formart chuỗi thành kiểu int
* Author: NVHTHai (12/09/2022)
* @param {int} numberInt
*/
function handleDataToNumberTypeInt(numberInt) {
    try {
        if (typeof number == "number") {
            return parseFloat(numberInt);
        } else {
            return parseFloat(numberInt.replace(/[^0-9]/g, ""));
        }
    } catch (error) {
        console.log(error);
    }
}
export default {
    checkValidEmpty, forMartDataToString, getCurrentDate, getCurrentFullYear, inputOnlyNumber, formartNumber, formartRate, formartRateToNumber,
    handleDataToNumberTypeFloat, handleDataToNumberTypeInt,formartDate
}
