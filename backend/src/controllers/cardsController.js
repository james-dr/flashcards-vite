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
  try {
    const cardInfo = req.body
    const { error, value } = cardSchema.validate(cardInfo)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    console.log("Card requested to be created: ", cardInfo)

    const createCardRequest = await prisma.card.create({
      data: cardInfo
    })
    res.status(201).json({ success: 'Card created'})
  } catch(error) {
    res.status(500).json({ error: 'Error creating card'})
  }
}

const updateCard = async (req, res) => {
  try {
    const cardInfo = req.body
    const { error, value } = cardPatchSchema.validate(cardInfo)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updateData = {}
    if (cardInfo.front !== undefined) updateData.front = cardInfo.front;
    if (cardInfo.back !== undefined) updateData.back = cardInfo.back;

    await prisma.card.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: updateData
    })
    res.status(200).json({ success: 'Successfully updated card'})
  } catch (error) {
    res.status(500).json({ error: 'Error occurred updating card'})
  }

}

const deleteCard = async (req, res) => {
  try {
    const cardId = req.params.id

    await prisma.card.delete({
      where: {
        id: parseInt(cardId)
      }
    })

    res.status(200).json({success: 'Successfully deleted card'})
  } catch (error) {
    res.status(500).json({error: 'Error deleting card'})
  }
}

module.exports = {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard
}
