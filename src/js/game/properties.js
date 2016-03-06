var npmProperties = require('../../../package.json');

module.exports =
  { title: 'Argentum Online JS'
  , description: npmProperties.description
  , port: 3017
  , liveReloadPort: 3018
  , mute: false
  , showStats: true
  , size:
    { x: 800
    , y: 600
    }
  , analyticsId: 'UA-50892214-2'
  };
