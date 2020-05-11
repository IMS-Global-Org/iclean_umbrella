defmodule WarningSeed do
  alias IClean.{Repo, Warning}

  def create_warnings do
    (1..4)
    |> Enum.map(&warning_model/1)
    |> Enum.map(&create_warning/1)
  end

  def create_warning(warning) do
    Warning.changeset(%Warning{}, warning)
    |> Repo.insert!
  end

  def warning_model(_) do
    %{
      description: Faker.Lorem.sentence(10),
      instructions: Faker.Lorem.sentence(10),
      level: Enum.random(1..10),
      name: Faker.Lorem.sentence(3),
    }
  end
end

WarningSeed.create_warnings()
