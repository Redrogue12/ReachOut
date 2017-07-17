// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');
//
// const should = chai.should();
//
// const {app, runServer, closeServer} = require('../server');
//
// chai.use(chaiHttp);
//
// describe('ReachOut API resource', function() {
// 
//   before(function() {
//     return runServer();
//   });
//
//   after(function() {
//     return closeServer();
//   });
//
//   describe('GET public folder', function() {
//     it('should return index.html', function() {
//       let res;
//       return chai.request(app)
//       .get('/')
//       .then(function(_res) {
//         res = _res;
//         res.should.have.status(200);
//       })
//     });
//   });
// });
