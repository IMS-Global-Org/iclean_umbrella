defmodule ICleanWeb.EmployeesController do
  use ICleanWeb, :controller

  import Ecto.Query
  alias IClean.{Repo, User, Employee}
  alias Pow.Plug, as: Pow

  def show(conn, _params) do
    current_user = Pow.current_user(conn)
    query = from emp in Employee,
      join: usr in User,
      on: usr.id == emp.id,
      where: usr.id == ^current_user.id,
      select: %{
        id: emp.id,
        first_name: emp.first_name,
        last_name1: emp.last_name1,
        last_name2: emp.last_name2,
        middle_name: emp.middle_name,
        date_of_birth: emp.date_of_birth,
      }

    with {:ok, employee} <- Repo.one(query) do
      json(conn, employee)
    else
      :error ->
        json(conn, %{error: %{ message: "Employee Profile not Found" }})
    end
  end

end
