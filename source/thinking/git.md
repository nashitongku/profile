git update-index --assume-unchanged /path/to/file #忽略跟踪

git update-index --no-assume-unchanged /path/to/file #恢复跟踪



git reset --hard HEAD^ 拉取服务器最近一次提交到暂存





回退版本

git reset --hard HEAD^ 	

git push -f origin master





 git reset HEAD^: 不删除工作空间改动代码，撤销commit，并且撤销git add . 

## --soft :不删除工作空间改动代码，撤销commit，不撤销git add . 

## --hard: 删除工作空间改动代码，撤销commit，撤销git add . 

注意完成这个操作后，就恢复到了上一次的commit状态。

git commit --amend:如果commit注释写错了，只是想改一下注释