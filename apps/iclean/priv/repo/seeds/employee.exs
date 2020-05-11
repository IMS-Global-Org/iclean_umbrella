defmodule EmployeeSeed do
  import Ecto.Query
  alias IClean.{Repo, Users.User, Employee, Employment}

  def create_employees do
    # Create Employee profiles for Basic Users
    (1..4)
    |> Enum.map(&registration_model/1)
    |> Enum.map(&create_user/1) # Users.User
    |> Enum.map(&create_employee_profile/1) # Employee
  end

  def create_user(registration_model) do
    User.changeset(%User{}, registration_model)
    |> Repo.insert!
  end

  def registration_model(_, role\\"basic") do
    %{ 
      email: Faker.Internet.safe_email(),
      password: "password",
      confirm_password: "password",
      role: role,
    }
  end

  def employee_model do
    %{
      first_name: Faker.Name.first_name(),
      middle_name: Faker.Name.first_name(),
      last_name: Faker.Name.last_name(),
      date_of_birth: date_of_birth(),
    }
  end

  def date_of_birth, do: Faker.Date.between(~D[1920-01-01], ~D[2020-12-31])

  def create_employee_profile(user) do
    user
    |> Ecto.build_assoc(:employee)
    |> Employee.changeset(employee_model())
    |> Ecto.Changeset.put_assoc(:employments, [next_employment()])
    |> Repo.insert!
  end

  def next_employment do
    unused = from employment in Employment,
      join: employee in Employee,
      join: ee in "employees_employments",
      on: employment.id == ee.employment_id and employee.id == ee.employee_id,
      where: employment.id != ee.employment_id,
      limit: 2
    Repo.all(unused)
  end

end

EmployeeSeed.create_employees()
