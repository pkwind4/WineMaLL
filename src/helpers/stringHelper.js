String.prototype.toFirstCharLower = function(){
    if(this == null){
        return this;
    }
    return this.replace(/(\w)/,function(o){
        return o.toLowerCase();
    });
}