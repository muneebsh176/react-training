function extractAttrData (json, attrName) {
  const attrList = []
  if (json && json.length > 0) {
    json.forEach((d) => {
      attrList.push(d[attrName])
    })
  }

  return attrList
}

export { extractAttrData }
