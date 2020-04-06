// uradis html i css i izvuces varijable +
// napravi plan za instaciranje klasa(prototipa) +
// klikom na add question da prikazes upitnik i na close da zatvoris+
// na submit feedback za prazne inpute +
// metod clearFields() +
// hide/show answer +
// na submit form dodaj novo pitanje i odgovor, [] +
// delete item +
// edit item, data-id +


const editBtn = document.querySelector('#edit-item')
const addBtn = document.querySelector('#add-item')
const deleteBtn = document.querySelector('#delete-item')
const saveBtn = document.querySelector('#save-item')
const questionContainer = document.querySelector('.question-container')
const closeBtn = document.querySelector('.close-btn')
const showHide = document.querySelector('.show-hide')
const inputGroup = document.querySelector('.input-group')
const form = document.querySelector('.form')
let questionInput = document.querySelector('#question')
let answerInput = document.querySelector('#answer')
let questionAnswer = document.querySelector('.question-answer')

let data = []
let id = 1

const ui = new UI()

form.addEventListener('submit', (e) => {

  e.preventDefault()

  let questionId = id++
  let questionTitle = document.querySelector('#question').value
  let answerTitle = document.querySelector('#answer').value

  const questionData = new Question(questionId, questionTitle, answerTitle)

  if (questionTitle === '' || answerTitle === '') {


    alert('upisi nesto druze')

  } else {

    data.push(questionData)

    ui.showResult(questionData)
    ui.clearFields(questionInput, answerInput)


    console.log(data)

  }

})

function Question(id, question, answer) {
  this.id = id
  this.question = question
  this.answer = answer

}

UI.prototype.showResult = function (questionData) {

  let div = document.createElement('div')
  div.classList.add('question-answer')

  div.innerHTML = ` 
   
   <h3>${questionData.question}</h3>
   <h4 class='show-hide'>Show/Hide Answer</h4>
   <h3 class='hide-item'>${questionData.answer}</h3>
  <div class='btn-container'>
    <button id='edit-item' class='btn btn-edit' data-id='${questionData.id}'>Edit</button>
    <button id='delete-item' class='btn btn-delete'>Delete</button>
  </div>

   
   `

  questionContainer.appendChild(div)

}

addBtn.addEventListener('click', function () {

  ui.showQuestion()

})

closeBtn.addEventListener('click', function () {

  ui.hideQuestion()

})


questionContainer.addEventListener('click', function(e) {

  if(e.target.classList.contains('btn-delete')) {

    e.target.parentElement.parentElement.remove()
  }

  ui.editQuestion(e)

})



showHide.addEventListener('click', (e) => {


  ui.showAnswer(e)


})

function UI() {}

UI.prototype.showQuestion = function(){

  inputGroup.classList.remove('hide-item')

}

UI.prototype.hideQuestion = function () {

  inputGroup.classList.add('hide-item')

}

UI.prototype.showAnswer = function (e) {

  e.target.nextElementSibling.classList.toggle('hide-item')

}

UI.prototype.editQuestion = function(e) {

     let id = e.target.dataset.id 

     console.log(data)

     return data.filter(item=>{


        if(item.id === parseInt(id)){

          questionInput.value = item.question
          answerInput.value = item.answer
          e.target.parentElement.parentElement.remove()
        }

     })
}


UI.prototype.clearFields = function (questionInput, answerInput) {

  questionInput.value = ''
  answerInput.value = ''


}