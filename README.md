# Tic-Tac-Toe #
The game of [tic-tac-toe](http://en.wikipedia.org/wiki/Tic-tac-toe). 

## Overview ##
In tic-tac-toe, the idea is to get 3 X's or 3 O's in a row, either vertically,
horizontally, or diagonally. This is a two player game. When someone connects
to the server, it will locate a game that either contains only one player (and
needs one more), or create a new game. Once two players are in the same game,
the game begins. Players then alternate clicking on an available spot to claim
it with their symbol (either X or O). When one player wins, or the game contains
no more available spots on the board, each are allowed to play again. This action
clears the board and restarts the game.

The two players do not need to be on seperate devices, and can be on the same
machine. If they are on the same machine, they need to be in separate browser
tabs or windows. Each connection is considered a separate person. Currently there
is no way to choose a specific person to play against, since the server just finds
the next available game to place the player in (which could be a new game).

## Technical Implementation Details ##
This game provided a sandbox to test out [Socket.IO](http://socket.io/) in a
Node.js application. Backbone.js is used on the client side and Node.js on the
server side, but the interaction between the two is done purely through socket.io.
For example, each time a user clicks a space to claim it with their symbol (X or O),
an event is sent from the client to the server, the server verifies the space is
available (and the player is playing during his/her turn), and sends an event back to
signal the space was taken to both clients. In this way, the rules and game board
are both stored and run on the server side, and the clients only display what the
server tells them.

The bulk of the game logic is in tic-tac-toe-game.js, which contains functions to
create games, find games for new players, determine if moves are valid, and if
anyone has won the game after the turn is over. The tic-tac-toe-controller.js
contains all the socket.io logic to send and receive messages to the clients, and
uses the tic-tac-toe-game.js file to handle game logic. On the client side, the
board-view.js handles most of the socket.io messages while it runs the game
board.  

More information on the details of the application can be found here:  
http://blog.dylants.com/2013/05/26/socket-io/

## Getting Started ##
If the game is hosted, you may find the URL in the GitHub description above.  Please be
aware that the game may take a while to connect because of the cheap (free!) hosting.

To run it locally, you'll need to install Node.js, clone the repo, and within the
directory of the game run:  

<code>npm install</code>  
<code>npm start</code>

Point your browser to http://localhost:3000 for each player who would like to play.
