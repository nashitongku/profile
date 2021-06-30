@echo off
echo "push代码"

git add *

set /p  var="输入commit log:"

git commit -m "%var%"
echo "git commit -m "%var%""

git push
echo "git push"

pause