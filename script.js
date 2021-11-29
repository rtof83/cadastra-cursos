// Tabelas
let tbCursos = localStorage.getItem('tbCursos');
tbCursos = JSON.parse(tbCursos);
if (tbCursos == null) { tbCursos = [] };

let tbAulas = localStorage.getItem('tbAulas');
tbAulas = JSON.parse(tbAulas);
if (tbAulas == null) { tbAulas = [] };
// Tabelas

// --------------------------------------------------------

function mostraListaCursos(select) {
  if (tbCursos == '') {
    document.getElementById('content1').innerHTML = 'Não existe curso cadastrado.';
  } else {
    document.getElementById('content1').innerHTML = '<h1>Cursos cadastrados</h1>'
    + '<select class="selectList" onchange="filtro()" id="selectCourses">'
    + '<option value="" disabled="" selected="">Selecione o Título</option>'
    + montaListaCursos(select)[0]
    + '</select>'
    + '<br>'
    + '<table>'
    +   '<th>ID</th>'
    +   '<th>Título</th>'
    +   '<th>Descrição</th>'
    +   '<th>Imagem</th>'
    +   '<th>Professor</th>'
    + montaListaCursos(select)[1]
    + '</table>';
  }
}

function montaListaCursos(select) {
  let montaSelect = '';
  let montaTable = '';

  for (i in tbCursos) {
    montaSelect += '<option>'+JSON.parse(tbCursos[i]).title+'</option>';
    
    if (!select) {
      montaTable += '<tr>'
                 +    '<td>'+JSON.parse(tbCursos[i]).id+'</td>'
                 +    '<td>'+JSON.parse(tbCursos[i]).title+'</td>'
                 +    '<td>'+JSON.parse(tbCursos[i]).desc+'</td>'
                 +    '<td><a href="'+JSON.parse(tbCursos[i]).image+'" target="_blank">'+JSON.parse(tbCursos[i]).image+'</a></td>'
                 +    '<td>'+JSON.parse(tbCursos[i]).professor+'</td>'
                 +    '<td class="lastTd"><button onclick="deleteItem('+JSON.parse(tbCursos[i]).id+')">excluir</button></td>'
                 +  '</tr>';
    } else {
      if (JSON.parse(tbCursos[i]).title === select) {
        montaTable += '<tr>'
                 +    '<td>'+JSON.parse(tbCursos[i]).id+'</td>'
                 +    '<td>'+JSON.parse(tbCursos[i]).title+'</td>'
                 +    '<td>'+JSON.parse(tbCursos[i]).desc+'</td>'
                 +    '<td><a href="'+JSON.parse(tbCursos[i]).image+'" target="_blank">'+JSON.parse(tbCursos[i]).image+'</a></td>'
                 +    '<td>'+JSON.parse(tbCursos[i]).professor+'</td>'
                 +    '<td class="lastTd"><button onclick="deleteItem('+JSON.parse(tbCursos[i]).id+')">excluir</button></td>'
                 +  '</tr>';
      }
    }
  }

  return [montaSelect, montaTable];
}

function filtro() {
  mostraListaCursos(document.getElementById('selectCourses').value);
}

function mostraListaAulas() {
  if (tbAulas == '') {
    document.getElementById('content1').innerHTML = 'Não existe aula cadastrada.';
  } else {
    document.getElementById('content1').innerHTML = '<h1>Aulas cadastradas</h1>'
    + '<select class="selectList" onchange="" id="selectClass">'
    + '<option value="" disabled="" selected="">Selecione o Título</option>'
    + montaListaCursos()[0]
    + '</select>'
    + '<br>'
    + '<table>'
    +   '<th>ID Curso</th>'
    +   '<th>Aula</th>'
    + montaListaAulas()
    + '</table>';
  }
}

function montaListaAulas(select) {
  let montaTableClass = '';

  for (i in tbAulas) {
    if (!select) {
      montaTableClass += '<tr>'
                 +    '<td>'+JSON.parse(tbAulas[i]).idClass+'</td>'
                 +    '<td>'+JSON.parse(tbAulas[i]).classLink+'</td>'
                 +    '<td class="lastTd"><button onclick="deleteItemClass('+JSON.parse(tbAulas[i]).record+')">excluir</button></td>'
                 +  '</tr>';
    } else {
      if (JSON.parse(tbAulas[i]).title === select) {
        montaTableClass += '<tr>'
        +    '<td>'+JSON.parse(tbAulas[i]).idClass+'</td>'
        +    '<td>'+JSON.parse(tbAulas[i]).classLink+'</td>'
        +    '<td class="lastTd"><button onclick="deleteItemClass('+JSON.parse(tbAulas[i]).record+')">excluir</button></td>'
                 +  '</tr>';
      }
    }
  }

  return montaTableClass;
}

