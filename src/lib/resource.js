
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
        Save: 'Lưu',
        Duplicate:'Nhân bản',
        DeleteException:"Vui lòng chọn tài sản cần xóa",
        titleFormDelete:"Bạn có muốn xóa tài sản",
        titleFormDeletes:"tài sản đã được chọn. Bạn có muốn xóa các tài sản khỏi danh sách này không?",
        TitleFormValidate: "Dữ liệu đầu vào không hợp lệ",
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
        ValidateLossYear:"Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá"
    },
    
    
}