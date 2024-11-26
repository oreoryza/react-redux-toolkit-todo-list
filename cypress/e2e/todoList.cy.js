describe('todoList App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('check localhost', () => {
    cy.visit('http://localhost:5173/')
  })

  //check display component
  it("check display component", () => {
    cy.get('[cy-data="title-todo"]').should("be.visible")
    cy.get('[cy-data="input-todo"]').should("be.visible") //input form
    cy.get('[cy-data="input-button"]').should("be.visible") //button form
  })

  it("should add a new task", () => {
    const task = "New Task"

    cy.get('[cy-data="input-todo"]').type(task)
    cy.get('[cy-data="input-button"]').click()
    cy.get("ul.list-group").should("contain.text", task)
  })

  it("should complete a task", () => {
    const task = "Complete Task"

    cy.get('[cy-data="input-todo"]').type(task)
    cy.get('[cy-data="input-button"]').click()
    cy.contains(task).click()

    cy.contains(task).should("have.css", "text-decoration", "line-through solid rgb(10, 54, 34)")
  })

  it("should edit a task", () => {
    const task = "New Task"

    cy.get('[cy-data="input-todo"]').type(task)
    cy.get('[cy-data="input-button"]').click()
    cy.get("ul.list-group").should("contain.text", task)
    cy.get("[cy-data='btn-edit']").click()
    cy.get('[cy-data="input-todo"]').clear().type("New Task Edited")
    cy.get('[cy-data="input-button"]').click()
    cy.get("ul.list-group").should("contain.text", "New Task Edited")
  })

  it("should delete a task", () => {
    const task = "Delete Task"

    cy.get('[cy-data="input-todo"]').type(task)
    cy.get('[cy-data="input-button"]').click()
    cy.get("ul.list-group").should("contain.text", task)
    cy.get("[cy-data='btn-delete']").click()
    cy.contains(task).should("not.exist")
  })
})