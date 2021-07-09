function extractAttrData(json, attrName) {


    let attrList = [];
    if (json && json.length > 0) {
        json.forEach((d) => {
            attrList.push(d[attrName]);
        });
    }

    return attrList;
}

export {
    extractAttrData,
};