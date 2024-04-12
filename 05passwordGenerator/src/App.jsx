import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNum) str += "0123456789";
    if(isChar) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      
    }

    setPassword(pass);

  }, [length, isNum, isChar, setPassword])  

  const copyPasswordToClipboard = useCallback(() => {
    setIsCopied(true);
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    setIsCopied(false);
    passwordGenerator()
  }, [length, isNum, isChar, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password...'
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className={`outline-none  ${isCopied? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"} text-white px-3 py-0.5 shrink-0`}
          >{isCopied ? "Copied!" : "Copy"}</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={isNum}
              id='numberInput'
              onChange={() => {
                setIsNum((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={isChar}
              id='characterInput'
              onChange={() => {
                setIsChar((prev) => !prev);
              }}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
