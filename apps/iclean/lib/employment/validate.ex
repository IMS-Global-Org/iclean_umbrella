defmodule Employment.Validate do
  alias Employment.Search

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
  
  @spec with(Search.t) :: boolean
  def with(search) do
    validate(search)
  end

  @spec validate(Search.t, atom()) :: Search.t
  def validate(search, type\\:individual)
  def validate(search, type) when for_group(type) do
    search
    |> work_type?
    |> wage?
    |> per?
    |> employer?
    |> all_valid?
  end

  def validate(search, type) when for_individual(type) do
    search
    |> work_type?
    |> wage?
    |> per?
    |> employer?
    |> all_valid?
  end

  @spec work_type?(Search.t) :: Search.t
  def work_type?(search) do
    case Enum.member?(@work_types, search.params["type"]) do
      true -> search
      false -> 
        %Search{search | 
          errors: put_in(search.errors, [:work_type], "Invalid work type"),
        }
    end
  end

  @spec wage?(Search.t) :: Search.t
  def wage?(search)do
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

  @spec per?(Search.t) :: Search.t
  def per?(search) do
    case Enum.member?(@per_types, search.params["per"]) do
      true -> search
      false -> 
        %Search{search | 
          errors: put_in(search.errors, [:unit_type], "Invalid wage unit type"),
        }
    end
  end

  @spec employer?(Search.t) :: Search.t
  def employer?(search) do
    case is_binary(search.params["employer"]) do
      true -> search
      false -> 
        %Search{search |
          errors: put_in(search.errors, [:employer], "Invalid Employer text"),
        }
    end
  end

  @spec all_valid?(Search.t) :: Search.t
  def all_valid?(search) do
    %Search{search | 
      valid: length(Map.keys(search.errors)) == 0
    }
  end

end
