function NewFunction() {
    return <button id="1" me="2"></button>;
}

const TestSim = () => {
    return <>
        <hello>
          		<NewFunction />
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
}