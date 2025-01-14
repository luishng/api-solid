import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
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

    await gymsRepository.create({
      title: "I dont know Gym",
      description: "Typezao da massa",
      phone: "(99) 99999-9999",
      latitude: -15.6414769,
      longitude: -47.7894545,
    })

    const { gyms } = await sut.execute({
      userLatitude: -15.7785418,
      userLongitude: -48.5348765
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
      expect.objectContaining({ title: 'TypeScript Gym' }),
    ])
  })
})