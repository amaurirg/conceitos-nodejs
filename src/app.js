const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// function validateProjectId(request, response, next) {
//   const {id} = request.params;
//   // se o ID não é válido (no formato UUID) retorna um erro
//   if(!isUuid(id)) {
//       return response.status(400).json({error: 'Invalid project ID.'});
//   }
//   return next();
// }

// function 

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex === -1) {
    return response.status(400).json({ error: 'Repo not found' });
  }

  const { title, url, techs } = request.body;
  
const repository = {
  id,
  title,
  url,
  techs,
  likes: repositories[repositoryIndex].likes
}

repositories[repositoryIndex] = repository;
return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(400).json({ error: 'Repo not found' });
  }

  repositories.splice(repositoryIndex);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(400).send();
  }

  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
