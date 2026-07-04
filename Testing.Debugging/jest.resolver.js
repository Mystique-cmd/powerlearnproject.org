// jest.resolver.js
const coreModules = ["fs", "path", "crypto", "os", "util"];

module.exports = (request, options) => {
  // If the request is a Node core module, just return it directly
  if (coreModules.includes(request)) {
    return request;
  }

  // Otherwise, fall back to Jest's default resolver
  return options.defaultResolver(request, options);
};
