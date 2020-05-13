defmodule Employment.Search do

  import Ecto.Query
  alias IClean.{Repo, Employment}
  alias __MODULE__

  @type t :: %__MODULE__{
    params: map(), 
    errors: map(), 
    employments: list(Employment.t)
  }
  defstruct params: nil, errors: %{}, employments: []

  @work_types [
    "full_time",
    "part_time",
    "contract",
    "remote",
  ]

  @per_types [
    "hour",
    "week",
    "month",
    "year",
  ]

  defguard for_group(type) when type == :group
  defguard for_individual(type) when type == :individual
  
  def with(params) do
    validate(params)
  end

  def validate(params, type\\:individual)
  def validate(params, type) when for_group(type) do
    %Search{ params: params }
    |> valid_work_type?
    |> valid_wage?
    |> valid_per?
    |> valid_employer?
  end

  def validate(params, type) when for_individual(type) do
    %Search{ params: params }
    |> valid_work_type?
    |> valid_wage?
    |> valid_per?
    |> valid_employer?
  end

  @spec valid_work_type?(Search.t) :: Search.t
  def valid_work_type?(search) do
    case Enum.member?(@work_types, search.params["type"]) do
      true -> search
      false -> 
        %Search{search | 
          errors: put_in(search.errors, [:work_type], "Invalid work type"),
        }
    end
  end

  @spec valid_wage?(Search.t) :: Search.t
  def valid_wage?(search)do
    %{"wage" => wage} = search.params
    amount = if is_integer(wage), do: wage/1, else: wage
    case amount >= 1.00 && amount <= 100_000.00 do
      true -> search
      false ->
        %Search{ search | 
          errors: put_in(search.errors, [:wage], "Invalid wage range"),
        }
    end
  end

  @spec valid_per?(Search.t) :: Search.t
  def valid_per?(search) do
    case Enum.member?(@per_types, search.params["per"]) do
      true -> search
      false -> 
        %Search{search | 
          errors: put_in(search.errors, [:unit_type], "Invalid wage unit type"),
        }
    end
  end

  @spec valid_employer?(Search.t) :: Search.t
  def valid_employer?(search) do
    case is_binary(search.params["employer"]) do
      true -> search
      false -> 
        %Search{search |
          errors: put_in(search, [:employer], "Invalid Employer text"),
        }
    end
  end
end
