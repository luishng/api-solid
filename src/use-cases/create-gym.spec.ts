import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymCase(gymRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: "Javiroto GYM",
      description: "Javao da massa",
      phone: "(99) 99999-9999",
      latitude: -15.7785418,
      longitude: -48.5348765,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})