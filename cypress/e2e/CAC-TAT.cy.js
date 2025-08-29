
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=>{
    cy.visit('../../src/index.html')
  })

  it('verifica o título da aplicação', () => {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  //.only executa somente esse teste
  it('Preencha os campos obrigatórios e envie o formulário' ,()=>{
    cy.get('#firstName').type("Felipe")
    cy.get('#lastName').type("Sobrenome legal")
    cy.get('#email').type('aaa@gmail.com')
    cy.get('#open-text-area').type("comentario")
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

    it('Testando texto grande',()=>{
    const longText=Cypress._.repeat('abcdef',10)

    cy.get('#firstName').type("Felipe")
    cy.get('#lastName').type("Sobrenome legal")
    cy.get('#email').type('aaa@gmail.com')
    cy.get('#open-text-area').type(longText,{delay:0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email inválido',()=>{
    cy.get('#email').type('aaaa')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('Validando telefone',()=>{
    cy.get('#phone').type('abc')
    cy.get('#phone').should('have.value','')
  })

  it.only('Validando telefone obrigatório', ()=>{
    cy.get('#phone-checkbox').check()
    cy.get('.button').click()
    cy.get('.error').should('be.visible')
  })

  it('Preencha os campos Preenche e limpa os campos' ,()=>{
    cy.get('#firstName').type("teste").should('have.value', 'teste')
    .clear().should('have.value','')
  })

  it("Envia formulário com sucesso usando comando customizado",()=>{
    const data={
      firstName:'teste',
      lastName:'aaa',
      email:'teste@emai.com',
      text: 'text123'
    }
    
    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')
  })

  it("Identificando botão de enviar", ()=>{
    cy.contains('.button', 'Enviar').click()
  })

  it.only('Seleciona youtube na dropbox', ()=>{
    cy.get('#product').select('YouTube').should('have.value','youtube')
  })

  it.only('Seleciona mentoria pelo seu valor',()=>{
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it.only('Seleciona valor pelo índice',()=>{
    cy.get('#product').select(1).should('have.value','blog')
  })

  it.only('Testando radio button', ()=>{
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it.only('Marca cada tipo de atendimento',()=>{
    cy.get('input[type="radio"]')
      .each(typeOfService=>{
        cy.wrap(typeOfService)
        .check()
        .should('be.checked')
      })
  })

  it.only('Marca ambos checkbox e desmarca o último',()=>{
    cy.get('input[type="checkbox"]')
    .check().should('be.checked')
    .last().uncheck().should('not.be.checked')
  })

  it.only('Seleciona arquivo da pasta fixtures',()=>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should((input)=>{
          expect(input[0].files[0].name).to.equal('example.json')
      })
  })


  it.only('Seleciona arquivo simulando drag-and-drop',()=>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
      .should((input)=>{
          expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it.only('Seleciona arquivo com alias',()=>{
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input)=>{
          expect(input[0].files[0].name).to.equal('example.json')
      })
  })

})
