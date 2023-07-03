# 不完整 DOM

```jsx
const text = `=> <button> eiarsnt</button> 
<div>
    <p></p>
    <button> </button>
</div`
```

```bash
[astErrorHandler]Line24::: Error: 所选区域内无完整 DOM 元素！
undefined
```

# 兄弟 DOM

```jsx
const text = `=> <button> eiarsnt</button> 
    <p></p>
    <button> </button>`
```

```bash
<>
 <button> eiarsnt</button>
    <p></p>
    <button> </button>
</>
```