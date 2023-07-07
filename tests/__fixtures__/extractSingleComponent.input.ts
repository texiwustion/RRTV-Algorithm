export const code = {
    success: `const TestSim = () => {
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

    function NewFunction({id, me, you, type}) {
    return <>
        <div>
            <button id={id} me={me}></button>
            <button you={you} type={type}></button>
        </div>
    </>
    }`,
}
export const range = {
    success: {
        start: 54,
        end: 99
    },
    failed: {
        start: 54,
        end: 56
    },
}

export const random_range = {
    start: 54,
    end: Math.floor(Math.random() * 199 + 54)
}