const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllCards = async (req, res) => {
  console.log('getAllCards called')
  try {
    const cards = await prisma.card.findMany({
      include: {
        deck: {
          select: { name: true }
        }
      }
    })
    console.log('Found cards:', cards.length)
    res.json(cards)
  } catch (error) {
    console.error('Error in getAllCards:', error)
    res.status(500).json({ error: 'Failed to fetch cards' })
  }
}

const getCardById = async (req, res) => {
  console.log('getCardById called with ID:', req.params.id)
  try {
    const { id } = req.params
    const card = await prisma.card.findUnique({
      where: { id: parseInt(id) },
      include: {
        deck: {
          select: { name: true }
        }
      }
    })
    
    if (!card) {
      return res.status(404).json({ error: 'Card not found' })
    }
    
    res.json(card)
  } catch (error) {
    console.error('Error in getCardById:', error)
    res.status(500).json({ error: 'Failed to fetch card' })
  }
}

const createCard = async (req, res) => {
  res.json({ message: "TODO: Implement createCard" })
}

const updateCard = async (req, res) => {
  res.json({ message: "TODO: Implement updateCard" })
}

const deleteCard = async (req, res) => {
  res.json({ message: "TODO: Implement deleteCard" })
}

module.exports = {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard
}