defmodule IClean.Employment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "employments" do
    field :crew_size, :integer
    field :description, :string
    field :end_at, :utc_datetime
    field :salary, :float
    field :start_at, :utc_datetime

    belongs_to :employer, IClean.Employer

    many_to_many :employees,
      IClean.Employee,
      join_through: "employee_employments"

    many_to_many :equipment, 
      IClean.Equipment, 
      join_through: "employments_equipment"
    many_to_many :materials, 
      IClean.Material, 
      join_through: "employments_materials"
    many_to_many :warnings, 
      IClean.Warning, 
      join_through: "employments_warnings"

    timestamps()
  end

  @doc false
  def changeset(employment, attrs) do
    employment
    |> cast(attrs, [:start_at, :end_at, :description, :salary, :crew_size])
    |> validate_required([:start_at, :end_at, :description, :salary, :crew_size])
  end
end
