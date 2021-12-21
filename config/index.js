var configValue = require('./config.json')

module.exports = {
    getDBConnectionString : function(){
        return 'mongodb+srv://'+configValue.uname+':'+configValue.password+'@cluster0.hktm7.mongodb.net/nodePractice'
    }
}