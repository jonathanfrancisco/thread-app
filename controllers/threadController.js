const threadController = {}

threadController.threads = (req, res) => {
  res.send('all threads')
}

threadController.create = (req, res) => {}

module.exports = threadController
