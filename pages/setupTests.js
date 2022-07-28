import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import enableHooks from 'jest-react-hooks-shallow';
const { toHaveCompiledCss } = require('@compiled/jest');
const path = require('path');

module.exports = {
  process(sourceText, sourcePath, options) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};
expect.extend({
  toHaveCompiledCss,
});
// pass an instance of jest to `enableHooks()`
enableHooks(jest);

configure({ adapter: new Adapter() });