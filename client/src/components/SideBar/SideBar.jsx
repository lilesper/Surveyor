import React, { useEffect, useState } from 'react'
import './SideBar.css'
import { data } from '../../data/assets'
import { useSelector, useDispatch } from "react-redux"
import { changeChain } from '../../redux/features/chainSlice'
import { changeLocation } from '../../redux/features/locationSlice'
import { formatter } from '../../constants'

const SideBar = ({ data }) => {
  const dispatch = useDispatch()

  const chain = useSelector((state) => state.chain.chain)
  const chains = useSelector((state) => state.chain.chains)
  const location = useSelector((state) => state.location.location)

  const [chainPercentage, setChainPercentage] = useState(0)
  const [chainAmount, setChainAmount] = useState(0)


  useEffect(()=>{
    getPercentage()
  }, [data, chains])

  const handleChain = (token) => {
    dispatch(changeChain(token))
  };

  const handleLocation = (location) => {
    dispatch(changeLocation(location))
  }

  const getPercentage = () => {
    let totalUSD = 0
    let chainAmounts = {};
  
    data?.forEach((item) => {
      totalUSD = totalUSD + (item.price * item.amount)
    });
  
    chains.forEach((chain) => {
      const chainItems = data.filter((item) => item.chain.toUpperCase() === chain.toUpperCase());
      const chainTotalAmount = chainItems.reduce((acc, item) => acc + (item.price * item.amount), 0);
      chainAmounts[chain] = chainTotalAmount;
    });
  
    console.log({chainAmounts})

    const chainPercentages = {};
    chains.forEach((chain) => {
      const chainPercentage = (chainAmounts[chain] / totalUSD) * 100;
      chainPercentages[chain] = chainPercentage;
    });

    console.log({chainPercentages})


    setChainAmount(chainAmounts)
    setChainPercentage(chainPercentages);
  };
  

  const getUrl = (chain) => {
    try {
      let url = data?.find(e => e.optimized_symbol.toUpperCase() === chain.toUpperCase())?.logo_url || null

      if (!url) {
        data?.find(e => {
          const regex = new RegExp(chain.toUpperCase(), "i");
          if (regex.test(
            e.optimized_symbol.toUpperCase()
          )) url = e?.logo_url
        })

        if(chain.toUpperCase() === "BSC") url = 'https://alphawallet.com/wp-content/uploads/2021/02/BNB.png'

      }
      return url
    } catch (e) {
      return null
    }
  }

  return (
    <>
      <div className='rounded-xl bg-block-color poppins mx-auto w-[17%] text-sm py-4 scrollable-element h-[70vh] overflow-y-scroll'>
        <div className='border-b border-[#44444F] py-4'>
          <p className='mb-4'>Segment by Chains</p>
          {
            chains.length > 0 ? (
              chains
              .map((item, i) =>{
                const percentage = chainPercentage[item] || 0;
                const USDvalue = chainAmount[item] || 0
                return{
                  item,
                  percentage,
                  USDvalue
                }
              })
              .sort((a, b) => b.percentage - a.percentage)
              .map(({item, USDvalue, percentage}, index) => {
                return(
                  <div
                    key={index}
                    onClick={() => handleChain(item)}
                    className={`flex  ${getUrl(item) ? 'justify-start' : 'justify-center'} gap-2 menu-items p-4 cursor-pointer hover:text-white ${item === chain ? 'selected-item' : ''}`}>
                    {getUrl(item) && <img src={getUrl(item)} className='w-[32px] h-[32px] rounded-2xl' />}
                    <div className='text-[#FAFAFB] text-left'>
                      <p className='text-xs text-[#92929D] mb-1 roboto'>Assets on {item}</p>
                      <p className='text-sm flex justify-start gap-2 items-baseline'><span>${formatter.format(USDvalue.toFixed(2))}</span><span className='text-[10px]'>{percentage.toFixed(2)}%</span></p>
                    </div>
                  </div>
                )
                })
            ) : (
              <p>Could not fetch.</p>
            )

          }
        </div>
        {/* <div className='py-4'>
                <p className='mb-4'>Segment by Location</p>
                {
                      highPrices?.map(({token, price, percentage, color}, index) => (
                              <div 
                              key={index} 
                              onClick={() => handleLocation(token)}
                              className={`flex justify-start gap-2 menu-items p-4 cursor-pointer ${token === location ? 'selected-item' : ''}`}>
                                <svg height="40" width="40" className=''>
                                    <circle cx="20" cy="20" r="20" fill={color} />
                              </svg>
                                <div className='text-[#FAFAFB] text-left'>
                                  <p className='text-xs text-[#92929D]'>Assets on {token}</p>
                                  <p className='text-sm flex justify-start gap-2 items-baseline'><span>${price}</span><span className='text-[10px]'>{percentage}%</span></p>
                                </div>
                              </div>
                      ))
}
            </div> */}
      </div>
    </>
  )
}

export default SideBar