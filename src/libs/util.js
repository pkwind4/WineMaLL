let util = {

};
util.title = function (title) {
    title = title ? title + ' -华润广东医药协同系统' : '华润广东医药协同系统';
    window.document.title = title;
};

export default util;