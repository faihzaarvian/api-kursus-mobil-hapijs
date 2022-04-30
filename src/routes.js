const {
  addNewStudent, allStudentList, getStudentById, editStudentProfile, deleteStudent,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/daftar',
    handler: addNewStudent,
  },
  {
    method: 'GET',
    path: '/listpeserta',
    handler: allStudentList,
  },
  {
    method: 'GET',
    path: '/profil/{studentId}',
    handler: getStudentById,
  },
  {
    method: 'PUT',
    path: '/profil/{studentId}',
    handler: editStudentProfile,
  },
  {
    method: 'DELETE',
    path: '/profil/{studentId}',
    handler: deleteStudent,
  },
];

module.exports = routes;
