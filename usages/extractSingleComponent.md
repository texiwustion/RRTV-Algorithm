# extractSingleComponent 用例

## input

```jsx
const TestSim = () => {
    return <>
        <hello>
            <button id="1" me="2"></button>
            <button you="3" type="4"></button>
        </hello>
        <div>
            <button id="1" me="2"></button>
            <button you="3" type="4"></button>
        </div>
        <p></p>
    </> 
    }
    const TestSim2 = () => {
    return <>
        <code></code>
        <div>
            <button id="1" me="2"></button>
            <button you="3" type="4"></button>
        </div>
        <hello>
            <button id="1" me="2"></button>
            <button you="3" type="4"></button>
        </hello>
    </> 
    }
```

## range and text

### single jsxElement

```ts
const range_54_133 = {
    "start": 54,
    "end": 133
}
const text_54_133 = `function NewFunction() {
    return <button id='1' me='2'></button>;
}

const TestSim = () => {
    return (
        <>
            <hello>
                <NewFunction />
                <button you='3' type='4'></button>
            </hello>
            <div>
                <button id='1' me='2'></button>
                <button you='3' type='4'></button>
            </div>
            <p></p>
        </>
    );
};
const TestSim2 = () => {
    return (
        <>
            <code></code>
            <div>
                <button id='1' me='2'></button>
                <button you='3' type='4'></button>
            </div>
            <hello>
                <button id='1' me='2'></button>
                <button you='3' type='4'></button>
            </hello>
        </>
    );
};
`
```

### siblings

```ts
const range_54_153 = {
    "start": 54,
    "end": 153
}
const text_54_153 = `function NewFunction() {
    return (
        <>
            <button id='1' me='2'></button>
            <button you='3' type='4'></button>
        </>
    );
}

const TestSim = () => {
    return (
        <>
            <hello>
                <NewFunction />
            </hello>
            <div>
                <button id='1' me='2'></button>
                <button you='3' type='4'></button>
            </div>
            <p></p>
        </>
    );
};
const TestSim2 = () => {
    return (
        <>
            <code></code>
            <div>
                <button id='1' me='2'></button>
                <button you='3' type='4'></button>
            </div>
            <hello>
                <button id='1' me='2'></button>
                <button you='3' type='4'></button>
            </hello>
        </>
    );
};
`
```