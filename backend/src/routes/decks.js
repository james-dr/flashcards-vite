
const express = require('express')
const router = express.Router()

console.log('Decks routes loading...')

const {
  getAllDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck
} = require('../controllers/decksController')

router.get('/', getAllDecks)
router.get('/:id', getDeckById)
router.post('/', createDeck)
router.patch('/:id', updateDeck)
router.delete('/:id', deleteDeck)

console.log('Deck routes loaded!')

module.exports = router
