"use server"

import {  IResBanking } from "@/utils/interface";


export const checkBankingAction = async():Promise<IResBanking>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BANKING_URL}macros/echo?user_content_key=e2LRObhai69On1DtnEmtjUxZH7jiKeX-jpa-joPnJw6C4ilQrdIHzvVcMnqY6ignYQ6eXObFBicADRsSsjeg10TNnkvgWzR1m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDb3fB2o6JFw1d5yNPAa0zoFBfSSR2oXqkZr2dNEgEzsdRz6v1A71Vu1h0NQ5SuOSxDuoZH2pl2nSQiIhryfQ-TekeC8Cd9Urdz9Jw9Md8uu&lib=MEsl-pipokhxFT4m2LW4agYi6TrN_Qa97` , {
        method: 'GET',
        cache:"no-store",
    });
    const data = await res.json();
    return data;

}




