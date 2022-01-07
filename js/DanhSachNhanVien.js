function DanhSachNhanVien() {
    this.Array = [];
    this.add = function (nv) {
        this.Array.push(nv);
    }
    this.findViTri = function (id) {
        var viTri = -1;
        this.Array.map(function (nv, index) {
            if (nv.acc === id) {
                viTri = index;
            }
        })
        return viTri;
    }
    this.delete = function (id) {
        var viTri = this.findViTri(id);
        if (viTri != -1) {
            this.Array.splice(viTri, 1);
        }
        else return;
    }
    this.update = function (nv) {
        var viTri = this.findViTri(nv.acc);
        if (viTri != -1) {
            this.Array[viTri] = nv;
        }
    }
    this.search = function (keyword) {
        var mangTK = [];
        // var keywordLower = keyword.toLowerCase();
        this.Array.map(function (nv) {
            //  var nameLower = nv.rank.toLowerCase();
            // var indexName = nv.rank.indexOf(keywordLower);
            // if (indexName > -1) {
            //     mangTK.push(nv);
            // }
            if (nv.rank == keyword) {
                mangTK.push(nv);
            }

        });
        return mangTK;

    }
}