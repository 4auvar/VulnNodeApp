
function custom_sanitizer_regex(user_input) {
    /*
     * The regex searches for < followed by one or more alphanumeric character,
     * followed by one or more non-alphanumeric characters, and then single
     * alphanumeric character.
     * bypass: <<img|hscript>alert(1)</script>
     */

    let p = "<(\\w+)\\W+[\\w]";
    return user_input.replace(new RegExp(p),"")    
}

function isFromBlackList(user_input) {
    
    blackList = [/href/, /<img/, /<script>/, /<\/script>/, /onload/, /<div/, /<meta/, /<a/,
        /onclick/, /<svg/, /<embed/, /<body/, /<article/, /<audio/, /<canvas/, /<iframe/, /<link/, /<object/,
        /<style/, /<span/, /<input/, /<table/, /<tr/, /<td/, /<title/, /<video/]

    let flag = 0;

    for (let i = 0; i < blackList.length; i++) {
        let pattern = blackList[i];

        if (pattern.test(user_input)) {
            flag = 1;
            break;
        }
    }
    if (flag == 1)
        return true;
    else
        return false;
}

module.exports = {
    custom_sanitizer_regex: custom_sanitizer_regex,
    isFromBlackList: isFromBlackList
};