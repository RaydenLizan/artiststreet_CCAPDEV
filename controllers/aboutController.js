
const searchController = {
	getAbout: function(req, res){
        res.render('about');
        
    },
    
    getAboutLoggedIn: function(req, res){
        var details = {};
        
        details.user = req.params.username;

        res.render('about', details);
        
    },

    
	
}

module.exports = searchController;

