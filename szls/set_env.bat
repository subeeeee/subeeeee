@ECHO OFF
IF "%1%"=="" GOTO NOPARAM
SET ENV=%1
copy config\index.%ENV%.js config\index.js
copy config\prod.env.%ENV%.js config\prod.env.js
copy src\api\index.%ENV%.js src\api\index.js
copy src\utils\request.%ENV%.js src\utils\request.js
GOTO END

:NOPARAM
ECHO Please input parameter 'build' or 'dev'

:END
