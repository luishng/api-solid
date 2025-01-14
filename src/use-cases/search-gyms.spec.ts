import { beforeEach, describe, expect, it } from 'vitest'
import { } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: "Javao da massa",
      phone: "(99) 99999-9999",
      latitude: -15.7785418,
      longitude: -48.5348765,
    })

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: "Typezao da massa",
      phone: "(99) 99999-9999",
      latitude: -15.7785418,
      longitude: -48.5348765,
    })

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        description: "Typezao da massa",
        phone: "(99) 99999-9999",
        latitude: -15.7785418,
        longitude: -48.5348765,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym 21' }),
      expect.objectContaining({ title: 'TypeScript Gym 22' }),
    ])
  })
})