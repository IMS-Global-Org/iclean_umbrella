defmodule IClean.Employment do
  use Ecto.Schema
  import Ecto.Changeset
  alias IClean.{Employer, Employee, Equipment, Material, Warning}

  schema "employments" do
    field :crew_size, :integer
    field :description, :string
    field :end_at, :date
    field :salary, :float
    field :start_at, :date

    belongs_to :employer, Employer

    many_to_many :employees,
      Employee,
      join_through: "employee_employments"

    many_to_many :equipment, 
      Equipment, 
      join_through: "employments_equipment"
    many_to_many :materials, 
      Material, 
      join_through: "employments_materials"
    many_to_many :warnings, 
      Warning, 
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
