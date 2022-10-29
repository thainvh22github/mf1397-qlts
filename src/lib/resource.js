
/**
 * Hàm dùng toàn chương trình
 * Author: NVHThai (14/09/2022)
 */
export default {
    FormMode: {
        Require: "require",
        Email: "email",
        MaxLegth: "maxLength",
    },
    FormModeTitle: {
        Add:"Thêm tài sản",
        Edit:"Sửa tài sản",
        Duplicate:"Nhân bản tài sản"
    },
    State:{
        Zoom:"Phóng to",
        UnZoom:"Thu nhỏ"
    },
    TitleToast:{
        Delete: 'Xóa',
        Close:"Đóng",
        Save: 'Lưu',
        No:"Không",
        NotSave:"Không lưu",
        Detroy:"Hủy bỏ",
        Duplicate:'Nhân bản',
        DeleteException:"Vui lòng chọn tài sản cần xóa",
        titleFormDelete:"Bạn có muốn xóa tài sản",
        titleFormDeleteLicense:"Bạn có muốn xóa chứng từ có mã",
        titleFormDeletes:"tài sản đã được chọn. Bạn có muốn xóa các tài sản khỏi danh sách này không?",
        TitleFormValidate: "Dữ liệu đầu vào không hợp lệ",
        TitleFormAdd: "Bạn có muốn hủy bỏ khai báo tài sản này?",
        TitleFormEdit: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?",
        TitleFormDone:"Lưu dữ liệu thành công",
        TitleExceptionLicense:"Chọn ít nhất 1 tài sản"
    },

    TitleException:{
        BADREQUEST: "Server xử lý request gặp lỗi", 
        UNAUTHORIZED: "Hệ thống MISA chưa được ủy quyền",
        FORBIDDEN: "Người dùng không có quyền truy cập tài nguyên này",
        NOTFOUND:"Server không tìm thấy bất kì tài nguyên nào", 
        NTERNALSERVERERROR:"Có lỗi xảy ra phía máy chủ. Vui lòng liên hệ MISA!", 
    },

    Url:{
        Department:"https://localhost:44380/api/v1/Department/FillterCodeOrName",
        CategoryAsset:"https://localhost:44380/api/v1/AssetCategory/FillterCodeOrName",
        Asset:"https://localhost:44380/api/v1/Assets",
        NewCode:"https://localhost:44380/api/v1/Assets/new-code",
        Deletes:"https://localhost:44380/api/v1/Assets/batch-delete"
    },
    ItemName:{
        ItemNameDepartment: 'department_name',
        ItemNameCategoryAsset:'fixed_asset_category_name',
    },
    ItemCode:{
        ItemCodeDepartment: 'department_code',
        ItemCodeCategoryAsset:'fixed_asset_category_code',
    },
    ItemID:{
        ItemIDDepartment: 'department_id',
        ItemIDCategoryAsset:'fixed_asset_category_id',
    },

    MessageValidate:{
        AssetCode:"Mã tài sản không được phép để trống",
        AssetName:"Tên tài sản không được phép để trống",
        DepartmentCode:"Mã bộ phận sử dụng không được phép để trống",
        AssetCategoryCode:"Mã loại tài sản không được phép để trống",
        Quanlity:"Số lượng tài sản không được phép để trống",
        Cost:"Nguyên giá không được phép để trống",
        DepreciationRate:"Tỷ lệ hao mòn không được phép để trống",
        LifeTime:"Số năm sử dụng không được phép để trống",
        LossYear:"Giá trị hao mòn không được phép để trống",
        AssetCodeDuplicate:"Mã tài sản đã tồn tại",
        DepreciationRateError:"Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng",
        ValidateLossYear:"Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá",
    },
    
    TextVi:{
        List:{
            BtnAdd:"Thêm tài sản",
            STT:"STT",
            AssetCode: "Mã tài sản",
            AssetName: "Tên tài sản",
            AssetCategoryName: "Loại tài sản",
            AssetDepartmentName: "Bộ phận sử dụng",
            Quanlity: "Số lượng",
            Cost: "Nguyên giá",
            LossCost:"HM/KH lũy kế",
            Remaining:"Giá trị còn lại",
            Tool:"Chức năng",
            Emply:"Không có dữ liệu",
            Total:"Tổng số",
            Record:"bản ghi"
        },
        Detail:{
            AssetCode: "Mã tài sản",
            AssetName: "Tên tài sản",
            AssetDepartmentCode: "Mã bộ phận sử dụng",
            AssetDepartmentName: "Tên bộ phận sử dụng",
            AssetCategoryCode: "Mã loại tài sản",
            AssetCategoryName: "Tên loại tài sản",
            Quanlity: "Số lượng",
            Cost: "Nguyên giá",
            DepreciationRate: "Tỷ lệ hao mòn (%)",
            BuyingDate: "Ngày mua",
            UsingDate: "Ngày bắt đầu sử dụng",
            TrackedYear: "Năm theo dõi",
            LifeTime: "Số năm sử dụng",
            LossYear: "Giá trị hao mòn năm",
        },
        Tooltip:{
            Close: "Đóng",
            InputSearch:"Tìm kiếm theo mã tài sản, tên tài sản (Ctrl F3)",
            BtnAdd:"Ấn Insert để thêm tài sản",
            BtnToolbarExport:"Xuất khẩu",
            BtnToolbarDelete:"Xóa",
            CheckBoxAll:"Chọn tất cả",
            STT:"Số thứ tự",
            LossCost:"Hao mòn/ Khấu hao lũy kế",
            Edit:"Sửa",
            Duplicate:"Nhân bản",
            Prev:"Trang trước",
            Next:"Trang sau"
        },
        PlaceHolder:{
            DepartmentCode:"Chọn mã bộ phận sử dụng",
            AssetCategoryCode:"Chọn mã loại tài sản",
            AssetName:"Nhập tên tài sản",
            InputSearch:"Tìm kiếm tài sản",
            ComboboxDepartment:"Bộ phận sử dụng",
            ComboboxAssetCategory:"Loại tài sản",
        },
        Button:{
            Close: "Hủy",
            Save: "Lưu"
        },
        Loading:"Đang tải dữ liệu",
        Format:{
            FormatDate:"DD/MM/YYYY",
            ValueFormatDate:"YYYY-MM-DD"
        }
    }
    
}