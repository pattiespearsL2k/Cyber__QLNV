// Global
var listnv = new DanhSachNhanVien();
var validation = new Validation();
getLocalStorage();

function getELE(id) {
    return document.getElementById(id);
}

function addNV() {
    var acc = getELE("tknv").value;
    var name = getELE("name").value;
    var email = getELE("email").value;
    var pass = getELE("password").value;
    var date = getELE("datepicker").value;
    var wage = getELE("luongCB").value;
    var job = getELE("chucvu").value;
    var hour = getELE("gioLam").value;

    var isValid = true;
    // Tài khoản
    isValid &= validation.checkEmpty(acc, "tbTKNV", "Tài khoản không được để trống!")
        && validation.checkID(acc, "tbTKNV", "Tài khoản đã tồn tại. Vui lòng nhập tài khoản khác!", listnv.Array)

    //Tên nhân viên
    isValid &= validation.checkEmpty(name, "tbTen", "Tên nhân viên không được để trống!")
        && validation.checkName(name, "tbTen", "Tên nhân viên phải đúng định dạng!")

    // Email
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống!")
        && validation.checkEmail(email, "tbEmail", "Email phải đúng định dạng!")

    // Mật khẩu
    isValid &= validation.checkEmpty(pass, "tbMatKhau", "Mật khẩu không được để trống!")
        && validation.checkPass(pass, "tbMatKhau", "Mật khẩu phải từ 6 đến 10 kí tự, chứa ít nhất 1 số, 1 chữ in hoa, 1 kí tự đặc biệt!")

    // Ngày làm
    isValid &= validation.checkEmpty(date, "tbNgay", "Ngày làm không được để trống!")
        && validation.checkDate(date, "tbNgay", "Ngày làm không đúng định dạng!")

    // Lương cơ bản
    isValid &= validation.checkEmpty(wage, "tbLuongCB", "Lương cơ bản không được để trống!")
        && validation.checkWage(wage, "tbLuongCB", "Lương cơ bản phải từ 1000000VNĐ đến 20000000VNĐ")

    // Số giờ làm
    isValid &= validation.checkEmpty(hour, "tbGiolam", "Số giờ làm không được để trống!")
        && validation.checkHour(hour, "tbGiolam", "Số giờ làm mỗi tháng phải từ 80 đến 200 giờ")

    // Chức vụ
    isValid &= validation.checkSelect("chucvu", "tbChucVu", "Bạn phải chọn chức vụ!")

    if (isValid) {
        var nv = new NhanVien(acc, name, email, pass, date, wage, job, hour);
        nv.calRank();
        nv.calWageTotal();
        listnv.add(nv);
        showTable(listnv.Array);
        setLocalStorage(listnv.Array);
    }
}

function showTable(array) {
    var content = "";
    array.map(function (nv, index) {
        var tr = `<tr>
        <td>${nv.acc}</td>
        <td>${nv.name}</td>
        <td>${nv.email}</td>
        <td>${nv.date}</td>
        <td>${nv.job}</td>
        <td>${nv.wageTotal}</td>
        <td>${nv.rank}</td>
        <td>
        <button onclick="delNV('${nv.acc}')">Xóa</button>         
        </td>
        <td>
        <button data-toggle="modal" data-target="#myModal" onclick="ShowNV('${nv.acc}')">Sửa</button>  
        </td>
  
    </tr>`;
        content += tr;
    });
    getELE("tableDanhSach").innerHTML = content;
}

function setLocalStorage(array) {
    localStorage.setItem("ListNV", JSON.stringify(array));
}

function getLocalStorage() {
    if (localStorage.getItem("ListNV") != null) {
        listnv.Array = JSON.parse(localStorage.getItem("ListNV"));
        showTable(listnv.Array)
    }
}

function delNV(id) {
    listnv.delete(id);
    setLocalStorage(listnv.Array)
    showTable(listnv.Array);
}

function ShowNV(id) {
    console.log(id);
    var viTri = listnv.findViTri(id);
    if (viTri != -1) {
        console.log(listnv.Array[viTri]);
        var nv = listnv.Array[viTri];
        getELE("tknv").value = nv.acc;
        getELE("tknv").disabled = true;
        getELE("name").value = nv.name;
        getELE("email").value = nv.email;
        getELE("password").value = nv.pass;
        getELE("datepicker").value = nv.date;
        getELE("luongCB").value = nv.wage;
        getELE("chucvu").value = nv.job;
        getELE("gioLam").value = nv.hour;
    }

}

function updateNV() {
    var acc = getELE("tknv").value;
    var name = getELE("name").value;
    var email = getELE("email").value;
    var pass = getELE("password").value;
    var date = getELE("datepicker").value;
    var wage = getELE("luongCB").value;
    var job = getELE("chucvu").value;
    var hour = getELE("gioLam").value;
    var isValid = true;


    //Tên nhân viên
    isValid &= validation.checkEmpty(name, "tbTen", "Tên nhân viên không được để trống!")
        && validation.checkName(name, "tbTen", "Tên nhân viên phải đúng định dạng!")

    // Email
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống!")
        && validation.checkEmail(email, "tbEmail", "Email phải đúng định dạng!")

    // Mật khẩu
    isValid &= validation.checkEmpty(pass, "tbMatKhau", "Mật khẩu không được để trống!")
        && validation.checkPass(pass, "tbMatKhau", "Mật khẩu phải từ 6 đến 10 kí tự, chứa ít nhất 1 số, 1 chữ in hoa, 1 kí tự đặc biệt!")

    // Ngày làm
    isValid &= validation.checkEmpty(date, "tbNgay", "Ngày làm không được để trống!")

    // Lương cơ bản
    isValid &= validation.checkEmpty(wage, "tbLuongCB", "Lương cơ bản không được để trống!")
        && validation.checkWage(wage, "tbLuongCB", "Lương cơ bản phải từ 1000000VNĐ đến 20000000VNĐ")

    // Số giờ làm
    isValid &= validation.checkEmpty(hour, "tbGiolam", "Số giờ làm không được để trống!")
        && validation.checkHour(hour, "tbGiolam", "Số giờ làm mỗi tháng phải từ 80 đến 200 giờ")

    // Chức vụ
    isValid &= validation.checkSelect("chucvu", "tbChucVu", "Bạn phải chọn chức vụ!")



    if (isValid) {
        var nv = new NhanVien(acc, name, email, pass, date, wage, job, hour);
        nv.calRank();
        nv.calWageTotal();
        listnv.update(nv);
        setLocalStorage(listnv.Array)
        showTable(listnv.Array);
    }
}

function searchNV() {
    var keyword = getELE("searchName").value;
    console.log(keyword);
    var mangTK = [];
    mangTK = listnv.search(keyword);
    console.log(mangTK);
    showTable(mangTK);
}