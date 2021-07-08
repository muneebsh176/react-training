function getAttributesList(json, attrName) {

    let attrList = [];
    json.forEach((d) => {
        attrList.push(d[attrName]);
    });

    return attrList;
}

export {
    getAttributesList,
};