let api = "http://localhost:6067"; 
//"http://localhost:6067";

let seetmDocsHost = "https://seetm-nlp.github.io";

export const configs = {
  api: api,
  seetmConfigEndpoint: `${api}/api/seetm/configs`,
  seetmMapsEndpoint: `${api}/api/seetm/maps`,

  seetmDocsHost: `${seetmDocsHost}`,
  seetmDocsDocs: `${seetmDocsHost}/docs`,
  seetmDocsMatrix: `${seetmDocsHost}/compatibility-matrix`,
  seetmDocsTokenizer: `${seetmDocsHost}/custom-tokenizer`,
  seetmConfigs: `${seetmDocsHost}/seetm-configs`,
  seetmVersion: `1.0.0`,
  seetmGitHub: `https://www.github.com/seetm-nlp`,

  snackbarVerticalPosition: "bottom",
  snackbarHorizontalPostion: "left",
};

export const localStorageKeys = {
  seetmSelectedLang: "seetmSelectedLang"
}

export const ascii_logo = `
█▀ █▀▀ █▀▀ ▀█▀ █▀▄▀█
▄█ ██▄ ██▄  █  █ ▀ █
`;


// https://dev.to/rajeshroyal/reactjs-disable-consolelog-in-production-and-staging-3l38
export const GlobalDebug = (function () {
  var savedConsole = console;
  /**
  * @param {boolean} debugOn
  * @param {boolean} suppressAll
  */
  return function (debugOn, suppressAll) {
    var suppress = suppressAll || false;
    if (debugOn === false) {
      // supress the default console functionality
      // eslint-disable-next-line
      console = {};
      console.log = function () { };
      // supress all type of consoles
      if (suppress) {
        console.info = function () { };
        console.warn = function () { };
        console.error = function () { };
      } else {
        console.info = savedConsole.info;
        console.warn = savedConsole.warn;
        console.error = savedConsole.error;
      }
    } else {
      // eslint-disable-next-line
      console = savedConsole;
    }
  };
})();
