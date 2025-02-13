'use client'

import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface TitleProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  className?: string;
  value: string
  url:string
  
}



export default function PageTitle({value,url,className,...rest}:TitleProps){
  
    return (
       <Link href={url}   >
        <h1 className={`text-4xl font-bold font-shadow mb-10 ${className}` }
        {...rest}>{value}</h1>
       </Link>
    )
}