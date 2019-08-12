'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: () => {
  	var origin = location.href.split('reportpages')[0];
		return origin;
  },
}
