defmodule EmployerSeed do
  alias IClean.{Repo, Employer}

  def create_employers do
    (1..4)
    |> Enum.map(&employer_model/1)
    |> Enum.map(&create_employer/1)
  end

  def create_employer(employer) do
    Employer.changeset(%Employer{}, employer)
    |> Repo.insert!
  end

  def employer_model(_) do
    %{
      type: Faker.Lorem.word,
      organization: Faker.Lorem.sentence(2..4),
      description: Faker.Lorem.sentence,
    }
  end
end

EmployerSeed.create_employers
