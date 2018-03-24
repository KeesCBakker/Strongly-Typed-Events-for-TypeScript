module.exports = function(data){
    var w = window || {};
    w._e = w._e || {};

    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++){
        var name = keys[i];
        w[name] = w[name] || data[name];
        w._e[name] = data[name];
    }
}; 