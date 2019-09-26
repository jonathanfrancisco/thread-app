const multer = require('multer')
const fileType = require('file-type')

const storage = multer.memoryStorage()

module.exports = (req, res, next) => {
  multer({ storage }).single('image')(req, res, err => {
    if (err) {
      return next(err)
    }
    if (!req.file) {
      next()
    } else {
      const fileInfo = fileType(req.file.buffer)
      if (!fileInfo) {
        req.flash('errors', 'Invalid File')
        return res.redirect('back')
      }
      const isImage =
        (fileInfo.ext === 'jpg' && fileInfo.mime === 'image/jpeg') ||
        (fileInfo.ext === 'png' && fileInfo.mime === 'image/png')
      if (isImage) {
        next()
      } else {
        req.flash('errors', 'Only images are allowed!')
        res.redirect('back')
      }
    }
  })
}
