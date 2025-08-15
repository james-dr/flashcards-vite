const express = require('express')
const router = express.Router()

console.log('Cards routes loading...')

const {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard
} = require('../controllers/cardsController')

router.get('/', getAllCards)
router.get('/:id', getCardById)
router.post('/', createCard)
router.patch('/:id', updateCard)
router.delete('/:id', deleteCard)

console.log('Cards routes loaded!')

module.exports = router