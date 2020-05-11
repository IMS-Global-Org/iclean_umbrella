defmodule IClean.Repo.Migrations.CreateEmployments do
  use Ecto.Migration

  def change do
    create table(:employments) do
      add :start_at, :date
      add :end_at, :date
      add :description, :string
      add :salary, :float
      add :crew_size, :integer

      add :employer_id, references(:employers)

      timestamps()
    end

  end
end
