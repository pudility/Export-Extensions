var _babylon = require("babylon");

var babylon = _interopRequireWildcard(_babylon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = function(babel) {
  const t = babel.types;
  let name = void 0;
  let hasRunThroughtExportDefaultDeclaration = false;

  return {
    visitor: {
      ExportDefaultDeclaration: function(path){
        let ref = path.scope.generateUidIdentifier(name);

        const newPath = t.variableDeclaration("let", [
                          t.variableDeclarator(ref, path.node.declaration)
                        ])
        const EdportDefult = babylon.parse(`export default ${ref.name}`, {
          allowImportExportEverywhere: true
        });

        if (!hasRunThroughtExportDefaultDeclaration) {
          hasRunThroughtExportDefaultDeclaration = true;

          path.replaceWithMultiple([
            newPath,
            EdportDefult
          ])
        }
      },
      Identifier(path) {
        name = path.node.name;
       },
    }
  };
};