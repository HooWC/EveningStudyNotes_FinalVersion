```
// 创建新的 branch，然后自动更换这个

git checkout -b feature/new-branch  // 例如：
```

```
// 查看当前的 branch 是哪一个？

git branch
```

```
// 切换回 master

git checkout master
```

```
// 全部过程

git checkout -b my/b_4
git branch
git status
git add .
git commit -m "up"
git push -u origin my/b_4
```

```
// 我是分割线 ------------------
```

```
// 如果 Github master 更新了， 就更新你本地的项目
// 切换 master 先
git checkout master

// 获取 master 最新的状态
git pull origin master
```

```
// 创建新的 Branch, Upload, zuih
// 最终全部过程

git checkout -b my/b_4
git branch
git status
git add .
git commit -m "up"
git push -u origin my/b_4

// 在 Github 合拼 , 以下是获取最新 Master 的状态 ， 不需要用到 Master 就不需要运行

git checkout master
git pull --rebase
```

