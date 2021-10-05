import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonCreateDto } from './pokemon_create.dto';
import { PokemonUpdateDto } from './pokemon_update.dto';

const mockPokemonRepository = jest.fn().mockImplementation(() => ({
  getOneFromDatabase: jest.fn(),
  storeInDatabase: jest.fn(),
  getListFromDatabase: jest.fn(),
  deleteOneInDatabase: jest.fn(),
  updateOneFromDatabase: jest.fn(),
}));

const pokemon: PokemonCreateDto = {
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
    mockPokemonRepositoryInstance.getListFromDatabase.mockReset();
    mockPokemonRepositoryInstance.deleteOneInDatabase.mockReset();
  });

  it('should store a new pokemon', async () => {
    mockPokemonRepositoryInstance.getOneFromDatabase.mockResolvedValue(null);
    mockPokemonRepositoryInstance.storeInDatabase.mockResolvedValue(pokemon);
    await expect(pokemonService.store(pokemon)).resolves.toEqual(pokemon);
  });

  it('should not store a new pokemon, already exists', async () => {
    mockPokemonRepositoryInstance.getOneFromDatabase.mockResolvedValue(pokemon);
    await expect(pokemonService.store(pokemon)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should get list of pokemons', async () => {
    mockPokemonRepositoryInstance.getListFromDatabase.mockResolvedValue([
      pokemon,
    ]);
    await expect(pokemonService.getList()).resolves.toEqual([pokemon]);
  });

  it('should delete a pokemons', async () => {
    mockPokemonRepositoryInstance.deleteOneInDatabase.mockResolvedValue(
      pokemon,
    );
    await expect(pokemonService.delete('carapuce')).resolves.toEqual(pokemon);
  });

  it('should not delete a pokemon, not exists', async () => {
    mockPokemonRepositoryInstance.deleteOneInDatabase.mockResolvedValue(null);
    await expect(pokemonService.delete('unknown_pokemon')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should get one pokemon', async () => {
    mockPokemonRepositoryInstance.getOneFromDatabase.mockResolvedValue(pokemon);
    await expect(pokemonService.getOne('carapuce')).resolves.toEqual(pokemon);
  });

  it('should not get one pokemon, does not exist', async () => {
    mockPokemonRepositoryInstance.getOneFromDatabase.mockResolvedValue(null);
    await expect(pokemonService.getOne('unknown_pokemon')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a pokemon', async () => {
    mockPokemonRepositoryInstance.updateOneFromDatabase.mockResolvedValue(
      pokemon,
    );
    await expect(
      pokemonService.update('carapuce', new PokemonUpdateDto()),
    ).resolves.toEqual(pokemon);
  });

  it('should not update a pokemon, does not exist', async () => {
    mockPokemonRepositoryInstance.updateOneFromDatabase.mockResolvedValue(null);
    await expect(
      pokemonService.update('unknown_pokemon', new PokemonUpdateDto()),
    ).rejects.toThrow(NotFoundException);
  });
});
