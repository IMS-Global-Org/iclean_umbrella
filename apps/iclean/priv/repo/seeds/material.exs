defmodule MaterialSeed do
  alias IClean.{Repo, Material}

  def create_materials do
    (1..4)
    |> Enum.map(&material_model/1)
    |> Enum.each(&create_material/1)
  end

  def create_material(material) do
    Material.changeset(%Material{}, material)
    |> Repo.insert!
  end

  def material_model(_) do
    %{
      applicator_license: Enum.random([true, false]),
      cost: 100.00,
      description: Faker.Lorem.sentence(10),
      name: Faker.Lorem.sentence(3),
      quantity: Enum.random(1..10),
      volume: 22.2,
      volume_unit: Faker.Lorem.word,
    }
  end
end

MaterialSeed.create_materials
