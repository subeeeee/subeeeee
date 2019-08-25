#!/bin/bash
ENV=$1
cp config/index.${ENV}.js config/index.js
cp config/prod.env.${ENV}.js config/prod.env.js
cp src/api/index.${ENV}.js src/api/index.js
cp src/utils/request.${ENV}.js src/utils/request.js
