import { BadRequestException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

const mockPokemonRepository = jest
  .fn()
  .mockImplementation(() => ({ getOneFromDatabase: jest.fn() }));

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
  });

  it('should store a new pokemon', () => {
    mockPokemonRepositoryInstance.getOneFromDatabase.mockImplementation(
      () => null,
    );

    pokemonService.store(pokemon);

    expect(
      mockPokemonRepositoryInstance.getOneFromDatabase,
    ).toHaveBeenCalledWith(pokemon.name);
  });

  it('should not add a new pokemon, already exists', async () => {
    mockPokemonRepositoryInstance.getOneFromDatabase.mockResolvedValue(pokemon);
    await expect(pokemonService.store(pokemon)).rejects.toThrow(
      BadRequestException,
    );
  });
});
