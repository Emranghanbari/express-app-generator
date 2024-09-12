function isValidMongoDBAddress(address) {
  const mongoDBRegex =
    /^mongodb:\/\/([a-zA-Z0-9._%+-]+:[a-zA-Z0-9._%+-]+@)?([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/[a-zA-Z0-9._%+-]+)?$/;
  return mongoDBRegex.test(address);
}
function isValidProjectName(name) {
  const regex = /^[a-zA-Z0-9-_]+$/;
  return name.length > 0 && regex.test(name);
}
function isValidSecretKey(secret) {
  const secretRegex = /^(?=.*[!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?]).+$/;
  return secret.length >= 10 && secretRegex.test(secret);
}
function isValidPort(port) {
  const portNumber = parseInt(port, 10);
  return portNumber > 0 && portNumber <= 65535;
}

module.exports = {
  isValidMongoDBAddress,
  isValidPort,
  isValidProjectName,
  isValidSecretKey,
};
