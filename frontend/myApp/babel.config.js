module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    sourceMaps: 'inline' // ou 'none' para desativar completamente
  };
};