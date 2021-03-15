const csvtojson = require('csvtojson'); 

const { successResponse } = require('../utils/responseHelper');
const { createUser } = require('../services/userService');
const { uploadFile} = require('../utils/fileHelper');
const { publishNewsletterQueue } = require('../utils/mqHelper');

const createAUser = async (req, res) => {
    const { body } = req;
    const data = await createUser(body);
    res.send(successResponse('User Created Successfully', data));
};

const sendNewsLetter = async(req, res) => {
    await uploadFile(req, res)

    let newsletter;

    const data = await csvtojson({
      noheader: true,
      output: 'json',
      delimiter: ','
    }).
    fromString(req.file.buffer.toString())

    data.forEach(row => {
      const elements = row['field1'].split(';')
      newsletter = {
        email: elements[0],
        nw_content: elements[1],
        nw_name:elements[2]
      }
      publishNewsletterQueue(JSON.stringify(newsletter))

    });


    return res.status(204).send()
};

module.exports = {
    createAUser,
    sendNewsLetter,
}