
const getLocation = function () {
    if (location)
        return location;
    else
        throw new Error('location object not exist!');
};

export default getLocation;
