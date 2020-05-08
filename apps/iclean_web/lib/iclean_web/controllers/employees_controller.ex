defmodule ICleanWeb.EmployeesController do
  use ICleanWeb, :controller

  import Ecto.Query
  alias IClean.{Repo, Users.User, Employee}
  alias Pow.Plug, as: Pow

  def employee_active(conn, _params) do
    current_user = Pow.current_user(conn)
    query = from emp in Employee,
      join: usr in User,
      on: usr.id == emp.user_id,
      where: usr.id == ^current_user.id,
      select: emp,
      limit: 1
    employee = Repo.one(query)
    if employee != nil do
        json(conn, employee)
    else
      conn 
      |> json(%{})
    end
  end

  def create(conn, %{ "employee" => emp }) do
    Pow.current_user(conn)
    |> Ecto.build_assoc(:employee)
    |> Employee.changeset(emp)
    |> Repo.insert()
    |> case do
      {:ok, employee} ->
        conn |> json(employee)
      {:error, message} -> 
        conn |> put_status(422) |> json(%{ error: %{ message: message }})
    end
  end

  def update(conn, %{ "employee" => employee }) do
    Pow.current_user(conn)
    |> Ecto.build_assoc(:employee, id: employee["id"])
    |> Employee.changeset(employee)
    |> Repo.update()
    |> case do
      {:ok, record} ->
        conn |> json(record)
      {:error, message} -> 
        conn |> put_status(422) |> json(%{error: %{ message: message }})
    end
  end

  def delete(conn, %{ "id" => employer_id }) do
    current_user = Pow.current_user(conn)
    query = from e in Employee,
      join: u in User,
      on: e.user_id == u.id,
      where: e.id == ^employer_id,
      where: u.id == ^current_user.id

    Repo.delete_all(query)
    |> case do
      {count, nil} when count > 0 ->
        conn |> json(%{ count: count })
      {count, _changeset} when count <= 0 ->
        conn |> put_status(422) |> json(%{error: %{ message: "Records not Deleted" }})
    end
  end

end
