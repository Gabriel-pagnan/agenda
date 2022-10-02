const { async } = require('regenerator-runtime');
const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    const contatos = await Contato.buscaConstatos();
    res.render('index', {contatos});
    return;
};
  