namespace TicTacToeGame.Services
{
    public class GameService
    {
        public string DecideWinner(List<string> gamestate)
        {
            // All possible winning conditions
            int[,] winningConditionsArray =
            {
                { 0, 1, 2 }, // horizontal 0 
                { 3, 4, 5 }, // horizontal 1
                { 6, 7, 8 }, // horizontal 2
                { 0, 3, 6 }, // vertical 3
                { 1, 4, 7 }, // vertical 4
                { 2, 5, 8 }, // vertical 5
                { 0, 4, 8 }, // diagonal 6
                { 2, 4, 6 } // diagonal 7
            };

            var test = winningConditionsArray[0, 0];
            // Check board against winning conditions array

            for (int i = 0; i < winningConditionsArray.GetLength(0); i++)
            {
               
            }
            //winningConditionsArray.some((condition, index) => {
            //    if (boardArray[condition[0]] === boardArray[condition[1]]
            //        && boardArray[condition[1]] === boardArray[condition[2]]
            //        && boardArray[condition[0]] !== null)
            //    {
            //        youWon(boardArray[condition[0]]);
            //        return true;
            //    }
            //});
            return "";
        }
    }
}
