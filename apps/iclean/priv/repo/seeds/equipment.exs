defmodule EquipmentSeed do
  alias IClean.{Repo, Equipment}

  def create_equipment do
    (1..10)
    |> Enum.map(&equipment_model/1)
    |> Enum.each(&load_equipment/1)
  end

  def load_equipment(equipment) do
    Equipment.changeset(%Equipment{}, equipment)
    |> Repo.insert!
  end

  def equipment_model(_) do
    %{
      cost: 20.00,
      description: Faker.Lorem.sentence(10),
      name: Faker.Lorem.sentence(2),
      operator_license: Enum.random([true, false]),
      quantity: Enum.random(1..20),
    }
  end

end

EquipmentSeed.create_equipment()
