import { IRating } from "@/utils/interface";


const poin= (w:number,d:number):number=>{
    return w*3+d;
}

const swap =(f:IRating,l:IRating,arr:IRating[])=>{
    let temp : IRating= f;
    return [...arr,f=l,l=temp];
}


// bubble sort
export const handleSortRating=(arr:IRating[])=>{
    let arrClone =[...arr];
    for(let i =0 ;i < arrClone.length ; i++){
        for(let j = arrClone.length-1; j>i ;j-- ){
            
            if(poin(arrClone[j].win,arrClone[j].draw) > poin(arrClone[j-1].win,arrClone[j-1].draw)){
                arrClone =swap(arrClone[j-1],arrClone[j],arrClone);

            }else if(poin(arrClone[j].win,arrClone[j].draw) === poin(arrClone[j-1].win,arrClone[j-1].draw)){

                if(arrClone[j].totalGoal - arrClone[j].totalLostGoal >= arrClone[j-1].totalGoal - arrClone[j-1].totalLostGoal){

                    arrClone=swap(arrClone[j-1],arrClone[j],arrClone);
                }
            }
        }
    } 
    return arrClone; 
}