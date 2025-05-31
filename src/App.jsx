import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {

  const [amount, setAmount] =useState(0)
  const [from, setFrom]= useState("usd")
   const [to, setTo]= useState("inr")
   const [convertedAmount, setConvertedAmount]= useState(0)

   const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap =()=>{
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  const convert = ()=>{
  setConvertedAmount((amount* currencyInfo[to]).tofixed(2))
  }
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">

            <h1 className="text-3xl font-extrabold text-white text-center mb-4 drop-shadow-lg tracking-wide">
      Currency Converter
    </h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-400 rounded-md bg-white text-black hover:bg-gray-200 px-3 py-1 shadow-md transition-colors"
onClick={swap}

                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit"
  className="w-full bg-black text-blue-500 border border-blue-500 px-5 py-3 rounded-xl hover:bg-blue-900 shadow-blue-500/40 shadow-md transition-all">

                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default App
