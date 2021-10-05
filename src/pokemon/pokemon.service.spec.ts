import { BadRequestException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

const mockPokemonRepository = jest.fn().mockImplementation(() => ({
  getOneFromDatabase: jest.fn(),
  storeInDatabase: jest.fn(),
}));

const pokemon = {
  name: 'Pikachu',
  id: 1,
  weight: 10,
  height: 10,
};

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  const mockPokemonRepositoryInstance = new mockPokemonRepository();

  beforeAll(() => {
    pokemonService = new PokemonService(mockPokemonRepositoryInstance);
  });

  afterEach(() => {
    mockPokemonRepositoryInstance.getOneFromDatabase.mockReset();
    mockPokemonRepositoryInstance.storeInDatabase.mockReset();
  });

  it('should store a new pokemon', async () => {
    mockPokemonRepositoryInstance.getOneFromDatabase.mockResolvedValue(null);
    mockPokemonRepositoryInstance.storeInDatabase.mockResolvedValue(pokemon);
    await expect(pokemonService.store(pokemon)).resolves.toBe(pokemon);
  });

  it('should not store a new pokemon, already exists', async () => {
    mockPokemonRepositoryInstance.getOneFromDatabase.mockResolvedValue(pokemon);
    await expect(pokemonService.store(pokemon)).rejects.toThrow(
      BadRequestException,
    );
  });
});
