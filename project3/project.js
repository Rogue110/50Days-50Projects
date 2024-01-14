const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOL_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2
}



const deposit = () =>{
    while(true){
        const depositamt =  prompt("Enter a deposit amount: ");
    const numdeposit = parseFloat(depositamt);

    if(isNaN(numdeposit) || numdeposit <= 0){
        console.log("Invalid deposit amount, try again.");
    }else{
        return numdeposit;
    }
    }
};

const getNumberoflines = () =>{
    while(true){
        const lines =  prompt("Enter number of lines to bet on(1-3): ");
    const numlines = parseFloat(lines);

    if(isNaN(numlines) || numlines <= 0 || numlines>3){
        console.log("Invalid numebr of lines, try again.");
    }else{
        return numlines;
    }
    }
};

const getbet = (balance,numoflines) =>{
    while(true){
        const numbet =  prompt("Enter the bet per line: ");
    const bet = parseFloat(numbet);

    if(isNaN(bet) || bet <= 0 || bet > balance/numoflines){
        console.log("Invalid bet, try again.");
    }else{
        return bet;
    }
    }
};


const spin = () =>{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
    
    const reels = [];
    for(let i=0;i<COLS;i++){
        reels.push([])
        const reelsymbols = [...symbols];
        for(let j =0 ;j<ROWS;j++){
            const randomindex = Math.floor(Math.random() * reelsymbols.length)
            const selectedSymbol = reelsymbols[randomindex];
            reels[i].push(selectedSymbol);
            reelsymbols.splice(randomindex,1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
};


const printreel = (rows) =>{
    for(const row of rows){
        let rowString = "";
        for(const [i,symbol] of row.entries()){
            rowString+=symbol;
            if(i!=row.length-1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

const getwinnings = (rows,tbet,numoflines)=>{
    let  winnings = 0;

    for(let row =0;row<numoflines;row++){
        const symbols = rows[row]
        let allsame = true;

        for(const symbol of symbols){
            if (symbol!= symbols[0]){
                allsame = false;
                break;
            }
        }

        if ( allsame){
            winnings+= tbet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
};

const game = () =>{
    let balance = deposit();
    while(true){
    console.log("You have a balance of $" + balance);
    const numoflines = getNumberoflines();
    const tbet = getbet(balance, numoflines);
    balance -= tbet * numoflines;
    const reel = spin();
    const rows = transpose(reel);
    printreel(rows);
    const winnings = getwinnings(rows,tbet,numoflines);
    balance += winnings;
    console.log("you won, $" + winnings.toString())

    if(balance<=0){
        console.log("you ran out of money!");
    }
    const playagain = prompt("Do you want to play again (y/n)? ");
    if(playagain!="y")break;
    }
};

game();
