(function (window) {
    window.__env = window.__env || {};
  
    // API url
    window.__env.AUTH_URL = 'https://dev-dbfunts.eu.auth0.com/oauth/token';
    window.__env.CLIENT_ID = 'SpaW2JroMTSsz926PD0Be1lBA8f7nbT9';
    window.__env.CLIENT_SECRET = 'wUjU3T-EZ0hb7JoOuHijZ78XcDTrvVXK1zrFwasp4zygVfcSqbTRA37MlHji_j-e';
    window.__env.AUTH_AUDIENCE = 'https://dbfun-api.example.com';

    window.__env.BASE_URL = 'http://localhost:7000/api/v1';
  
    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;

}(this));