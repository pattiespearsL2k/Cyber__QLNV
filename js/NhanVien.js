function NhanVien(acc, name, email, pass, date, wage, job, hour) {
    this.acc = acc;
    this.name = name;
    this.email = email;
    this.pass = pass;
    this.date = date;
    this.wage = wage;
    this.job = job;
    this.hour = hour;
    this.rank = "";
    this.wageTotal = 0;
    this.calRank = function () {
        if (this.hour >= 192) this.rank = "Xuất sắc";
        else if (this.hour >= 176 && this.hour < 192) this.rank = "Giỏi";
        else if (this.hour >= 160 && this.hour < 176) this.rank = "Khá";
        else this.rank = "Trung bình";
    }
    this.calWageTotal = function () {
        switch (this.job) {
            case "Sếp": this.wageTotal = this.wage * 3; break;
            case "Trưởng phòng": this.wageTotal = this.wage * 2; break;
            case "Nhân viên": this.wageTotal = this.wage; break;
            default: ;

        }
    }
}