const multer = require('multer');

const checkMimeType = mimeType => {
  // mimeType is usually of the structure image/jpg, or application/pdf
  if (!mimeType || mimeType.length === 0) {
    return false
  }
  // Split the string w.r.t / and obtain the last item in the array
  const mimeDataArray = mimeType.split('/')
  const type = mimeDataArray[mimeDataArray.length - 1]

  return type === 'csv'
}

const uploadFile = async (req, res) => {
  // Initialize multer object
  let upload = multer({
    fileFilter: function (_, file, callback) {
      if (!checkMimeType(file.mimetype)) {
        return callback(new Error('DOCUMENT_TYPE_NOT_SUPPORTED'))
      }
      callback(null, true)
    },
    limits: {
      // fileSize - integer - For multipart forms, the max file size (in bytes)
      fileSize: 1024 * 1024 * 10,
      // files - integer - For multipart forms, the max number of file fields
      files: 1,
      // fields - integer - Max number of non-file fields
      fields: 5
    }
  }).single('file')
  return new Promise((resolve, reject) => {
    upload(req, res, function (err) {
      if (err) {
        return reject(err)
      } else {
        if (!req.file) {
          return res
            .status(409)
            .message('File for uploading is required')
            .error(true)
        }
      }

      return resolve(req.file)
    })
  })
}

module.exports = {
    uploadFile,
}
