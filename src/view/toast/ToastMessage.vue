<template>
    <div class="m-toast-main">
        <div class="m-toast-message">
            <!-- <div class="m-toast m-toast-error">
                <div class="m-toast__icon"></div>
                <div class="m__text-toast-message"><span style="color: #EB3333;">Cảnh báo!</span> Không được để trống.</div>
                <button class="m__icon m__icon-x"></button>
            </div>
            <div class="m-toast m-toast-warning">
                <div class="m-toast__icon"></div>
                <div class="m__text-toast-message"><span style="color: #FFAD33;">Cảnh báo!</span> Không được để trống.</div>
                <button class="m__icon m__icon-x"></button>
            </div>
            <div class="m-toast m-toast-info">
                <div class="m-toast__icon"></div>
                <div class="m__text-toast-message"><span style="color: #067933;">Thành công!</span> Công việc đã được xóa.</div>
                <button class="m__icon m__icon-x"></button>
            </div> -->
            <div class="m-toast m-toast-done">
                <div class="m-icon-success m-toast__icon"></div>
                <div class="m__text-toast-message">Lưu dữ liệu thành công</div>
                <button class="m__icon m__icon-x ">
                    <div class="m-icon-x-toast"></div>
                </button>
            </div>
        </div>



        <div class="m-dialog-toast-attention-add">
            <div class="m-dialog-toast__attention-add">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>Bạn có muốn hủy bỏ khai báo tài sản này?</span>
                </div>

                <div class="m-dialog-toast__attention--btn">
                    <div class="btn btn__outline">Không</div>
                    <div class="ml-8 btn">Hủy bỏ</div>
                </div>
            </div>
        </div>

        <div class="m-dialog-toast-attention-edit">
            <div class="m-dialog-toast__attention-edit">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?</span>
                </div>

                <div class="m-dialog-toast__attention--btn">
                    <div class="btn btn__outline">Hủy bỏ</div>
                    <div class="ml-8 btn btn__sub">Không lưu</div>
                    <div class="ml-8 btn">Lưu</div>
                </div>
            </div>
        </div>


        <div class="m-dialog-toast-attention-delete">
            <div class="m-dialog-toast__attention-delete">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>Bạn có muốn xóa tài sản (mã tên tài sản) </span>
                </div>

                <div class="m-dialog-toast__attention--btn">
                    <div class="btn btn__outline">Không</div>
                    <div class="ml-8 btn">Xóa</div>
                </div>
            </div>
        </div>

        <div class="m-dialog-toast-attention-delete-none">
            <div class="m-dialog-toast__attention-delete-none">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>Không thể xóa tài sản này vì có chứng từ phát sinh.</span>
                </div>

                <div class="m-dialog-toast__attention--btn">
                    <div class="btn">Đóng</div>
                </div>
            </div>
        </div>

        <div class="m-dialog-toast-attention-deletes">
            <div class="m-dialog-toast__attention-deletes">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>04 tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?</span>
                </div>

                <div class="m-dialog-toast__attention--btn">
                    <div class="btn btn__outline">Không</div>
                    <div class="ml-8 btn">Xóa</div>
                </div>
            </div>
        </div>

        <div class="m-dialog-toast-attention-deletes-none">
            <div class="m-dialog-toast__attention-deletes-none">
                <div class="m-dialog-toast__attention--content m-icon-warning">
                    <span>02 tài sản đã được chọn không thể xóa. Vui lòng kiểm tra lại tài sản trước khi thực hiện xóa.</span>
                </div>

                <div class="m-dialog-toast__attention--btn">
                    <div class="btn">Đóng</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@import url(../../css/details/toast.css);
@import url(../../css/details/toastdialog.css);
</style>