# RRTV-Algorithm
Try to make stable Algorithm for react-refactor-tool for VsCode

# WorkFlow

## GitFlow

- main with tags
- hotfix
- realease 
- dev
- feat

- dev -> feat
- dev -> release
- realease -> main
- main -> hotfix

if hotfix or feat, merge into main or dev, release

```bash
git checkout [branch_name]
git checkout -b [new_branch_name]
git merge [branch_name] " merge branch into HEAD branch "
git tag -a 1.0
```

## Target

### v1.0 

1. 组件提取：框选一定范围的代码，识别出最大可能范围的组件并提取为新**函数式组件**

