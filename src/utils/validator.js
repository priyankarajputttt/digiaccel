//  Function to check if any data field is missing or empty
const isEmpty = function (value) {
    if (typeof (value) === 'undefined' || typeof (value) === 'null') return false
    else if (typeof (value) === 'string' && value.trim().length > 0) return true
    else if (typeof (value) === 'number' ) return true
}


// function to validate valid indian Number
const isValidmobile = function (phone) {
    if (/^\+?([6-9]{1})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/.test(phone)) return true
}

// function to validate valid emailId
const isValidemailId = function (email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true
}

// function to validate objectId
const isValidID = function(id) {
    if (/^[0-9a-fA-F]{24}$/.test(id)) return true
}

// function to check right option
const isRightOptions = function (rightOption, availableOptions) {
    for (let x of rightOption) {
        if (availableOptions.includes(x) == false)  return false
    }
    return true;
}

// function to remove duplicate option 
const filterDuplcates = function (options) {
    let map = {}
    for(let i=0; i<options.length; i++){
        if(!map[options[i]]) map[options[i]] = 1
    }
    return Object.keys(map);
}

// function to check selected option
const checkAnswer = function (selectedOptions , rightOptions) {
    if(selectedOptions.length != rightOptions.length) return false
    for (let x of rightOptions) {
        if (selectedOptions.includes(x) == false)  return false
    }
    for (let x of selectedOptions) {
        if (rightOptions.includes(x) == false)  return false
    }
    return true
}


module.exports.isEmpty = isEmpty
module.exports.isValidemailId= isValidemailId
module.exports.isValidmobile = isValidmobile
module.exports.isValidID = isValidID
module.exports.isRightOptions = isRightOptions
module.exports.filterDuplcates = filterDuplcates
module.exports.checkAnswer = checkAnswer