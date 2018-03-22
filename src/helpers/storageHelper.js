const storageHelper = {
    setItem:function(key,data){
        if(localStorage){
            if(typeof data === "Object")
            {
                localStorage.setItem(key,JSON.stringify(data));
            }else{
                localStorage.setItem(key,data);
            }
        }
    },
    getItem:function(key){
        if(localStorage){
            return localStorage.getItem(key);
        }
    }
};
export default storageHelper;