function extractAttrData(json, attrName) {


    let attrList = [];
    if (json) {
        json.forEach((d) => {
            attrList.push(d[attrName]);
        });
    }

    return attrList;
}

export {
    extractAttrData,
};