function mostraCurso() {
    document.getElementById('content1').innerHTML =
      '<form id="formCurso">'
      + '<h4>Cadastrar curso</h4>'
      + '<input type="text" id="txtId" placeholder="Identificador">'
      + '<input type="text" id="txtTitle" placeholder="Título">'
      + '<input type="text" id="txtDesc" placeholder="Descrição">'
      + '<input type="text" id="txtImage" placeholder="Imagem">'
      + '<input type="text" id="txtProfessor" placeholder="Professor">'
      + '<input class="button" type="submit" value="Cadastrar" onclick="cadastraCurso()">'
      +'</form>';
}

function mostraAula() {
  document.getElementById('content1').innerHTML =
  '<form id="formAula">'
  + '<h4>Cadastrar aula</h4>'
  + '<select class="selectList" onchange="fillFormAula()" id="select">'
  +   '<option value="" disabled="" selected="">Selecione o Título</option>'
  +   montaListaCursos()[0]
  + '<input type="text" id="txtIdClass" placeholder="Identificador" disabled="">'
  + '<input type="text" id="txtTitleClass" placeholder="Título" disabled="">'
  + '<input type="text" id="txtClass" placeholder="Aula">'
  + '<input class="button" type="submit" value="Cadastrar" onclick="cadastraAula()">'
  +'</form>';
}

function fillFormAula() {
  for (i in tbCursos) {
    if (JSON.parse(tbCursos[i]).title == document.getElementById('select').value) {
      document.getElementById('txtIdClass').value = JSON.parse(tbCursos[i]).id;
      document.getElementById('txtTitleClass').value = JSON.parse(tbCursos[i]).title;
      document.getElementById('txtClass').focus();
    }   
  }
}

function cadastraCurso() {
  document.getElementById('formCurso').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  let erro = false;
  let id = document.getElementById('txtId').value;

  if (id === '') {
    alert('Atenção!\nIdentificador não pode ser vazio!');
    document.getElementById('txtId').focus();
  } else {
    if (tbCursos.length > 0) {
      for (let i in tbCursos) {
        if (JSON.parse(tbCursos[i]).id === id) {
          alert('Atenção!\nIdentificador já existe no sistema!');
          document.getElementById('txtId').focus();
          erro = true;
          break;
        }
      }
    }
    if (erro === false) {
      let title = document.getElementById('txtTitle').value;
      let desc = document.getElementById('txtDesc').value;
      let image = document.getElementById('txtImage').value;
      let professor = document.getElementById('txtProfessor').value;
      let record = Date.now(); 

      let data = JSON.stringify({
        id,
        title,
        desc,
        image,
        professor,
        record,
      });

      tbCursos.push(data);
      localStorage.setItem('tbCursos', JSON.stringify(tbCursos));

      mostraLista();
    }
  }
}

function cadastraAula() {
  document.getElementById('formAula').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  let idClass = document.getElementById('txtIdClass').value;

  if (idClass === '') {
    alert('Atenção!\nIdentificador não pode ser vazio!');
  } else {
    let classLink = document.getElementById('txtClass').value;
    let record = Date.now(); 

    let data = JSON.stringify({
      idClass,
      classLink,
      record,
    });

    tbAulas.push(data);
    localStorage.setItem('tbAulas', JSON.stringify(tbAulas));

    mostraListaAulas();
  }
}

function deleteItem(id) {
  for (i in tbCursos) {
    if (JSON.parse(tbCursos[i]).id == id) {
          if (confirm('Excluir ' + id + ' - ' + JSON.parse(tbCursos[i]).title + '?')) {
            tbCursos.splice(i, 1);
            localStorage.setItem('tbCursos', JSON.stringify(tbCursos));
            mostraLista();
          }
      }
  }
}

function deleteItemClass(id) {
  for (i in tbAulas) {
    if (JSON.parse(tbAulas[i]).record == id) {
          if (confirm('Excluir ' + JSON.parse(tbAulas[i]).idClass + ' - ' + JSON.parse(tbAulas[i]).classLink + '?')) {
            tbAulas.splice(i, 1);
            localStorage.setItem('tbAulas', JSON.stringify(tbAulas));
            mostraListaAulas();
          }
      }
  }
}

