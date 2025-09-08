
export default function StatusBoard({isGameOver, isGameWon, farewellMessage, isIncorrect}){
        if(!isGameOver && isIncorrect) {
             return (
                    <div className="status-board fareware">
                       <p>{farewellMessage}</p>
                    </div>
        )
        } 
        else if(isGameOver){
            if(isGameWon){
                return (
                    <div className="status-board win">
                        <h1>Yon Win!</h1>
                        <p>Well done! 🎉</p>
                    </div>
                )
            } else {
                 return (
                    <div className="status-board lose">
                        <h1>Game over!</h1>
                        <p>You lose! Better start learning Assembly 😭</p>
                    </div>
                )
            }
        } else {
            return <div className="status-board ">
                       <p>{farewellMessage}</p>
                    </div>
        }




       
}