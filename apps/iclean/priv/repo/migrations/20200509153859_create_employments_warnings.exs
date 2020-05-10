defmodule IClean.Repo.Migrations.CreateEmploymentsWarnings do
  use Ecto.Migration

  def change do
    create table(:employments_warnings) do
      add :employment_id, references(:employments)
      add :warning_id, references(:warnings)
    end

    create unique_index(:employments_warnings, [:employment_id, :warning_id])
  end
end
