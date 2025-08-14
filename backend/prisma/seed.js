const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting to seed...')
  
  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      username: 'john_doe',
      password: hashedPassword,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      username: 'jane_smith',
      password: hashedPassword,
    },
  })

  console.log('✅ Created users')

  // Create decks
  const spanishDeck = await prisma.deck.create({
    data: {
      name: 'Spanish Vocabulary',
      description: 'Basic Spanish words and phrases',
      userId: user1.id,
    },
  })

  const mathDeck = await prisma.deck.create({
    data: {
      name: 'Math Formulas',
      description: 'Essential mathematical formulas',
      userId: user1.id,
    },
  })

  const historyDeck = await prisma.deck.create({
    data: {
      name: 'World History',
      description: 'Important historical dates and events',
      userId: user2.id,
    },
  })

  console.log('✅ Created decks')

  // Create cards for Spanish deck
  const spanishCards = [
    { front: 'Hello', back: 'Hola' },
    { front: 'Goodbye', back: 'Adiós' },
    { front: 'Thank you', back: 'Gracias' },
    { front: 'Please', back: 'Por favor' },
    { front: 'Yes', back: 'Sí' },
    { front: 'No', back: 'No' },
    { front: 'Water', back: 'Agua' },
    { front: 'Food', back: 'Comida' },
    { front: 'House', back: 'Casa' },
    { front: 'Cat', back: 'Gato' },
  ]

  for (const card of spanishCards) {
    await prisma.card.create({
      data: {
        front: card.front,
        back: card.back,
        deckId: spanishDeck.id,
      },
    })
  }

  // Create cards for Math deck
  const mathCards = [
    { front: 'Pythagorean Theorem', back: 'a² + b² = c²' },
    { front: 'Quadratic Formula', back: 'x = (-b ± √(b²-4ac)) / 2a' },
    { front: 'Area of Circle', back: 'A = πr²' },
    { front: 'Circumference of Circle', back: 'C = 2πr' },
    { front: 'Slope Formula', back: 'm = (y₂-y₁)/(x₂-x₁)' },
    { front: 'Distance Formula', back: 'd = √((x₂-x₁)² + (y₂-y₁)²)' },
  ]

  for (const card of mathCards) {
    await prisma.card.create({
      data: {
        front: card.front,
        back: card.back,
        deckId: mathDeck.id,
      },
    })
  }

  // Create cards for History deck
  const historyCards = [
    { front: 'When did World War II end?', back: 'September 2, 1945' },
    { front: 'When was the Declaration of Independence signed?', back: 'July 4, 1776' },
    { front: 'When did the Berlin Wall fall?', back: 'November 9, 1989' },
    { front: 'When did the French Revolution begin?', back: '1789' },
    { front: 'When was the first moon landing?', back: 'July 20, 1969' },
  ]

  for (const card of historyCards) {
    await prisma.card.create({
      data: {
        front: card.front,
        back: card.back,
        deckId: historyDeck.id,
      },
    })
  }

  console.log('✅ Created cards')
  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })