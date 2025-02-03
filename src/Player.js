/**
 * @file Module for the class Deck.
 * @module src/Player
 * @author Eva Heinemann <sh224wg@student.lnu.se>
 * @version 2.0.0
 */

import { PlayingCard } from './PlayingCard.js'

/**
 * Represents a player.
 */
export class Player {
  /** *
   *
   * @type {PlayingCard[]} - array of playing cards in players hand.
   */
  #hand
  /** *
   *
   * @type {string} nickname - player name.
   */
  #nickname

  /** *
   *
   * @type {number} standValue - sum of playing cards in hand while the player is pulling cards.
   */
  #standValue

  /**
   *Initializes a new player.
   *
   * @param {string} nickname - represents the players name.
   * @param {number} standValue - maximum total value of cards in the players hand.
   */
  constructor (nickname, standValue = 14) {
    this.#nickname = nickname
    this.#standValue = standValue
    this.#hand = []
  }

  /**
   * Property determining if the player can draw a card.
   *
   * @returns {boolean} - true if the player can draw a card, false if not.
   */
  get canHit () {
    if (this.#hand.length === 5 || this.isNaturalWinner || this.isBusted || this.valueOf() >= this.#standValue) {
      return false
    } else {
      return true
    }
  }

  /**
   * Property determining if the player can draw a card based on if the standValue is greater than 21.
   *
   * @returns {boolean} - true if the hand is larger than 21.
   */
  get isBusted () {
    return this.valueOf() >= 22
  }

  /**
   * Property determining if the player can draw a card based on if the standValue is 21.
   *
   * @returns {boolean} - true if the hand is equal to 21 or player has 5 cards in hand and less than 21.
   */
  get isNaturalWinner () {
    return this.valueOf() === 21 || (this.#hand.length === 5 && this.valueOf() < 21)
  }

  /**
   * Property that returns the nickname of the player.
   *
   * @returns {string} - the nickname of the player.
   */
  get nickname () {
    return this.#nickname
  }

  /**
   * Add a card to the players hand.
   *
   * @param {PlayingCard} playingCard - the card to be added to the player's hand.
   */
  addToHand (playingCard) {
    this.#hand.push(playingCard)
  }

  /**
   * Method to discard the cards in the players hand.
   *
   * @returns {PlayingCard[]} discardCards - the cards that were discarded.
   */
  discardHand () {
    const discardCards = this.#hand
    this.#hand = []
    return discardCards
  }

  /**
   * Method to return a string representing the object.
   *
   * @returns {string} - a string that represents the current object.
   */
  toString () {
    if (this.isBusted) {
      return `${this.#nickname}: ${this.#hand.join(', ')} (${this.valueOf()}) BUSTED!`
    } else {
      return `${this.#nickname}: ${this.#hand.join(', ')} (${this.valueOf()})`
    }
  }

  /**
   * Returns the total value of the player's hand, taking into account the value of aces.
   *
   * @returns {number} - The total value of the player's hand.
   */
  valueOf () {
    const baseValue = this.#hand.reduce((total, card) => total + card.valueOf(), 0)
    const acesCount = this.#hand.filter(card => card.valueOf() === 1).length

    let totalValue = baseValue
    for (let i = 0; i < acesCount; i++) {
      if (totalValue + 13 <= 21) {
        totalValue += 13
      }
    }
    return totalValue
  }
}
