/*
const questions = [
    {
        'question': 'Nathan ?',
        'anwser1': 'Non',
        'anwser2': 'Si',
        'anwser3': 'test',
        'anwser': 'bah non',
    },
    {
        'question': 'Nathan 2 ?',
        'anwser1': 'Feur',
        'anwser2': 'Quoi ?',
        'anwser3': 'mdrrr',
        'anwser5': 'xD',
        'anwser': 'bah coubeh',
    },
    {
        'question': 'Nathan 3 ?',
        'anwser1': 'Feur',
        'anwser2': 'Quoi ?',
        'anwser3': 'mdrrr',
        'anwser5': 'xD',
        'anwser': 'bah coubeh',
    },
].map(k => {
    const res       = {};
    res.question    = k.question;
    res.answers     = Object.keys(k).filter(k => k.match(/anwser\d+/)).map(a => k[a]);
    res.explanation = k.anwser;
    return res;
});
*/
const last_choices = new Array(questions.length).fill(null);
console.error(questions)

function randomizeArray(arr) {
    const res = [], copy = arr.slice();
    while (copy.length)
        res.push(...copy.splice(Math.floor(Math.random() * copy.length), 1));

    return res;
}

function displayQuestion(id) {
    if (typeof id !== 'number') return console.error('Wrong displayQuestion "id" argument type.');

    const the_chosen_one = questions[id];
    if (!the_chosen_one) return console.error('There is no question with id: ' + id);

    const quiz_box = document.getElementById('quiz');

    console.debug(last_choices);

    const html = [`<h3 id="${id}">Question ${id + 1}</h3>`, `<p>${the_chosen_one.question}</p>`];
    randomizeArray(the_chosen_one.answers).forEach(a => html.push(`<p><input type="radio" name="answer">${a}</p>`));

    html.push(`<p id="explanation" hidden>${questions[id].explanation}</p>`);

    if (id > 0) html.push(`<input type="button" id="prev_btn" value="Précédent" onclick="displayQuestion(${id - 1})">`);
    if (questions.length > id + 1)
        html.push(`<input type="button" id="next_btn" value="Suivant" disabled=true onclick="displayQuestion(${id + 1})">`);

    quiz_box.innerHTML = html.join('\n');

    const radios = quiz_box.querySelectorAll('input[type="radio"]');
    radios.forEach((radio, i) => {
        radio.checked = radio.parentElement.textContent === last_choices[id];

        radio.addEventListener('change', () => {
            last_choices[id] = radio.checked ? the_chosen_one.answers[i] : last_choices[id];
            submitAnswer();
        });
    });

    console.error(radios);

    if (last_choices[id] !== null) submitAnswer();
}

function submitAnswer() {
    const quiz          = document.getElementById('quiz');
    const question_id   = quiz.children[0].id;
    const radios        = [...quiz.children].slice(2, questions[question_id].answers.length + 2);
    // console.error(quiz);
    const chosen_answer = radios.find(p => p.firstChild.checked)?.textContent;

    if (!chosen_answer) return console.error('Could not find a chosen answer.');

    last_choices[question_id] = chosen_answer;
    const correct_answer      = questions[question_id].answers[0];

    if (chosen_answer == correct_answer) {
        // alert('GG');
    }
    else {
        // alert('NOPE');
    }

    // console.error(quiz.innerHTML);
    quiz.querySelector('p[id="explanation"]').hidden = false;

    // Enable 'next' button
    if (question_id < questions.length) {
        const next = document.getElementById('next_btn');
        if (next) next.disabled = false;
    }
}

// window.addEventListener('load', () => { displayQuestion(0) })
window.onload = function() { displayQuestion(0); }
