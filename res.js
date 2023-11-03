"use strict";

const { response } = require("express");

//RESPONSE MASTER DATA
exports.ok = function (values, res) {
  var data = {
    status: 200,
    values: values,
  };
  res.json(data);
  res.end();
};

//RESPONSE NESTED MK/DATA ARRAY DALAM ARRAY
exports.oknested = function (values, res) {
  //LAKUKAN AKUMULASI
  const hasil = values.reduce((akumulasikan, item) => {
    //TENTUKAN KEYGRUP
    if (akumulasikan[item.nama]) {
      //buat var grup nama mhs
      const group = akumulasikan[item.nama];
      //cek jika isi array adalah mk
      if (Array.isArray(group.mk)) {
        group.mk.push(item.mk);
      } else {
        group.mk = [group.mk, item.mk];
      }
    } else {
      akumulasikan[item.nama] = item;
    }
    return akumulasikan;
  }, {});

  var data = {
    status: 200,
    values: hasil,
  };

  res.json(data);
  res.end();
};
