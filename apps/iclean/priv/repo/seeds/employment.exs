defmodule EmploymentSeed do
  alias IClean.{
    Repo,
    Employer,
    Employment,
    Equipment,
    Material,
    Warning,
  }
  import Ecto.Query

  def create_employments do
    current_employers()
    |> Enum.each(&create_employer_employments/1)
  end

  def current_employers do
    Repo.all(Employer)
  end

  def create_employer_employments(employer) do
    employer
    |> Ecto.build_assoc(:employments)
    |> Employment.changeset(employment_model())
    |> Ecto.Changeset.put_assoc(:equipment, [next_equipment()])
    |> Ecto.Changeset.put_assoc(:materials, [next_material()])
    |> Ecto.Changeset.put_assoc(:warnings, [next_warning()])
    |> Repo.insert!
  end

  def next_equipment do
    unused = from equi in Equipment, 
      join: empl in Employment,
      join: ee in "employments_equipment",
      on: equi.id == ee.equipment_id and empl.id == ee.employment_id,
      where: equi.id != ee.equipment_id,
      limit: 1
    Repo.all(unused)
  end

  def next_material do
    unused = from mat in Material,
      join: empl in Employment,
      join: em in "employments_materials",
      on: mat.id == em.material_id and empl.id == em.employment_id,
      where: mat.id != em.material_id,
      limit: 1
    Repo.all(unused)
  end

  def next_warning do
    unused = from warn in Warning,
      join: empl in Employment,
      join: ew in "employments_warnings",
      on: warn.id == ew.warning_id and empl.id == ew.employment_id,
      where: warn.id != ew.warning_id,
      limit: 1
    Repo.all(unused)
  end

  def employment_model do
    %{
      crew_size: Faker.random_between(1,10),
      description: Faker.Lorem.sentence(10),
      salary: 20.00,
      start_at: Faker.Date.between(~D[1990-01-01], ~D[1990-12-31]),
      end_at: Faker.Date.between(~D[2020-01-01], ~D[2020-12-31]),
    }
  end
end

EmploymentSeed.create_employments()
