const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Joi = require('joi')

const cardSchema = Joi.object({
  front: Joi.string().min(1).required(),
  back: Joi.string().min(1).required(),
  deckId: Joi.number().integer().required()
})
const cardPatchSchema = Joi.object({
  front: Joi.string().min(1),
  back: Joi.string().min(1)
}).min(1)

const getAllDecks = async (req, res) => {
  console.log('getAllDecks called')
  try {
    const decks = await prisma.deck.findMany()
    console.log('Found decks:', decks.length)
    res.json(decks)
  } catch (error) {
    console.error('Error in getAllDecks:', error)
    res.status(500).json({ error: 'Failed to fetch decks' })
  }
}

const getDeckById = async (req, res) => {
  console.log('getDeckById called with ID:', req.params.id)
  try {
    const { id } = req.params
    const deck = await prisma.deck.findUnique({
      where: { id: parseInt(id) }

    })

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' })
    }

    res.json(deck)
  } catch (error) {
    console.error('Error in getDeckById:', error)
    res.status(500).json({ error: 'Failed to fetch deck' })
  }
}

const createDeck = async (req, res) => {
  try {
    const deckInfo = req.body

    const createDeckRequest = await prisma.deck.create({
      data: deckInfo
    })
    res.status(201).json({ success: 'Deck created'})
  } catch(error) {
    res.status(500).json({ error: 'Error creating deck'})
  }
}

const updateDeck = async (req, res) => {
  try {
    const deckInfo = req.body

    const updatedCard = await prisma.deck.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: deckInfo
    })
    res.status(200).json({ success: 'Successfully updated deck'})
  } catch (error) {
    res.status(500).json({ error: 'Error occurred updating deck'})
  }

}

const deleteDeck = async (req, res) => {
  try {
    const deckId = req.params.id

    const deleteCard = await prisma.deck.delete({
      where: {
        id: parseInt(deckId)
      }
    })

    res.status(200).json({success: 'Successfully deleted deck'})
  } catch (error) {
    res.status(500).json({error: 'Error deleting deck'})
  }
}

module.exports = {
  getAllDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck
}
