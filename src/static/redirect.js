import getLocation from "./getLocation";
import getDocument from "./getDocument";


const redirect = function (to) {
    const loc = getLocation();
    const doc = getDocument();
    loc.href = to || doc.href;
};

export default redirect;
