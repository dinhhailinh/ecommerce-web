const upload = async (req, res) => {
    try {
        res.send(`/${req.file.path}`)
    } catch (error) {
        res.status(200).json(error)
    }
}

module.exports = {upload}