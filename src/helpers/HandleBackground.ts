export const handlebackground= (color : number) : string=>{
    if(color <= 2){
        return "bg-[pink]"
    }

    if(color <= 4){
        return "bg-[green]"
    }

    if(color <= 6){
        return "bg-[red]"
    }

    if(color <=8 ){
        return "bg-[blue]"
    }

    return "bg-[orange]"
   
}