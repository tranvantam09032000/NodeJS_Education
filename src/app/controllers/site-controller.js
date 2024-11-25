class SiteController {
    home(req, res) {
        res.render('home');
    }

    search(req, res) {
        res.send("Search !")
    }
}

module.exports = new SiteController();