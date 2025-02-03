/**
 * @file The starting point of the application.
 * @module src/app
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Saskia Heinemann <sh224wg@student.lnu.se>
 * @version 2.0.0
 */

// TODO: Replace the code below with your own game logic.

import { CardTable } from './CardTable.js'

/**
 * Check if the number of rounds is provided as a command line argument, default to 1 if not.
 * Validate the number of rounds to be between 1 and 5. If not provide exit code 26.
 */
const numberOfRounds = parseInt(process.argv[2]) || 1
if (isNaN(numberOfRounds) || numberOfRounds < 1 || numberOfRounds > 5) {
  console.error('Error: Invalid number of rounds. Select a number between 1 and 5.')
  process.exit(26)
} else {
  process.exitCode = 0
}

/**
 * Check if the number of players is provided as a command line argument, default to 3 if not.
 * Validate the number of players to be between 1 and 7 if not provide exit code 27.
 * Console error if number of players is 52 and provide exit code 28.
 */
const numberOfPlayers = parseInt(process.argv[3]) || 3

if (numberOfPlayers === 52) {
  console.error('Error: No cards left in deck. Select a new number of players.')
  process.exit(28)
} else if (isNaN(numberOfPlayers) || numberOfPlayers < 1 || numberOfPlayers > 7) {
  console.error('Error: Invalid number of players. Select a number between 1 and 7.')
  process.exit(27)
} else {
  process.exitCode = 0
}

/**
 * Instantiate a CardTable object with the specified number of players.
 * Play the specified number of rounds. Set the exit code to 0 indicating successful execution.
 * Handle any errors that might occur during execution and set exit code to 1.
 */
try {
  const table = new CardTable(numberOfPlayers)
  table.playRounds(numberOfRounds)
  process.exitCode = 0
} catch (e) {
  console.error(e.message)
  process.exit(1)
}
