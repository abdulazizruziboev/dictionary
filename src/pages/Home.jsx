import Header from "/src/ui-components/Header"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { ExternalLink, Loader, PlayIcon, Search , SpeechIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

function Home() {

  const searchValue = React.useRef();
  const [urlParams,setUrlParams] = useSearchParams();
  
  const [apiData,setApiData] = useState(null);

  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    if(urlParams.get("sq")?.trim()==undefined) {
        setUrlParams({
            ...urlParams,
            sq: ""
        })
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${urlParams.get("sq")?.trim()}`)
    .then(r=>r.json()).then(r=>{
        if(Array.isArray(r)) {
            setApiData(r[0]);
            setLoading(false);
        } else {
            setLoading(false);
            setApiData(r);
        }
    }).catch(
        (err)=>{
        try {
            throw err;
        } catch(err) {
           let error = new Error(err);
           console.error(error.stack)
        }
        setLoading(false);
        setApiData({
            title: "No Definitions Found",
            message: "Sorry pal, we couldn't find definitions for the word you were looking for.",
        })
        }
    )
    if(urlParams.get("sq")?.trim()=="") {
        setLoading(false)
    }
  },[urlParams])

  return (
    <>
    <Header/>
    <main className="p-[24px] pt-0 max-w-[735px] mx-auto"> 
    <form onSubmit={(e)=>{
      e.preventDefault();
      if(searchValue?.current?.value?.trim()!="") {
        setUrlParams({
            ...urlParams,
            sq: searchValue?.current?.value?.trim().toLowerCase()
        })
      } else {
        setUrlParams({
            ...urlParams,
            sq: ""
        })
      }
    }}> 
      <InputGroup className={'bg-[#f4f4f4] border-0 rounded-[16px] border-1'}>
      <InputGroupInput className={'border-none outline-none focus-visible:outline-[#A445ED]'} placeholder="Search..."  ref={searchValue} defaultValue={urlParams.get("sq")?.trim()} />
      <InputGroupAddon align="inline-end" className={'h-full p-0'}>
        <Button className={'!items-center p-0 w-[50px] h-full cursor-pointer w-[45 px] !px-0 mr-[9px] rounded-full'} type='submit' variant="ghost"> 
          <Search className="text-[#A445ED]"/>
        </Button>
      </InputGroupAddon>
      </InputGroup>
    </form>
    {
    loading&&
    <div className="py-[24px] px-[4px] min-h-[75vh] flex items-center justify-center flex-col gap-2">
        <Loader className="animate-spin"/> 
    </div>
    }
    {
    !loading && <div className="py-[24px] px-[4px]">
    {
    urlParams.get("sq")?.trim()==""
    ? <div className="min-h-[75vh] flex items-center justify-center">
        <div className="flex flex-col gap-5 justify-center items-center">
            <span className="leading-none text-[64px]">😊</span>
            <span className="leading-none font-bold">Nothing was searched</span>
        </div>
    </div> :
    <>
    {
    apiData?.hasOwnProperty("title")
    ?
    <div className="min-h-[75vh] flex items-center justify-center">
        <div className="flex flex-col gap-5 justify-center items-center text-center">
            <span className="leading-[120%] text-[64px]">😕</span>
            <span className="leading-none font-bold text-[20px]">{apiData["title"]??"No Definitions Found"}</span>
            <span className="leading-[125%] opacity-70">{apiData["message"]??"Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."}</span>
        </div>
    </div>
    :
    <>
    <div className="flex flex-col gap-3">
        <div className="flex justify-between">
            <div className="flex-1"> 
                <h3 className="text-[32px] font-bold text-[#2d2d2d] dark:text-white leading-none">{apiData?.word||"No data"}</h3>
                <span className="text-[#A445ED] text-[24px]">{apiData?.phonetic??"/'no-data/"}</span>
            </div>
            <div>
            <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className={'rounded-full w-[48px] h-[48px] duration-0 cursor-pointer border-none bg-[#e8d1fb] text-[#A445ED] hover:bg-[#A445ED] hover:text-white dark:bg-[#2d153f] dark:text-[#A445ED] dark:hover:bg-[#A445ED] dark:hover:text-white'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className={'flex items-center flex-col mx-auto justify-center'}>
                <AlertDialogMedia className={'mx-auto'}>
                    <SpeechIcon />
                </AlertDialogMedia>
                <AlertDialogTitle>Phonetics</AlertDialogTitle>
                </AlertDialogHeader>
                    <AlertDialogDescription className={'w-full px-1 grid gap-2'}>
                    {
                        apiData?.phonetics?.length>0 ?
                        <>
                        {apiData?.phonetics?.filter(el=>el.audio).map((el,inx)=>{
                            return <div className="flex w-full justify-between items-center border-1 py-4 px-4 rounded-[12px]" key={inx}>
                            <span className="text-[16px]">{el.text??"/'no-data/"}</span>
                            <button className="cursor-pointer hover:text-[#A445ED] px-1">
                                <PlayIcon className="w-[20px]" onClick={()=>{
                                    let audio = new Audio();
                                    audio.src=el.audio;
                                    audio.play();
                                }}/>
                            </button>
                            </div>
                        })}
                        </>
                        : "No phonetics"
                    }

                </AlertDialogDescription>
                <AlertDialogFooter>
                <AlertDialogCancel className={'cursor-pointer'}>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
            </div>
            
        </div>
        <div className="flex flex-col gap-10">
            {apiData?.meanings?.map((el,i)=>{
            return <React.Fragment key={i}>
            <div className="flex flex-col">
                <div className="flex w-full gap-2 flex-col">
                <div className="flex w-full items-center gap-3"><span className="font-bold text-[18px] italic">{el.partOfSpeech}</span><hr className="w-full"/></div>
                <div>
                    <span className="text-[16px] opacity-85 sm:text-[20px]">Meaning</span>
                </div>
                    <ul className="list-inside list-disc flex flex-col gap-4 ">
                        {el.definitions?.map((el,inx)=>{
                            return <li key={inx} className="[&::marker]:text-[#8f19e8] text-[14px] sm:text-[18px]">{el.definition}</li>
                        })}
                    </ul>
                    <div className="flex flex-wrap">
                    <span className="text-[16px] opacity-85 ">Synonyms: &nbsp;</span>
                    <div className="gap-x-2 flex flex-wrap text-[#A445ED] font-bold">{el.synonyms?.join(", ")}</div>
                    </div>
                </div>
            </div>
            </React.Fragment>
            
            })}
        </div>
    </div>
    {
    apiData?.sourceUrls?.length>0 &&
    <>
    <hr className="my-3"/>
    <div className="flex flex-wrap gap-2">
    <span className="text-[14px] opacity-75 underline sm:text-[18px]">Sources:</span>
    <div className="gap-2 flex flex-wrap">{apiData?.sourceUrls?.map((el,inx)=>(<a href={el} key={inx} target="_blank" className="underline hover:text-[#a445ed] flex gap-1.5 leading-none items-center justify-center">{el} <ExternalLink className="w-5"/></a>))}</div>
    </div>
    </>
    }
    </>
    }
    </>
    }
    </div>
    }
    </main> 
    </>
  )
}

export default Home
