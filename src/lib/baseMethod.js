import Enum from "./enum";
import Resource from "./resource";

/**
 * Kiểm tra xem dữ liệu đầu vào có null không
 * @param {string} value 
 * @returns : nếu mà rỗng thì trả về false ngược lại trả về true
 */
function checkValidEmpty(value) {
    if (value == null || value.trim() == "") {
        return false;
    }
    else {
        return true
    }
}


function forMartDataToString(value) {
    if (value != null) {
        return value.toString(10);
    }
}

function getCurrentDate() {
    let curDate = new Date();
    let day = curDate.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = curDate.getMonth() + 1;
    month = month < 10 ? `0${month}` : day;
    let fullYear = curDate.getFullYear();
    return `${fullYear}-${month}-${day}`;
}

function getCurrentFullYear() {
    let curDate = new Date();
    let fullYear = curDate.getFullYear();
    return fullYear;
}

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
     * Hàm xử lý exception gửi về từ backend hiện ra cho người dùng
     * Author: NVHThai(26/09/2022)
     * @param {int} status: trạng thái bên backend trả về
     * @param {arr} moreInfo: Mảng các lỗi do người dùng nhập thiếu từ backend trả về
     * @param {string} userMsg: Lỗi từ backend trả về hiển thị cho người dùng
     */
function handleException(status, moreInfo, userMsg) {
    try {
        switch (status) {
            case Enum.StatusCode.BADREQUEST:
                this.moreInfo = moreInfo;
                this.titleFormValid = userMsg;
                this.isShowDialogToastValid = true;
                break;
            case Enum.StatusCode.FORBIDDEN:
                this.titleFormException = Resource.TitleException.FORBIDDEN;
                this.isShowDialogToastException = true;
                break;
            case Enum.StatusCode.NOTFOUND:
                this.titleFormException = Resource.TitleException.NOTFOUND;
                this.isShowDialogToastException = true;
                break;
            case Enum.StatusCode.UNAUTHORIZED:
                this.titleFormException = Resource.TitleException.UNAUTHORIZED;
                this.isShowDialogToastException = true;
                break;
            case Enum.StatusCode.NTERNALSERVERERROR:
                this.titleFormException = Resource.TitleException.NTERNALSERVERERROR;
                this.isShowDialogToastException = true;
                break;
        }
    } catch (error) {
        console.log(error);
    }
}


export default {
    checkValidEmpty, forMartDataToString, getCurrentDate, getCurrentFullYear, inputOnlyNumber,handleException
}
