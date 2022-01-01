function total(a, b, cari) {
    return cari(a, b);
}

function tambah(x, y) {
    return x + y;
}

console.log(total(5, 10, tambah))