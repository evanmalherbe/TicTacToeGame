using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TicTacToeGame.Models;
using TicTacToeGame.Services;

namespace TicTacToeGame.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            GameService gameService = new GameService();
            List<string> currentGameState = new List<string>();
            string winner = gameService.DecideWinner(currentGameState);

            var gameBoardArray = LoadGameBoard();
            GameData gameData = new GameData()
            {
                GameBoardArray = gameBoardArray,
                Winner = winner
            };
            return View(gameData);
        }

        public List<Gameblock> LoadGameBoard()
        {
            List<Gameblock> blockArray = new List<Gameblock>();

            for (int i = 0; i < 9; i++)
            {
                Gameblock block = new Gameblock()
                {
                    Block = "<div " +
                    "class='col-4 border block blockHeight d-flex justify-content-center align-items-center' " +
                    $"id='block-{i}' " +
                    $@"onClick='insertGamePiece(""block-{i}"")'></div>"
                };

                blockArray.Add(block);
            }
            return blockArray;
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}