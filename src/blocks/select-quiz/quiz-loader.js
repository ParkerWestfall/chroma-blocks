var parser = new DOMParser()
fetch(window.location.hostname + '/wp-json/wp/v2/cmquiz/' + document.getElementById('cm-quiz-loader').getAttribute('data-id'))
  .then( response => response.text())
  .then(string => {
    var doc = parser.parseFromString(string, "text/html"),
    loadQuiz = doc.getElementById('cm-quiz')
    document.getElementById('cm-quiz-loader').appendChild(loadQuiz)
  })
  .catch(e => console.log(e))
