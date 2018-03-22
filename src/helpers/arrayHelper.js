Array.prototype.countBy = function(key){
    var count = [];
    this.map((item)=>{
        if(key){
            if(item[key] in count){
                count[item[key]]++;
            }else{
                count[item[key]] = 1;
            }
        }else{
            if(item in count){
                count[item]++;
            }else{
                count[item] = 1;
            }
        }
    });
    return count;
}
Array.prototype.havingBy = function(count,key){
    var countBy = this.countBy(key);
    var having = [];
    var keys = Object.keys(countBy);
    keys.forEach((prop,value)=>{
        if(countBy[prop]>=count){
            having[prop] = countBy[prop];
        }
    });
    return having;
}

Array.prototype.firstOrDefault = function(key,value){
    var reult = null;
    this.some((item)=>{
        if(item[key] === value){
            result = item;
            return true;
        }
    });
    return result;
}

Array.prototype.sum = function(key){
    var result = 0;
    this.forEach((item)=>{
        result += item[key];
    });
    return result;
}