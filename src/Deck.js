/**
 * @file Module for the class Deck.
 * @module src/Deck
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Eva Heinemann <sh224wg@student.lnu.se>
 * @version 2.0.0
 */

import { PlayingCard } from './PlayingCard.js'

/**
 * Represents a deck.
 */
export class Deck {
  /**
   * Array of playing cards.
   *
   * @type {PlayingCard[]}
   */
  #playingCards = []

  /**
   * Initializes a new instance of the Deck class.
   */
  constructor () {
    this.#playingCards = []

    for (const suit of PlayingCard.suits) {
      for (const rank of PlayingCard.ranks) {
        this.#playingCards.push(new PlayingCard(rank, suit))
      }
    }
  }

  /**
   * Returns the number of cards in the deck.
   *
   * @returns {number} The number of cards in the deck.
   */
  get count () {
    return this.#playingCards.length
  }

  /**
   * Add card(s) to the deck.
   *
   * @param {PlayingCard[]} playingCards - Array of PlayingCard objects to be added to the deck.
   */
  add (playingCards) {
    this.#playingCards = this.#playingCards.concat(playingCards)
  }

  /**
   * Deals the top card in the deck.
   *
   * @returns {PlayingCard} - The top card in the deck.
   */
  deal () {
    return this.#playingCards.pop()
  }

  /**
   * Shuffles the array of playing cards in place.
   */
  shuffle () {
    for (let i = this.#playingCards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[this.#playingCards[i], this.#playingCards[randomIndex]] = [this.#playingCards[randomIndex], this.#playingCards[i]]
    }
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string} A string that represents the current object.
   */
  toString () {
    return this.#playingCards.join(' ')
  }
}
