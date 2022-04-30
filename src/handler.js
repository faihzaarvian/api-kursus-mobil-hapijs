/*
Project REST API sederhana - Kursus Mobil YSB (Yakin Segera Bisa) v.1
> Node.js dan Framework Hapi.js
> nanoid sebagai random ID generator
> Fitur : Pendaftaran siswa baru, menampilkan list semua para peserta kursus,
  menampilkan profil salah satu peserta, mengedit profil peserta, menghapus peserta
> Objek disimpan sementara di array, tidak menggunakan database service
> Data yang tersimpan : Id, nama, umur, alamat, kursus yang dipilih, mobil yang digunakan
  untuk kursus, instruktur pendamping, tanggal pendaftaran, dan kelulusan kursus
*/
const { nanoid } = require('nanoid');
const studentList = require('./studentslist');

//  register new course student handler
const addNewStudent = (request, h) => {
  const {
    name, age, address, course, car, instructor,
  } = request.payload; // get body request from client
  const studentId = nanoid(10); // 10 characters random id
  const registerDate = new Date().toISOString();
  const passCourse = false;
  const newStudent = {
    studentId, name, age, address, course, car, instructor, registerDate, passCourse,
  };
  if (!name) {
    const response = h.response({ // send respone in json format
      status: 'success',
      message: 'Nama belum dicantumkan',
    });
    response.code(400);
    return response;
  }
  studentList.push(newStudent); // add new object to StudentList array
  // checking if registration is success or not
  const isSuccess = studentList.filter((std) => std.studentId === studentId).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Peserta baru berhasil terdaftar',
      data: {
        idpeserta: studentId,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Registrasi peserta error',
  });
  response.code(500);
  return response;
};

const allStudentList = () => ({
  message: 'Daftar nama peserta Kursus Mengemudi YSB',
  data: {
    peserta: studentList.map((std) => ({
      id: std.studentId,
      nama: std.name,
      kursus: std.course,
      instruktur: std.instructor,
    })),
  },
});

const getStudentById = (request, h) => {
  const { studentId } = request.params;
  const studentProfile = studentList.filter((std) => std.studentId === studentId)[0];
  if (studentProfile !== undefined) {
    const response = h.response({
      profil: studentProfile,
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'ID peserta tidak diketahui',
  });
  response.code(500);
  return response;
};

const editStudentProfile = (request, h) => {
  const { studentId } = request.params;
  const {
    name, age, address, course, car, instructor,
  } = request.payload;
  const index = studentList.findIndex((std) => std.studentId === studentId);
  if (!name) {
    const response = h.response({ // send respone in json format
      status: 'success',
      message: 'Nama belum dicantumkan',
    });
    response.code(400);
    return response;
  }
  if (index !== -1) {
    studentList[index] = {
      ...studentList[index], name, age, address, course, car, instructor,
    };
    const response = h.response({
      status: 'Success',
      message: 'Profil peserta berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'ID peserta tidak diketahui',
  });
  response.code(404);
  return response;
};

const deleteStudent = (request, h) => {
  const { studentId } = request.params;
  const index = studentList.findIndex((std) => std.studentId === studentId);
  if (index !== -1) {
    studentList.splice(index, 1);
    const response = h.response({
      status: 'Success',
      message: 'Peserta berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'ID peserta tidak diketahui',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNewStudent, allStudentList, getStudentById, editStudentProfile, deleteStudent,
};
