const Biodata = (nama, umur) => {
  return `Halo nama saya ${nama} dan saya berumur ${umur}`;
};

module.exports = { Biodata };

db.daftar.insertMany([
  {
    _id: 1,
    user_id:"Sadam",
    title: "Membuat website",
    description: "Tugas membuat website e-commerce untuk menampilkan barang dari perusahaan maniku",
    date: new Date("2025-02-11")
  },
  {
    _id: 2,
    user_id:"Sadam",
    title: "Belajar react.js",
    description: "Belajar react.js untuk menambah skill dan kemampuan dalam membangun aplikasi",
    date: new Date("2025-01-20")
  },
]);


db.daftar.deleteMany({})
