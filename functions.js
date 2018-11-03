module.exports.convertFromPacket = (arg) => {
    return JSON.parse(JSON.stringify(arg));
}