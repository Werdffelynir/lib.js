import typeOf from "../static/typeOf";
import str2node from "../static/str2node";
import node2str from "../static/node2str";
import each from "../static/each";


const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

function Str (string) {
    const $ = {
        string: typeOf(string, 'string') ? string : '',
        length: string.length,
    };

    $.capitalize = () => capitalize($.string);
    $.upper = () => $.string.toUpperCase();
    $.lower = () => $.string.toLowerCase();
    $.padEnd = (value) => $.string.padEnd(value);
    $.padStart = (value) => $.string.padStart(value);
    $.each = (callback) => callback ? $.string.split('').forEach(callback) : $.string.split('');

    return $;
}

Str.capitalize = capitalize;
Str.node2str = node2str;
Str.str2node = str2node;
Str.each = each;

export default Str;
