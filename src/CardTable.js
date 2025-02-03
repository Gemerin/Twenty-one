/**
 * @file Module for the class Deck.
 * @module src/CardTable
 * @author Eva Heinemann <sh224wg@student.lnu.se>
 * @version 2.0.0
 */

import { Deck } from './Deck.js'
import { Player } from './Player.js'
import { PlayingCard } from './PlayingCard.js'

/**
 * Represents a card table with a dealer, a deck, a discard pile and players.
 */
export class CardTable {
  /**
   * The dealer.
   *
   * @type {Player} - object representing the dealer.
   */
  #dealer
  /**
   * The deck.
   *
   * @type {Deck} - object representing the deck.
   */
  #deck
  /**
   * The discard pile.
   *
   * @type {PlayingCard[]} - array represents the discard pile.
   */
  #discardPile
  /**
   * The players.
   *
   * @type {Player[]} - array of players.
   */
  #players

  /**
   * Represents a card table with a dealer, a deck, a discard pile and players.
   *
   * @class
   * @param {number} numberOfPlayers - The number of players at the table.
   */
  constructor (numberOfPlayers) {
    this.#dealer = new Player('Dealer')
    this.#deck = new Deck()
    this.#deck.shuffle()
    this.#discardPile = []
    this.#players = []

    for (let i = 0; i < numberOfPlayers; i++) {
      this.#players.push(new Player(`Player ${i + 1}`))
    }
  }

  /**
   * Compare the hands of the dealer and player.
   *
   * @param {Player} dealer - the dealer.
   * @param {Player} player - the player.
   * @returns {Player} - the winner.
   */
  #compareHands (dealer, player) {
    if (player.isNaturalWinner) {
      return player
    } else if (dealer.isNaturalWinner) {
      return dealer
    } else if (dealer.isBusted) {
      return player
    } else if (player.isBusted) {
      return dealer
    } else if (player.valueOf() <= 21 && (player.valueOf() > dealer.valueOf() || dealer.valueOf() > 21)) {
      return player
    } else {
      return dealer
    }
  }

  /**
   * If the deck has one card left, the method adds the last card in the deck to the discard pile, shuffles the discard pile and adds it to the deck.
   *
   * @returns {PlayingCard} A playing card dealt from the deck.
   * @throws {Error} If the deck has one card left and the discard pile is empty.
   */
  #deal () {
    if (this.#deck.count === 1) {
      if (this.#discardPile.length === 0) {
        throw new Error('No cards left in deck')
      }
      this.#deck.add(this.#discardPile)
      this.#deck.shuffle()
      this.#discardPile = []
    }
    return this.#deck.deal()
  }

  /**
   * Method allowing the player and dealer to draw a card.
   *
   * @param {Player} dealer - The dealer.
   * @param {Player} player - The player.
   */
  #playOut (dealer, player) {
    // players turn
    while (player.canHit) {
      player.addToHand(this.#deal())
    }
    if (player.isNaturalWinner || player.isBusted) {
      return
    }
    // dealers turn
    while (dealer.canHit) {
      const card = this.#deal()
      dealer.addToHand(card)
    }
  }

  /**
   * Plays the specified number of rounds in the game.
   *
   * @param {number} numberOfRounds - The number of rounds to play.
   */
  playRounds (numberOfRounds) {
    for (let round = 1; round <= numberOfRounds; round++) {
      console.log(`Round ${round}:`)

      for (let i = 0; i < this.#players.length; i++) {
        this.#players[i].addToHand(this.#deal())
      }
      let roundWinner = this.#dealer

      for (let j = 0; j < this.#players.length; j++) {
        this.#playOut(this.#dealer, this.#players[j])
        roundWinner = this.#compareHands(this.#dealer, this.#players[j])
        console.log(this.#players[j].toString())
        console.log(this.#dealer.toString())
        console.log('--- Round Results ---')
        if (roundWinner === this.#dealer) {
          console.log('Dealer Wins!')
          console.log('--------------------')
        } else {
          console.log(`${roundWinner.nickname} Wins!`)
          console.log('--------------------')
        }
        this.#discardPile = this.#discardPile.concat(this.#players[j].discardHand())
        this.#discardPile = this.#discardPile.concat(this.#dealer.discardHand())
      }
    }
  }
}
