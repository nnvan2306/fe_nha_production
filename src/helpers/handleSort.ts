import { IRating, ITeam } from "@/utils/interface";


const poin= (w:number,d:number):number=>{
    return w*3+d;
}



// bubble sort
export const handleSortRating=(arr:IRating[])=>{
    let arrClone =[...arr];
    for(let i =0 ;i < arrClone.length ; i++){
        for(let j = arrClone.length-1; j>i ;j-- ){
            
            if(poin(arrClone[j].win,arrClone[j].draw) > poin(arrClone[j-1].win,arrClone[j-1].draw)){

                [arrClone[j],arrClone[j-1]] = [arrClone[j-1],arrClone[j]];

            }else if(poin(arrClone[j].win,arrClone[j].draw) === poin(arrClone[j-1].win,arrClone[j-1].draw)){

                [arrClone[j],arrClone[j-1]] = [arrClone[j-1],arrClone[j]];

                
                if(arrClone[j].totalGoal - arrClone[j].totalLostGoal >= arrClone[j-1].totalGoal - arrClone[j-1].totalLostGoal){

                }
            }
        }
    } 
    return arrClone; 
}